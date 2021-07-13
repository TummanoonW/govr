// Able to change language
// Open map modal after click place title

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

var app = new Vue({
  el: "#app",
  data: {
    auth: {},
    user: {},
    content: {},
    date: "",
    cate: "",
    user: null,
    isLoading: false,
    isError: false,
    error: "",
    place: "",
    link: {},
    location: {}
  },
  methods: {
    toEdit: () => {
      window.location.href = PAGES.EDIT + `?id=${id}`;
    },
    getSharedLink: function (content) {
      const md = document.getElementById("myLink");
      md.style.display = "block";
      apis
        .getLink(content.id)
        .then((data) => {
          this.link = data.url;
        })
        .catch((error) => {
          this.link.isLoading = false;
        });
      window.onclick = function (event) {
        if (event.target == md) {
          md.style.display = "none";
        }
      };
    },
  },
});

var menu = new Vue({
  el: "#m",
  data: {
    content: {},
    place: {},
    date: "",
    cate: "",
    user: {},
    link:{},
    location: {}
  },
  methods: {
    toEdit: () => {
      window.location.href = PAGES.EDIT + `?id=${id}`;
    },
    getSharedLink: function (content) {
      const md = document.getElementById("myLink");
      md.style.display = "block";
      apis
        .getLink(content.id)
        .then((data) => {
          this.link = data.url;
        })
        .catch((error) => {
          this.link.isLoading = false;
        });
      window.onclick = function (event) {
        if (event.target == md) {
          md.style.display = "none";
        }
      };
    },
    toggle: (condition) => {
      const md = document.getElementById("myModal");
      if (condition == 1) {      
        md.style.display = "block";
      } else {
        md.style.display = "none";
      }
    },
  },
});

var scene = new Vue({
  el: "#scene",
  data: {
    content: {},
  },
});

var tab = new Vue({
  el: "#tab",
  data: {
    title: "",
  },
});

init();
async function init() {
  //Get uer from local storage
  app.auth = await JSON.parse(localStorage.getItem(DB.AUTH));
  app.user = await JSON.parse(localStorage.getItem(DB.USER));
  menu.user = await JSON.parse(localStorage.getItem(DB.USER));

  ContentById(id);
}

function intialApp(img360) {
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
    })
    .catch((error) => {
      // Handle any errors
      console.log(error.message);
    });
}

function ContentById(id) {
  this.isLoading = true;
  apis
    .getContent(id)
    .then((data) => {
      this.isLoading = false;
      this.isError = false;

      app.content = data;
      scene.content = data;
      app.cate = data.cat.title;
      menu.cate = data.cat.title;
      app.date = data.date;
      menu.date = data.date;
      app.place = data.place;
      app.location = data.place.location;
      tab.title = data.title;
      menu.content = data;
      menu.place = data.place;
      menu.location = data.place.location;
      var storage = firebase.storage();
      const img360 = storage.refFromURL(data.image360);
      intialApp(img360);
    })
    .catch((error) => {
      this.isLoading = false;
      this.isError = true;
      this.error = error;
    });
}

var modal = document.getElementById("myModal");
var btn = document.getElementById('menu')
btn.onclick= function () {
  modal.style.display = "block";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

