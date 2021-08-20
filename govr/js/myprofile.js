// todos : checking user subscription 
// todos : limit display contents
// todos : check user subscription expriration 
// todos : expriration modal
// todos : choose disabled contents modal
// todos : disabled contents
// todos : connect to omise API
// todos : use omise API for payment
// todos : testing omise payment

(function ($) {
  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
      $(".nav-bar").addClass("nav-sticky");
    } else {
      $(".nav-bar").removeClass("nav-sticky");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });
})(jQuery);

var app = new Vue({
  el: "#app",
  data: {
    lang: { name: "", code: "" },
    auth: null,
    user: null,
    userinfo: null,
    isLoading: false,
    isError: false,
    error: "",
    categories: [],
    contents: {
      publishedC: [],
      privateC: [],
      disabledC: [],
      linkC: [],
    },
    contentCat: [],
    cont: "",
    deleteC: {
      isLoading: false,
      isError: false,
    },
    updateU:{
      isLoading: false,
      isError: false,
      error: null
    },
    info: {
      author: {},
      cat: {},
      location: {},
    },
    link: {
      isLoading: false,
      isCopied: false,
    },
    place: {},
    userInfoFilled: false,
    orders: null
  },
  created: async function () {
    document.querySelector("#tabProfile").setAttribute('class', 'nav-item nav-link active')

    langs.getSelected().then((lang) => {
      this.lang = lang;
    });

    //Get uer from local storage
    this.auth = await JSON.parse(localStorage.getItem(DB.AUTH));
    this.user = await JSON.parse(localStorage.getItem(DB.USER));
    this.isLoading = true;
    // Use API to get user's subscription
    //let sub = (await subscriptionRef.where('uid', '==', this.auth.uid).get()).docs[0].data()
    let sub = null //USE RESFUL APIs instead

    try {
      if (this.auth != null) {
        //calling user info
        this.userinfo = await apis.getUserInfo(this.auth.uid)
        this.userInfoFilled = await this.validateAddress(this.userinfo)

        //calling category
        this.categories = await apis.allCategories()

        //calling user's contents
        this.cont = await apis.getContentsByUid(this.auth.uid)

        await specifyContent(this.cont);

        this.isLoading = false

        if (sub == null) {
          console.log('free user')
        } else {
          // checking expriration calling API
          // console.log(sub)
          let now = new Date().getTime()
          let ex = new Date(sub.expiredDate).getTime()

          if (now >= ex) {
            console.log(now)
            console.log(ex)
          } else {
            countContents(this.contents)
          }
        }

        this.orders = await apis.getBillsbyUid(this.auth.uid)
        

      } else {
        this.isLoading = false
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    selectLang: function () { //updating language
      langs.selectLanguage(this.lang.code);
      langs.getSelected().then((lang) => {
        this.lang = lang;
      });
    },
    getSharedLink: function (content) { //getting content's link
      $("#linkModal").modal();
      this.link.isCopied = false;
      this.link.isLoading = true;
      this.link.title = content.title;
      this.link.url = null;

      //getting link by apis
      apis
        .getLink(content.id)
        .then((data) => {
          this.link.isLoading = false;
          this.link.url = data.url;
          console.log(data);
        })
        .catch((error) => {
          this.link.isLoading = false;
        });
    },
    copyLink: function () {
      this.link.isCopied = true;
      const result = copyToClipboard(this.link.url);
      console.log(result, this.link.url);
    },
    infoContent: function (content) {
      this.info = content;
      this.place = content.place.location;
      this.info.author = this.user;
      this.info.updated = this.info.date;
      console.log(this.info);
      $("#infoModal").modal();
    },
    deleteContent: function (content) {
      this.deleteC = content;
      $("#deleteModal").modal();
    },
    deleteNow: function () {
      this.deleteC.isLoading = true;
      this.deleteC.isError = false;
      apis
        .deleteContent(this.deleteC.id)
        .then(() => {
          this.deleteC.isLoading = false;
          this.deleteC.isError = false;
          // this.contents.forEach((item, index) => {
          //   if (item.id === this.deleteC.id) {
          //     this.contents.splice(index, 1);
          //   }
          // });
          window.location.reload();
        })
        .catch((error) => {
          this.deleteC.isLoading = false;
          this.deleteC.isError = true;
          this.deleteC.error = error;
        });
    },
    displayPrivacy: function (info) {
      let str = "";
      if (info.published) {
        str = "Public";
      } else if (!info.published && !info.private) {
        str = "Only people with link";
      } else {
        str = "Private";
      }
      return str;
    },
    validateAddress: function (ui) {
      return ui.fname != '' && ui.lname != '' && ui.address && ui.town != '' && ui.province != '' && ui.country != '' && ui.postal_code != '' && ui.phone != ''
    },
    editProfile: function () {
      $("#editProfileModal").modal();
    },
    editAddress: function () {
      $("#addressModal").modal();
    },
    changeAddress: async function () {
      await apis.updateUserInfo(this.auth.uid, this.userinfo)
    },
    shareToFB: function () {
      const w = window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.link.url}`, "fb", 'height=500, width=600')
      if (window.focus) { w.focus() }
    },
    shareToTW: function () {
      const w = window.open(`http://twitter.com/share?url=${this.link.url}`, "tw", 'height=500, width=600')
      if (window.focus) { w.focus() }
    },
    shareToLK: function () {
      const w = window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${this.link.url}`, "gp", 'height=500, width=600')
      if (window.focus) { w.focus() }
    },
    previewImage: function (event) {
      var file = event.target.files[0];
      console.log(file)
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async function () {
        document.querySelector('#imgProfile').src = await resizedataURL(reader.result, 128, 128)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    },
    saveProfile: async function () {
      if (this.user.displayName != '') {
        try {
          app.updateU.isLoading = true
          const src = document.querySelector('#imgProfile').src
          const x = src.split('base64')
          if (x.length > 1) {
            let ref = profileRef.child(this.user.uid + ".jpg");
            await urlToBlob(src).then(async (blob) => {
              await ref.put(blob).then(async function (snapshot) {
                await snapshot.ref.getDownloadURL().then((url) => {
                  app.updateU.isLoading = false
                  app.user.photoURL = url;
                  localStorage.setItem(DB.USER, JSON.stringify(app.user))
                  $('#editProfileModal').modal('hide')
                });
              });
            });
          }
          await apis.updateUser(this.auth.uid, this.user)
        } catch (error) {
          console.error(error)
          app.updateU.isLoading = false
          app.updateU.isError = true
          app.updateU.error = error
        }
      } else {
        window.alert('Please set your intelligible username')
      }
    }
  },
});

function urlToBlob(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open("GET", url);
    xhr.responseType = "blob"; // convert type
    xhr.send();
  });
}

function resizedataURL(datas, wantedWidth, wantedHeight) {
  return new Promise((resolve, reject) => {
    // We create an image to receive the Data URI
    var img = document.createElement('img');

    // When the event "onload" is triggered we can resize the image.
    img.onload = function () {
      // We create a canvas and get its context.
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      // We set the dimensions at the wanted size.
      canvas.width = wantedWidth;
      canvas.height = wantedHeight;

      // We resize the image with the canvas method drawImage();
      ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

      resolve(canvas.toDataURL('image/jpeg', 1.0))

      /////////////////////////////////////////
      // Use and treat your Data URI here !! //
      /////////////////////////////////////////
    };

    img.onerror = function (err) {
      reject(err)
    }

    // We put the Data URI in the image's src attribute
    img.src = datas;
  })
}

function copyToClipboard(str) {
  var input = document.getElementById("link-url");
  input.select();
  var result = document.execCommand("copy");
  return result;
}

function specifyContent(contents) {
  for (let i = 0; i < contents.length; i++) {
    if (!contents[i].disbaled) {
      if (!contents[i].published & !contents[i].private) {
        //only with link
        //onl with link
        app.contents.linkC.push(contents[i]);
      } else if (contents[i].published) {
        //published
        app.contents.publishedC.push(contents[i]);
      } else if (contents[i].private) {
        //private
        app.contents.privateC.push(contents[i]);
      }
    } else {
      //disbaled
      app.contents.disabledC.push(contents[i]);
    }
  }
  // console.log(app.contents);
}

async function disableContents() {
  // for (let i = 0; i < contents.length; i++) {
  //   if (!contents[i].disbaled) {
  //     if (!contents[i].published & !contents[i].private) {
  //       //only with link
  //       //onl with link
  //       app.contents.linkC.push(contents[i]);
  //     } else if (contents[i].published) {
  //       //published
  //       app.contents.publishedC.push(contents[i]);
  //     } else if (contents[i].private) {
  //       //private
  //       app.contents.privateC.push(contents[i]);
  //     }
  //   } else {
  //     //disbaled
  //     app.contents.disabledC.push(contents[i]);
  //   }
  // }
  let contents = app.cont
  for (let i = 5; i < contents.length; i++) {
    console.log(contents[i].id)
    await contentsRef.doc(contents[i].id).update({
      disbaled: true,
      published: false,
      private: false
    })
  }
  window.location.reload()


}

function countContents(content) {
  let count = content['publishedC'].length + content['privateC'].length + content['linkC'].length
  if (count <= 5) {
    return
  }
  else {
    console.log("User's subscription is expried")
    let modal = document.getElementById('myModal-ex').style;
    modal.display = 'block'


  }

}

