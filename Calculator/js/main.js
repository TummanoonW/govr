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
    contents: [],
    categories: [],
    name: "Hi from data",
    auth: {},
    user: {},
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
      localStorage.setItem(DB.CONTENT, JSON.stringify(content))
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
    goToCat: (cat) => {
      window.location.href = PAGES.CATEGORY + `?label=${cat.label}`;
    }
  },
});

init();
async function init() {
  //Get uer from local storage
  app.auth = JSON.parse(localStorage.getItem(DB.AUTH));
  app.user = JSON.parse(localStorage.getItem(DB.USER));
  //Get category from local storage
  app.category = localStorage.getItem(DB.CATEGORY);

  initData();
}

function initData() {
  app.isLoading = true;

  apis.allCategories().then(data => {
    app.categories = data;
  }).catch(error => {
    app.isError = true;
    app.error = error
  });

  apis.getContentsNewest().then(data => {
    app.contents = data
    app.isLoading = false;
    app.isError = false;
  }).catch(error => {
    app.isLoading = false;
    app.isError = true;
    app.error = error
  });

}

