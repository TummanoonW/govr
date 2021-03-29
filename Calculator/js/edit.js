// Able to update thumbnail
// Able to change location

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

var app = new Vue({
  el: "#app",
  data: {
    lang: { name: "", code: "" },
    update:{
      title: "",
    description: "",
    category: ""
    },
    title: "",
    description: "",
    category: "",
    content: {},
    categories: [],
    cat: "",
    auth: {},
    place: {},
    query: "",
    isLoading: false,
    isError: false,
    error: "",
  },
  created: async function () {
    langs.getSelected().then((lang) => {
      this.lang = lang;
    });

    this.isLoading = true;
    const auth = await JSON.parse(localStorage.getItem(DB.AUTH));
    this.auth = auth;

    ContentById(id);

    apis.allCategories().then((data) => {
      this.categories = data;
    });
  },
  methods: {
    selectLang: function () {
      langs.selectLanguage(this.lang.code);
      langs.getSelected().then((lang) => {
        this.lang = lang;
      });
    },
    back: function () {
      window.location.href = PAGES.MYPROFILE;
    },
    setContent: async (title, des, cat) => {
      try {
        uploadContent();
      } catch (err) {
        console.log(err.message);
      }
    },
  },
});

var tab = new Vue({
  el: "#tab",
  data: {
    title: "",
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
        console.log(place);
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

async function uploadContent() {
  let pg = document.getElementById("progress");
  pg.setAttribute("style", "width:0%");
  console.log("uploading ...");
  try {
    apis.updateContent(app.content).then((con) => {
      app.content = con;
      setTimeout(() => {
        pg.setAttribute("style", "width: 100%");
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });

  } catch (e) {
    console.log(data);
    console.log(e.message);
  }
}

function ContentById(id) {
  this.isLoading = true;
  apis
    .getContent(id)
    .then((con) => {
      app.isLoading = false;
      app.isError = false;
      console.log(con);
      app.content = con;
      app.cat = con.category;
      tab.title = con.title;
      app.place = con.place;
    })
    .catch((error) => {
      app.isLoading = false;
      app.isError = true;
      app.error = error;
    });
}

var modal = document.getElementById("myModal3");
var btn = document.getElementById("myBtn");
btn.onclick = function () {
    modal.style.display = "block";
};
window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
