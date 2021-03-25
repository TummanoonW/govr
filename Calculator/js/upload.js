let user = JSON.parse(localStorage.getItem(DB.USER));
let map;
let service;
let infowindow;

let files = {
    name: "",
    i360: "",
    iThumbnail: "",
};


var app = new Vue({
    el: "#app",
    data: {
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
                title: '',
                location: {lat:0, lng:0}
            },
            title: "",
            description: "",
            category: "",
            date: new Date(),
            private: false,
            published: false,
            disabled: false,
            thumbnail: "",
        },
    },
    created: function(){
        apis.allCategories().then(data => {
            app.categories = data;
        }).catch(error => {
            console.error(error)
        });
    },
    methods: {
        toHome: function () {
            window.location.href = PAGES.INDEX;
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
                files.i360 = message;
            } catch (err) {
                console.log(err.message);
            }
        },
        setThumbnail: async (privacy) => {
            modal2.style.display = "none";
            modal3.style.display = "block";

            let i = Dropzone.forElement("#upload");
            var message = i.files[0].dataURL;
            files.iThumbnail = message;

            switch(privacy){
                case 'public':
                    app.content.published = true;
                    app.content.private = false;
                    break;
                case 'only-link':
                    app.content.published = false;
                    app.content.private = false;
                    break;
                case 'private':
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
        title: 'Dhurakij Pundit University',
        location: { lat: 13.8707137, lng: 100.5484985 }
    };
    map = new google.maps.Map(
        document.getElementById('googleMap'), 
        { center: example.location, zoom: 15 }
    );
    createMarker(example);
}

function searchPlace(query){
    service = new google.maps.places.PlacesService(map)

    const request = {
        query: query,
        fields: ['name', 'geometry'],
    };

    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                const place = {
                    title: results[i].name,
                    location: results[i].geometry.location
                }
                console.log(place)
                createMarker(place);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
}

function createMarker(place){
    app.query = place.title;
    app.content.place = place
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

async function uploadContent() {
    let ref = imgRef.child(files.name);
    let thRef = thumpRef.child(files.name);
    let pg = document.getElementById("progress");
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
                pg.setAttribute("style", "width: 60%");
                app.content.thumbnail = url;
            });
        });
    });
    await contentsRef
        .doc()
        .set(app.content)
        .then(() => {
            setTimeout(() => {
                pg.setAttribute("style", "width: 100%");
            }, 1000)
            setTimeout(() => {
                window.location.href = PAGES.INDEX
            }, 1500);
        })
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
        modal3.style.display = "none";
    }
};