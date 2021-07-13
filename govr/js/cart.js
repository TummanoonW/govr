var app = new Vue({
  el: "#app",
  data: {
    lang: { name: "", code: "" },
    isLoading: false,
    isError: false,
    error: "",
    duration: 0,
    option: "",
    amount: 0,
  },
  created: async function () {
    const auth = await JSON.parse(localStorage.getItem(DB.AUTH));

    if (auth == null) {
      window.location.href = PAGES.INDEX;
    } else {
      langs.getSelected().then((lang) => {
        this.lang = lang;
      });

      this.calPrice();
      
    }
  },
  methods: {
    selectLang: function () {
      langs.selectLanguage(this.lang.code);
      langs.getSelected().then((lang) => {
        this.lang = lang;
      });
    },
    editCart: function (num) {
      n = parseInt(this.duration);

      if (num == 1) {
        this.duration = n - 1;
        app.calPrice();
      } else {
        this.duration = n + 1;
        app.calPrice();
      }
    },
    calPrice: function () {
      let n = parseInt(this.duration);
      if (this.option === "Months") {
        this.amount = n * 100;
      } else if (this.option === "Years") {
        this.amount = n * (100 * 12);
      }
    },
    showOmise: function (amt) {
      // OmiseCard.configureButton("#checkout-button", {
      //   amount: amt * 100,
      //   defaultPaymentMethod: "internet_banking",
      // });
      // OmiseCard.configureButton("#checkout-button-alt", {
      //   publicKey: "pkey_test_5nw5dlqajzq9gdwvuba",
      //   frameLabel: "GoVR",
      //   submitLabel: "Pay",
      //   currency: "THB",
      //   amount: amt * 100,
      //   defaultPaymentMethod: "credit_card",
        
      // });
      //  OmiseCard.attach();

      OmiseCard.configure({
        publicKey: "pkey_test_5nw5dlqajzq9gdwvuba",
        frameLabel: "GoVR",
        submitLabel: "Pay",
        currency: "THB",
      });
      OmiseCard.open({
        amount: amt * 100,
        submitFormTarget: '#checkout-form',
        otherPaymentMethods:["internet_banking"],
        onCreateTokenSuccess: (nonce) => {
          /* Handler on token or source creation.  Use this to submit form or send ajax request to server */
          console.log(nonce)

        },
        onFormClosed: () => {
          /* Handler on form closure. */
        },
      })
      Omise.setPublicKey('pkey_test_5nw5dlqajzq9gdwvuba')
      // Omise.configure({secret_key: "skey_test_4xs8breq3htbkj03d2x"})
      console.log(Omise)
    },


  },
});
