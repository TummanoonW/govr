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


//Get uer from local storage
let auth = JSON.parse(localStorage.getItem(DB.AUTH));
let user = JSON.parse(localStorage.getItem(DB.USER));
//Get category from local storage
let category = localStorage.getItem(DB.CATEGORY);

var app = new Vue({
  el: "#app",
  data: {
    contents: [],
    categories: [],
    name: "Hi from data",
    auth: auth,
    user: user,
    contentCat: [],
    cont: '',
    isLoading: false,
    isError: false,
    error: ""
  },
  methods: {
    toLogin: function () {
      window.location.href = PAGES.LOGIN;
    },
    toRegister: function () {
      window.location.href = PAGES.REGISTER;
    },
    toHome: function () {
      window.location.href = PAGES.INDEX;
    },
    toProfile: function () {
      window.location.href = PAGES.MYPROFILE;
    },
    toUpload: function () {
      window.location.href = PAGES.UPLOAD;
    },
    toWebXR: function (content) {
      window.location.href = PAGES.WEBXR + `?id=${content.id}`;   
    },

    logout: () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem(DB.USER);
          localStorage.removeItem(DB.AUTH);
          localStorage.removeItem(DB.USERINFO);

          window.location.href = PAGES.INDEX;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    getCat: (cat) => {
      window.location.href = PAGES.CATEGORY + `?label=${cat}`;
    }
  },
});

initData();

function initData() {
  app.isLoading = true;

  apis.allCategories().then(data => {
    app.categories = data;
  }).catch(error => {
    app.isError = true;
    app.error = error
  });

  apis.getNewestContent().then(data => {
    getThumbnail(data)
    app.contents = data

    app.isError = false;
  }).catch(error => {
    app.isLoading = false;
    app.isError = true;
    app.error = error
  });

}


async function getThumbnail(data){
  for (let i = 0; i < data.length; i++) {
    var img360 = imgRef.child(data[i].image360);
    await download360(img360)
  }
}

function download360(img360){
  img360
    .getDownloadURL()
    .then((url) => {
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        var blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element
      var img = document.getElementById("img360");
      img.setAttribute("src", url);
      console.log("success");
      app.isLoading = false;
    })
    .catch((error) => {
      // Handle any errors
      console.log(error.message);
    });
}

