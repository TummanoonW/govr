var apis = {
    // <USER CMS FUNCTIONS>
    registerUser: function (user, userInfo) {
        return new Promise((resolve, reject) => {
            $.post(
                "https://us-central1-govr-42c7d.cloudfunctions.net/api/users/register", 
                { u: user, uinfo: userInfo },
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
    },
    // </USER CMS FUNCTIONS>

    // <CONTENT CMS FUNCTIONS>
    getContentsNewest: function () {
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
    getContentsByUid: function (uid) {
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/byuid?uid=${uid}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        })
    },
    getContent: function (id) {
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/contents?id=${id}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        })
    },
    createContent: function (content) {
        return new Promise((resolve, reject) => {
            $.post(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/create`,
                content,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        })
    },
    updateContent: function (content) {
        return new Promise((resolve, reject) => {
            $.put(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/update`,
                content,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        })
    },
    deleteContent: function (id) {
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/delete?id=${id}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        })
    },
    // </CONTENT CMS FUNCTIONS>

    // <CATEGORY CMS FUNCTIONS>
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
    getCategoryByLabel: function (label) {
        return new Promise((resolve, reject) => {
            $.get(`https://us-central1-govr-42c7d.cloudfunctions.net/api/categories/bylabel?label=${label}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        });
    },
    // </CATEGORY CMS FUNCTIONS>

    // <LINK CMS FUNCTIONS>
    getLink: function (contentId) {
        return new Promise((resolve, reject) => {
            $.get(`https://us-central1-govr-42c7d.cloudfunctions.net/api/links/get?contentId=${contentId}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        });
    },
    generateLink: function (contentId) {
        return new Promise((resolve, reject) => {
            $.get(`https://us-central1-govr-42c7d.cloudfunctions.net/api/links/gen?contentId=${contentId}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function(error){
                reject(error)
            })
        });
    },
    // </LINK CMS FUNCTIONS>

}