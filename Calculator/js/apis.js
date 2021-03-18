
var apis = {
    allCategories: function () {
        return new Promise((resolve, reject) => {
            $.get("https://us-central1-govr-42c7d.cloudfunctions.net/api/categories/all",
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        });
    },
    getNewestContent: function () {
        return new Promise((resolve, reject) => {
            $.get(
                "https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/newest?lim=20&desc=true",
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        })
    },
    getContentsByCategory: function (category) {
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/bycategory?lim=20&desc=true&cat=${category}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        })
    },
    registerUser: function (user, userInfo) {
        return new Promise((resolve, reject) => {
            $.post(
                "https://us-central1-govr-42c7d.cloudfunctions.net/api/users/register", { u: user, uinfo: userInfo },
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        })
    },
    getUserInfo: function(uid){
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/userinfo?uid=${uid}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        })
    },
    getUser: function(uid){
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/users?uid=${uid}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        })
    }

}
