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
    cont: '',
    deleteC: {
      isLoading: false,
      isError: false
    },
    info: {
      author: {},
      cat: {},
      location: {}
    },
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
    infoContent: function (content) {
      this.info = content;
      this.info.author = this.user;
      this.info.updated = new Date(this.info.date._seconds * 1000)
      console.log(this.info)
      $('#infoModal').modal()
    },
    deleteContent: function (content) {
      this.deleteC = content
      $('#deleteModal').modal()
    },
    deleteNow: function () {
      this.deleteC.isLoading = true
      this.deleteC.isError = false
      apis.deleteContent(this.deleteC.id).then(() => {
        this.deleteC.isLoading = false
        this.deleteC.isError = false
        this.contents.forEach((item, index) => {
          if (item.id === this.deleteC.id) {
            this.contents.splice(index, 1)
          }
        })
      }).catch(error => {
        this.deleteC.isLoading = false
        this.deleteC.isError = true
        this.deleteC.error = error
      })
    },
    displayPrivacy: function (info) {
      let str = ''
      if (info.published) {
        str = 'Public'
      } else if (!info.published && !info.private) {
        str = 'Only people with link'
      } else {
        str = 'Private'
      }
      return str
    },
    getCat: (cat) => {
      localStorage.setItem(DB.CATEGORY, cat);
      window.location.href = PAGES.CATEGORY;
    }
  },
});

init();
async function init() {
  //Get uer from local storage
  app.auth = await JSON.parse(localStorage.getItem(DB.AUTH));
  app.user = await JSON.parse(localStorage.getItem(DB.USER));

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

  apis.getContentsByUid(app.auth.uid).then(data => {
    console.log(data)
    specifyContent(data)
    app.isLoading = false;
    app.isError = false;
  }).catch(error => {
    app.isLoading = false;
    app.isError = true;
    app.error = error
  });
}

function copyToClipboard(str) {
  var input = document.getElementById('link-url');
  input.select();
  var result = document.execCommand('copy');
  return result
}

function specifyContent(contents) {
  for (let i = 0; i < contents.length; i++) {
    if (!contents[i].disbaled) {
      if (!contents[i].published & !contents[i].private) { //only with link
        //onl with link
        app.contents.linkC.push(contents[i])
      } else if (contents[i].published) { //published
        app.contents.publishedC.push(contents[i])
      } else if (contents[i].private) { //private
        app.contents.privateC.push(contents[i])
      }
    } else { //disbaled
      app.contents.disabledC.push(contents[i])
    }
  }
  console.log(app.contents)
}
