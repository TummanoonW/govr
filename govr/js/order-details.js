const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

var app = new Vue({
    el: "#app",
    data: {
      lang: { name: "", code: "" },
      auth: null,
      user: null,
      bill: null,
      isLoading: false,
      isError: false,
      error: ""
    },
    created: async function () {  
      langs.getSelected().then((lang) => {
        this.lang = lang;
      });
  
      //Get uer from local storage
      this.auth = await JSON.parse(localStorage.getItem(DB.AUTH));
      this.user = await JSON.parse(localStorage.getItem(DB.USER));
      this.isLoading = true;
      // Use API to get user's subscription
  
      try {
        if (this.auth != null) {
          //calling user info
            this.bill = await apis.getBill(id)
            console.log(this.bill)
            if(this.auth.uid == this.bill.uid){
                this.isLoading = false
            }else{
                this.isLoading = false
                window.location.href = PAGES.INDEX
            }
        } else {
          this.isLoading = false
          window.location.href = PAGES.INDEX
        }
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
      print: function(){
        var printContents = document.getElementById('printArea').innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
      }
    },
  });
  