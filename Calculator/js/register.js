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
        register: function () {
            this.isLoading = true
            const username = this.username;
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(async (userCredential) => {
                    // Signed in
                    const auth = userCredential.user;
                    await auth.updateProfile({
                        displayName: username,
                    });
                    //Save user and userInfo to firebase
                    //User
                    const user = {
                        displayName: username,
                        email: user.email,
                        photoURL: null,
                        uid: user.uid,
                    };
                    //UserInfo
                    const userInfo = {
                        uid: user.uid,
                        address: '',
                        address2: '',
                        town: '',
                        province: '',
                        country: '',
                        postal_code: '',
                        phone: '',
                        fname: '',
                        lname: '',
                        type: '',
                        limitUploads: 5
                    }

                    apis.registerUser(localUser, userInfo).then(data => {
                        this.isLoading = false
                        this.isError = false

                        let user = data.u
                        let userInfo = data.uinfo

                        localStorage.setItem(DB.AUTH, JSON.stringify(auth))
                        localStorage.setItem(DB.USER, JSON.stringify(user))
                        localStorage.setItem(DB.USERINFO, JSON.stringify(userInfo))

                        window.location.href = PAGES.INDEX;
                    }).catch(error => {
                        this.isLoading = false
                        this.error = error
                        this.isError = true
                    }) //save user to firebase
                }).catch((error) => {
                    this.isLoading = false
                    this.error = error
                    this.isError = true
                });
        },
    },
});




