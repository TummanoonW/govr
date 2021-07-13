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
    contents: {
      publishedC: [],
      privateC: [],
      disabledC: [],
      linkC: [],
    },
    categories: [],
    name: "Hi from data",
    auth: {},
    user: {},
    contentCat: [],
    cont: "",
    deleteC: {
      isLoading: false,
      isError: false,
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
    isLoading: false,
    isError: false,
    error: "",
    place: {},
  },
  created: async function () {
    langs.getSelected().then((lang) => {
      this.lang = lang;
    });

    //Get uer from local storage
    this.auth = await JSON.parse(localStorage.getItem(DB.AUTH));
    this.user = await JSON.parse(localStorage.getItem(DB.USER));
    this.isLoading = true;
    // Use API to get user's subscription
    let sub = (await subscriptionRef.where('uid', '==', this.auth.uid).get()).docs[0].data()



    //calling category
    await apis
      .allCategories()
      .then((data) => {
        this.categories = data;
      })
      .catch((error) => {
        this.isError = true;
        this.error = error;
      });

    //calling user's contents
    await apis
      .getContentsByUid(this.auth.uid)
      .then(async (data) => {
        // console.log(data);
        this.cont = data;
        await specifyContent(data);
        this.isLoading = false;
        this.isError = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.isError = true;
        this.error = error;
      });

    if (this.auth == null) {
      window.location.href = PAGES.LOGIN;
    } else {
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
    getCat: (cat) => {
      localStorage.setItem(DB.CATEGORY, cat);
      window.location.href = PAGES.CATEGORY;
    },
  },
});

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

function countContents(content){
  let count = content['publishedC'].length + content['privateC'].length + content['linkC'].length
  if (count <= 5) {
    return
  }
  else{
    console.log("User's subscription is expried")
    let modal = document.getElementById('myModal-ex').style;
    modal.display = 'block'


  }

}

// Get the modal
var modal = document.getElementById("myModal-ex");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}


