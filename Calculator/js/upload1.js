var app = new Vue({
  el: "#app",
  data: {
    auth: {},
    user: {},
    categories: [],
    files: {
      name: "",
      i360: "",
      iThumbnail: "",
    },
    content: {
      uid: "",
      image360: "",
      location: [],
      title: "",
      description: "",
      category: "",
      date: new Date(),
      private: false,
      published: false,
      disabled: false,
      thumbnail: "",
    },
    isLoading: false,
    isError: false,
    error: null
  },
  methods: {
    toHome: function () {
      window.location.href = PAGES.INDEX;
    },
    setContent: async (title, des, cat) => {
      try {
        app.content.uid = app.auth.uid
        app.content.title = title;
        app.content.description = des;
        app.content.category = cat;
        let i = Dropzone.forElement("#demo-upload");
        var message = i.files[0].dataURL;
        let name = generateFileName(app.content.uid);
        app.files.name = name;
        app.files.i360 = message;
      } catch (err) {
        console.log(err.message);


      }
    },
    setLocation: async (location) => {
      if (!navigator.geolocation) {
        this.isError = true
        this.error = "Geolocation is not supported by your browser"
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          this.isError = false
          app.content.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          console.log(app.content.location)
        }, () => {
          this.isError = true
          this.error = "Unable to retrieve your location"
        });
      }
    },
    setThumbnail: function () {
      let i = Dropzone.forElement("#upload");
      var message = i.files[0].dataURL;
      app.files.iThumbnail = message;
      app.content.privacy = true;
      app.uploadContent();
    },
    uploadContent: async function () {
      let ref = imgRef.child(files.name);
      let thRef = thumpRef.child(files.name);

      let pg = document.getElementById("progress");
      pg.setAttribute("style", "width:0%");
      console.log("uploading ...");

      await urlToBlob(files.i360).then(async (blob) => {
        await ref.put(blob).then(async function (snapshot) {
          await snapshot.ref.getDownloadURL().then((url) => {
            pg.setAttribute("style", "width:30%");
            data.content.image360 = url;
          });
        });
      });

      await urlToBlob(files.iThumbnail).then(async (blob) => {
        await thRef.put(blob).then(async function (snapshot) {
          await snapshot.ref.getDownloadURL().then((url) => {
            pg.setAttribute("style", "width: 60%");
            data.content.thumbnail = url;
          });
        });
      });

      await apis.createContent(app.content).then(() => {

        setTimeout(() => {
          window.location.href = PAGES.MYPROFILE;
        }, 1000);
      }).catch(error => {

      });
    }
  },
});

init();
async function init() { //initialization
  app.auth = await JSON.parse(localStorage.getItem(DB.AUTH));
  app.user = await JSON.parse(localStorage.getItem(DB.USER));

  if (app.auth != null) { //IF IS LOGGED IN
    initData();
  } else {
    window.location.href = PAGES.INDEX
  }
  
}

function initData() {
  app.isLoading = true;
  app.isError = false;

  apis.allCategories().then(data => {
    app.isLoading = false;
    app.isError = false;
    console.log(data)
    app.categories = data;
  }).catch(error => {
    app.isLoading = false;
    app.isError = true;
    app.error = error;
  });
}

function generateFileName(uid) {
  let date = new Date();
  let name =
    uid +
    "-" +
    date.getFullYear() +
    "-" +
    date.getMonth() +
    "-" +
    date.getDate() +
    "-" +
    date.getHours() +
    "-" +
    date.getMinutes() +
    "-" +
    date.getSeconds() +
    ".jpg";
  return name;
}

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

// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var back = document.getElementsByClassName("back")[0];
var back2 = document.getElementsByClassName("back2")[0];
var con = document.getElementsByClassName("continue")[0];
var con2 = document.getElementsByClassName("continue2")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
span2.onclick = function () {
  modal2.style.display = "none";
};
back.onclick = function () {
  modal.style.display = "none";
};
con.onclick = function () {
  modal.style.display = "none";
  modal2.style.display = "block";
};
back2.onclick = function () {
  modal.style.display = "block";
  modal2.style.display = "none";
};
con2.onclick = function () {
  modal2.style.display = "none";
  modal3.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
};
