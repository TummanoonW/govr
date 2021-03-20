var app = new Vue({
    el: "#app",
    data: {
        isLoading: false,
        isError: false,
        error: ""
    },
    methods: {
        logout: () => {
            this.isLoading = true;
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.isLoading = false;
                    this.isError = false;
                    localStorage.removeItem(DB.USER);
                    localStorage.removeItem(DB.AUTH);
                    localStorage.removeItem(DB.USERINFO);

                    window.location.href = PAGES.INDEX;
                })
                .catch((err) => {
                    this.isLoading = false;
                    this.isError = true;
                    this.error = err;
                    console.log(err.message);
                });
        },
    },
});

app.logout();
