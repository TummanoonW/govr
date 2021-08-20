(function ($) {
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $(".nav-bar").addClass("nav-sticky");
        } else {
            $(".nav-bar").removeClass("nav-sticky");
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
        return false;
    });
})(jQuery);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");

var app = new Vue({
    el: "#app",
    data: {
        lang: { name: "", code: "" },
        auth: null,
        user: null,
        user2: null,
        userinfo: null,
        isLoading: false,
        isError: false,
        error: "",
        categories: [],
        contents: {
            publishedC: [],
            privateC: [],
            disabledC: [],
            linkC: [],
        },
        contentCat: [],
        cont: "",
        deleteC: {
            isLoading: false,
            isError: false,
        },
        info: {
            author: {},
            cat: {},
            location: {},
        },
        link: {
            isLoading: false,
            isCopied: false,
        },
        place: {},
        userInfoFilled: false
    },
    created: async function () {
        langs.getSelected().then((lang) => {
            this.lang = lang;
        });

        //Get uer from local storage
        this.auth = await JSON.parse(localStorage.getItem(DB.AUTH));
        this.isLoading = true;
        // Use API to get user's subscription

        try {
            this.user = await apis.getUser(uid)
            document.title = this.user.displayName + "' Profile"

            //calling category
            this.categories = await apis.allCategories()

            //calling user's contents
            this.cont = await apis.getContentsByUid(uid)

            await specifyContent(this.cont);
            this.isLoading = false
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        selectLang: function () { //updating language
            langs.selectLanguage(this.lang.code);
            langs.getSelected().then((lang) => {
                this.lang = lang;
            });
        },
        getSharedLink: function (content) { //getting content's link
            $("#linkModal").modal();
            this.link.isCopied = false;
            this.link.isLoading = true;
            this.link.title = content.title;
            this.link.url = null;

            //getting link by apis
            apis
                .getLink(content.id)
                .then((data) => {
                    this.link.isLoading = false;
                    this.link.url = data.url;
                    console.log(data);
                })
                .catch((error) => {
                    this.link.isLoading = false;
                });
        },
        copyLink: function () {
            this.link.isCopied = true;
            const result = copyToClipboard(this.link.url);
            console.log(result, this.link.url);
        },
        infoContent: function (content) {
            this.info = content;
            this.place = content.place.location;
            this.info.author = this.user;
            this.info.updated = this.info.date;
            console.log(this.info);
            $("#infoModal").modal();
        },
        displayPrivacy: function (info) {
            let str = "";
            if (info.published) {
                str = "Public";
            } else if (!info.published && !info.private) {
                str = "Only people with link";
            } else {
                str = "Private";
            }
            return str;
        },
        validateAddress: function (ui) {
            return ui.fname != '' && ui.lname != '' && ui.address && ui.town != '' && ui.province != '' && ui.country != '' && ui.postal_code != '' && ui.phone != ''
        },
        shareToFB: function () {
            const w = window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.link.url}`, "fb", 'height=500, width=600')
            if (window.focus) { w.focus() }
        },
        shareToTW: function () {
            const w = window.open(`http://twitter.com/share?url=${this.link.url}`, "tw", 'height=500, width=600')
            if (window.focus) { w.focus() }
        },
        shareToLK: function () {
            const w = window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${this.link.url}`, "gp", 'height=500, width=600')
            if (window.focus) { w.focus() }
        }
    },
});


function copyToClipboard(str) {
    var input = document.getElementById("link-url");
    input.select();
    var result = document.execCommand("copy");
    return result;
}

function specifyContent(contents) {
    for (let i = 0; i < contents.length; i++) {
        if (!contents[i].disbaled) {
            if (!contents[i].published & !contents[i].private) {
                //only with link
                //onl with link
                app.contents.linkC.push(contents[i]);
            } else if (contents[i].published) {
                //published
                app.contents.publishedC.push(contents[i]);
            } else if (contents[i].private) {
                //private
                app.contents.privateC.push(contents[i]);
            }
        } else {
            //disbaled
            app.contents.disabledC.push(contents[i]);
        }
    }
    // console.log(app.contents);
}

async function disableContents() {
    // for (let i = 0; i < contents.length; i++) {
    //   if (!contents[i].disbaled) {
    //     if (!contents[i].published & !contents[i].private) {
    //       //only with link
    //       //onl with link
    //       app.contents.linkC.push(contents[i]);
    //     } else if (contents[i].published) {
    //       //published
    //       app.contents.publishedC.push(contents[i]);
    //     } else if (contents[i].private) {
    //       //private
    //       app.contents.privateC.push(contents[i]);
    //     }
    //   } else {
    //     //disbaled
    //     app.contents.disabledC.push(contents[i]);
    //   }
    // }
    let contents = app.cont
    for (let i = 5; i < contents.length; i++) {
        console.log(contents[i].id)
        await contentsRef.doc(contents[i].id).update({
            disbaled: true,
            published: false,
            private: false
        })
    }
    window.location.reload()


}

function countContents(content) {
    let count = content['publishedC'].length + content['privateC'].length + content['linkC'].length
    if (count <= 5) {
        return
    }
    else {
        console.log("User's subscription is expried")
        let modal = document.getElementById('myModal-ex').style;
        modal.display = 'block'


    }

}

