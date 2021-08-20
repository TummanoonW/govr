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
    author: {},
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
      $('#myLinkModal').modal('show')
      apis
        .getLink(content.id)
        .then((data) => {
          this.link = data.url;
        })
        .catch((error) => {
          this.link.isLoading = false;
        });
    },
  },
});

var menu = new Vue({
  el: "#m",
  data: {
    content: {},
    author: {},
    place: {},
    date: "",
    cate: "",
    user: {},
    link: {},
    location: {},
  },
  created: async function () {
    await this.getSharedLink(this.content)
  },
  methods: {
    toEdit: () => {
      window.location.href = PAGES.EDIT + `?id=${id}`;
    },
    getSharedLink: function (content) {
      apis
        .getLink(content.id)
        .then((data) => {
          this.link = data.url;
        })
        .catch((error) => {
          this.link.isLoading = false;
        });
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
  try {
    this.isLoading = true;

    //Get uer from local storage
    app.auth = await JSON.parse(localStorage.getItem(DB.AUTH));
    app.user = await JSON.parse(localStorage.getItem(DB.USER));
    menu.user = await JSON.parse(localStorage.getItem(DB.USER));

    const c = await apis.getContent(id)
    app.content = c;
    scene.content = c;
    app.cate = c.cat.title;
    menu.cate = c.cat.title;
    app.date = c.date;
    menu.date = c.date;
    app.place = c.place;
    app.location = c.place.location;
    tab.title = c.title;
    menu.content = c;
    menu.place = c.place;
    menu.location = c.place.location;
    var storage = firebase.storage();
    const img360 = storage.refFromURL(c.image360);
    intialApp(img360);

    const a = await apis.getUser(app.content.uid)
    app.author = a
    menu.author = a
  } catch (error) {
    this.isLoading = false;
    this.isError = true;
    this.error = error;
  }
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


var modal = document.getElementById("myModal");
var btn = document.getElementById('menu')
btn.onclick = function () {
  $('#myModal').modal('show')
  //modal.style.display = "block";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function copyLink() {
  /* Get the text field */
  var copyText = document.getElementById("linkInput");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}

function shareToFB() {
  const w = window.open(`https://www.facebook.com/sharer/sharer.php?u=${menu.link}`, "fb", 'height=500, width=600')
  if (window.focus) { w.focus() }
}

function shareToTW() {
  const w = window.open(`http://twitter.com/share?url=${menu.link}`, "tw", 'height=500, width=600')
  if (window.focus) { w.focus() }
}

function shareToLK() {
  const w = window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${menu.link}`, "gp", 'height=500, width=600')
  if (window.focus) { w.focus() }
}

