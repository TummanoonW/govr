const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

ContentById(id)

var app = new Vue({
  el: '#app',
  data: {
    content360: [],
    date: '',
    cate: ''
  }
})
var scene = new Vue({
  el: '#scene',
  data: {
    content: []
  }
})

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
      const img = document.getElementById("img360");
      const thumb = document.getElementById("thumbnail");
      img.setAttribute("src", url);
      thumb.setAttribute("src", url);
      console.log("success");


    })
    .catch((error) => {
      // Handle any errors
      console.log(error.message);
    });
}


function ContentById(id) {
  apis.getContentById(id).then(data => {
    app.content360 = data
    console.log(scene.content = data)
    app.cate = data.cat.title
    console.log( app.date =new Date(data.date['_seconds']*1000))
    const img360 = imgRef.child(data.image360);
    intialApp(img360)
  })
}




