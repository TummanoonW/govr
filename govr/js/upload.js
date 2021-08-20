// Able to change language
// Moblie responsive
// Able to change location
// limit thumbnail size


let user = JSON.parse(localStorage.getItem(DB.AUTH));
let map;
let service;
let infowindow;
if (user == null) {
  window.location.href = PAGES.INDEX
}

let files = {
  name: "",
  i360: "",
  iThumbnail: "",
  iThumbnail720: ""
};

var app = new Vue({
  el: "#app",
  data: {
    lang: { name: "", code: "" },
    categories: [],
    query: "",
    privacy: "",
    title: "",
    description: "",
    category: "",
    content: {
      uid: "",
      image360: "",
      place: {
        title: "",
        location: { lat: 0, lng: 0 },
      },
      title: "",
      description: "",
      category: "",
      date: new Date(),
      private: false,
      published: false,
      disabled: false,
      thumbnail: "",
      thumbnail720: ""
    },
    link: {},
    isLoading: false,
    isError: false
  },
  created: function () {
    langs.getSelected()
      .then(lang => {
        this.lang = lang;
      });
    this.isLoading = true

    apis
      .allCategories()
      .then((data) => {
        app.categories = data;
        this.isLoading = false

      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    selectLang: function () {
      langs.selectLanguage(this.lang.code);
      langs.getSelected()
        .then(lang => {
          this.lang = lang;
        });
    },
    back: function () {
      window.location.href = PAGES.MYPROFILE;
    },
    setContent: async (title, des, cat) => {
      try {
        app.content.uid = user.uid;
        app.content.title = title;
        app.content.description = des;
        app.content.category = cat;
        let i = Dropzone.forElement("#demo-upload");
        var message = i.files[0].dataURL;
        let name = fileName(app.content.uid);
        files.name = name;
        files.i360 = await resizedataURL(message, 4096, 2048)
      } catch (err) {
        console.log(err.message);
      }
    },
    setThumbnail: async (privacy) => {
      modal2.style.display = "none";
      modal3.style.display = "block";

      let i = Dropzone.forElement("#upload");
      var message = i.files[0].dataURL;
      files.iThumbnail = await resizedataURL(message, 640, 480)
      files.iThumbnail720 = await resizedataURL(message, 1280, 720)

      switch (privacy) {
        case "public":
          app.content.published = true;
          app.content.private = false;
          break;
        case "only-link":
          app.content.published = false;
          app.content.private = false;
          break;
        case "private":
          app.content.published = false;
          app.content.private = true;
          break;
        default:
          app.content.published = false;
          app.content.private = true;
      }

      console.log(files);
      uploadContent();
    },
  },
});

function initMap() {
  infowindow = new google.maps.InfoWindow();

  const example = {
    title: "Dhurakij Pundit University",
    location: { lat: 13.8707137, lng: 100.5484985 },
  };
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: example.location,
    zoom: 15,
  });
  createMarker(example);
}

function searchPlace(query) {
  service = new google.maps.places.PlacesService(map);

  const example = {
    title: "Dhurakij Pundit University",
    location: { lat: 13.8707137, lng: 100.5484985 },
  };
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: example.location,
    zoom: 15,
  });

  const request = {
    query: query,
    fields: ["name", "geometry"],
  };

  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        const place = {
          title: results[i].name,
          location: results[i].geometry.location,
        };
        console.log(JSON.stringify(place));
        createMarker(place);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  app.query = place.title;
  app.content.place = place;
  const marker = new google.maps.Marker({
    position: place.location,
    title: place.title,
    map: map,
  });
}

function fileName(uid) {
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
let pg = document.getElementById("progress");

async function uploadContent() {
  let ref = imgRef.child(files.name);
  let thRef = thumbRef.child(files.name);
  let th720Ref = thumb720Ref.child(files.name);

  pg.setAttribute("style", "width:0%");
  console.log("uploading ...");

  await urlToBlob(files.i360).then(async (blob) => {
    await ref.put(blob).then(async function (snapshot) {
      await snapshot.ref.getDownloadURL().then((url) => {
        pg.setAttribute("style", "width:30%");
        app.content.image360 = url;
      });
    });
  });

  await urlToBlob(files.iThumbnail).then(async (blob) => {
    await thRef.put(blob).then(async function (snapshot) {
      await snapshot.ref.getDownloadURL().then((url) => {
        pg.setAttribute("style", "width: 45%");
        app.content.thumbnail = url;
      });
    });
  });

  await urlToBlob(files.iThumbnail720).then(async (blob) => {
    await th720Ref.put(blob).then(async function (snapshot) {
      await snapshot.ref.getDownloadURL().then((url) => {
        pg.setAttribute("style", "width: 60%");
        app.content.thumbnail720 = url;
      });
    });
  });


  await apis.createContent(app.content).then((data) => {

    pg.setAttribute("style", "width: 100%");

    setTimeout(() => {
      if (
        (app.content.published == true) & (app.content.private == false) ||
        (app.content.published == false) & (app.content.private == false)
      ) {
        const p = document.getElementById('myModal3')
        p.style.display = 'none';
        getLink(data);
        console.log(data);
      } else {
        window.location.href = PAGES.MYPROFILE;
      }
    }, 1000)

  });
}

function getLink(content) {
  const md4 = document.getElementById("myModal4");
  md4.style.display = "block";
  app.link = "https://govr-42c7d.web.app/webxr.html?id=" + content.id
  // apis
  //   .getLink(content.uid)
  //   .then((data) => {
  //     app.link = data;
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     this.link.isLoading = false;
  //   });
  window.onclick = function (event) {
    if (event.target == md4) {
      md4.style.display = "none";
    }
  };
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

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal3) {
    window.location.href = PAGES.MYPROFILE
  }
};

function imageToDataUri(img, width, height) {
  var image = new Image();
  image.src = `${img}`
  // create an off-screen canvas
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

  // set its dimension to target size
  canvas.width = width;
  canvas.height = height;

  // draw source image into the off-screen canvas:
  ctx.drawImage(image, 0, 0, width, height);

  // encode image to data-uri with base64 version of compressed image
  return canvas.toDataURL('image/jpeg', 1.0)
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