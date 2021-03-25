var app = new Vue({
  el: "#app",
  data: {
    lang: { name: "", code: "" },
    auth: {},
    username: "",
    email: "",
    password: "",
    userLoggedin: [],
    userData: [],
    isLoading: false,
    isError: false,
    error: ""
  },
  created: async function () {
    langs.getSelected()
      .then(lang => {
        this.lang = lang;
        document.title = lang.LOG_IN
      });

    this.auth = await JSON.parse(localStorage.getItem(DB.AUTH));

    if (this.auth != null) {
      window.location.href = PAGES.INDEX;
    }
  },
  methods: {
    selectLang: function () {
      langs.selectLanguage(this.lang.code);
      langs.getSelected()
        .then(lang => {
          this.lang = lang;
          document.title = lang.LOG_IN
        });
    },
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



