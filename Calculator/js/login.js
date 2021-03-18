var app = new Vue({
  el: "#app",
  data: {
    username: "",
    email: "",
    password: "",
    userLoggedin: [],
    userData: [],
    isLoading: false,
    isError: false,
    error: ""
  },
  methods: {
    login: function () {
      this.isLoading = true
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          const auth = userCredential.user;

          apis.getUser(auth.uid).then(data => {
            localStorage.setItem(DB.AUTH, JSON.stringify(auth));
            localStorage.setItem(DB.USER, JSON.stringify(data));
            
            this.isLoading = false
            this.isError = false

            window.location.href = PAGES.INDEX;
          }).catch(error => {
            this.isLoading = false
            this.isError = true
            this.error = error
          })
        }).catch((error) => { //SHOW ERROR
          this.isLoading = false
          this.isError = true
          this.error = error
        });
    },
  },
});




