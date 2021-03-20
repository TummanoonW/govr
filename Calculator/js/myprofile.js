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
    link: {
      isLoading: false,
      isCopied: false
    },
    isLoading: false,
    isError: false,
    error: ""
  },
  methods: {
    getSharedLink: function (content) {
      $('#linkModal').modal()
      this.link.isCopied = false
      this.link.isLoading = true
      this.link.title = content.title
      this.link.url = null
      apis.getLink(content.id).then(data => {
        this.link.isLoading = false
        this.link.url = data.url
        console.log(data)
      }).catch(error => {
        this.link.isLoading = false
      })
    },
    copyLink: function () {
      this.link.isCopied = true
      const result = copyToClipboard(this.link.url)
      console.log(result, this.link.url)
    },
    info: function (id) {

    },
    delete: function (id) {

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
      localStorage.setItem(DB.CATEGORY, cat);
      window.location.href = PAGES.CATEGORY;
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

  apis.getContentsNewest().then(data => {
    app.contents = data;
    app.isLoading = false;
    app.isError = false;
  }).catch(error => {
    app.isLoading = false;
    app.isError = true;
    app.error = error
  });
}

function copyToClipboard(str){
  var input = document.getElementById('link-url');
  input.select();
  var result = document.execCommand('copy');
  return result
}
