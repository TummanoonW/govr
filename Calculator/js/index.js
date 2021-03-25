var app = new Vue({
    el: '#app',
    data: {
        title: 'My Calculator',
        lang: { name: "", code: "" },
        email: '',
        password: ''
    },
    created: function () {
        langs.getSelected()
            .then(lang => {
                this.lang = lang;
                document.title = lang.HOME
            });
    },
    methods: {
        selectLang: function () {
            langs.selectLanguage(this.lang.code);
            langs.getSelected()
            .then(lang => {
                this.lang = lang;
                document.title = lang.HOME
            });
        },
        login: function () {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    localStorage.setItem(DB.USER, JSON.stringify(user))
                    window.location.href = PAGES.CALCULATOR
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }
})