let user = JSON.parse(localStorage.getItem(DB.USER));
let data = {
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
};
let files = {
    name: "",
    i360: "",
    iThumbnail: "",
};
var app = new Vue({
    el: "#app",
    data: {
        title: "",
        description: "",
        category: "",
        categories: [],
        image360: "",
        loc: '',
    },
    methods: {
        toHome: function () {
            window.location.href = PAGES.INDEX;
        },
        setContent: async (title, des, cat) => {
            try {
                data.uid = user.uid;
                data.title = title;
                data.description = des;
                data.category = cat;
                let i = Dropzone.forElement("#demo-upload");
                var message = i.files[0].dataURL;
                let name = fileName(data.uid);
                files.name = name;
                files.i360 = message;
            } catch (err) {
                console.log(err.message);
            }
        },
        setLocation: async (loc) => {
            data.location = [loc.latitude, loc.longitude];
        },
        setThumbnail: async (privacy) => {
            let i = Dropzone.forElement("#upload");
            var message = i.files[0].dataURL;
            files.iThumbnail = message;
            data[privacy] = true;
            console.log(files);
            uploadContent();
        },
        getLocation: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            } else {
                this.loc = "Geolocation is not supported by this browser."
            }
        },
        showPosition: function showPosition(position) {
            this.loc = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        }
    },
});

initData();
function initData() {
    $.get(
        "https://us-central1-govr-42c7d.cloudfunctions.net/api/categories/all",
        function (data) {
            app.categories = data;
        }
    );
}
console.log(user);
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
                data.image360 = url;
            });
        });
    });
    await urlToBlob(files.iThumbnail).then(async (blob) => {
        await thRef.put(blob).then(async function (snapshot) {
            await snapshot.ref.getDownloadURL().then((url) => {
                pg.setAttribute("style", "width: 60%");
                data.thumbnail = url;
            });
        });
    });
    await contentsRef
        .doc()
        .set(data)
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