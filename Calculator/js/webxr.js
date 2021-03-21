const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

//var img360 = imgRef.child(content.image360);

var app = new Vue({
  el: '#app',
  data: {
    auth: {},
    user: {},
    content: {},
    date: '',
    cate: '',
    user: null,
    isLoading: false,
    isError: false,
    error: ""
  }
})

var scene = new Vue({
  el: '#scene',
  data: {
    content: {}
  }
})

init();
async function init(){
  //Get uer from local storage
  app.auth = await JSON.parse(localStorage.getItem(DB.AUTH));
  app.user = await JSON.parse(localStorage.getItem(DB.USER));

  ContentById(id)
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
      console.log("success");


    })
    .catch((error) => {
      // Handle any errors
      console.log(error.message);
    });
}


function ContentById(id) {
  this.isLoading = true
  apis.getContent(id).then(data => {
    this.isLoading = false
    this.isError = false

    app.content = data
    scene.content = data
    app.cate = data.cat.title
    app.date =new Date(data.date['_seconds']*1000)
    var storage = firebase.storage();
    const img360 = storage.refFromURL(data.image360);   
    intialApp(img360)
  }).catch(error => {
    this.isLoading = false
    this.isError = true
    this.error = error
  });
}