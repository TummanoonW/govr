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
    location:{},
    stored: {}
  },
  created: async function () {
    langs.getSelected().then((lang) => {
      this.lang = lang;
    });

    this.isLoading = true;
    const auth = await JSON.parse(localStorage.getItem(DB.AUTH));
    console.log(auth)
    if (auth == null) {
      window.location.href = PAGES.INDEX
    }

    await ContentById(auth,id);

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
    openMap: (num) => {
      var map = document.getElementById('myModal')
      
      if(num == 1){
        map.style.display = 'block';
      }
      else{
        map.style.display = 'none';
      }
    },
    updateLocation: ()=> {
      app.content.place = app.stored
      app.place = app.stored

      var map = document.getElementById('myModal')
      map.style.display = 'none'
    }
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
  app.stored = place;
  console.log(app.stored)
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

function ContentById(auth,id) {
  this.isLoading = true;
  apis
    .getContent(id)
    .then((con) => {
      if (auth.uid !== con.uid) {
        window.location.href = PAGES.INDEX
      }else{
        app.isLoading = false;
        app.isError = false;
        console.log(con);
        app.content = con;
        app.cat = con.category;
        tab.title = con.title;
        app.place = con.place;
        app.location = con.place['location']
      }
      
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
