var app = new Vue({
    el: "#app",
    data: {
      lang: { name: "", code: "" },
    },
    created: async function () {
      langs.getSelected()
        .then(lang => {
          this.lang = lang;
          document.title = lang.COOKIES
        });
    },
    methods: {
        selectLang: function () {
            langs.selectLanguage(this.lang.code);
            langs.getSelected()
              .then(lang => {
                this.lang = lang;
                document.title = lang.COOKIES
              });
          },
    },
  });