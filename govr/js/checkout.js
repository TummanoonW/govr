const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

var app = new Vue({
  el: "#app",
  data: {
    isLoading: true,
    isError: false,
    error: "",
  },
  created: async function () {
    const auth = await JSON.parse(localStorage.getItem(DB.AUTH));
    
    if (auth == null) {
      window.location.href = PAGES.INDEX
    }else{
      let user = await apis.getUser(id);
      let userInfo = (await userInfoRef.doc(id).get()).data();
  
      await this.bill(user, userInfo);
      window.location.href = PAGES.MYPROFILE
    }
    
  },
  methods: {
    bill: async (user, userInfo) => {
      let ed = new Date().setMonth(5);
      let ex = new Date(ed);

      let bill = {
        uid: id,
        displayName: user.displayName,
        email: user.email,
        address: userInfo.address,
        country: userInfo.country,
        town: userInfo.town,
        postal_code: userInfo.postal_code,
        orderDetail: "", // How long for the subscription
        limitUploads: 999,
        startDate: new Date().toUTCString(),
        expiredDate: ex.toUTCString(),
        amount: 999,
        method: "", // online banking or credit card
      };

      let subscription = {
        uid: id,
        limitUploads: bill.limitUploads,
        startDate: bill.startDate,
        expiredDate: bill.expiredDate,
      };
      
      userInfoRef.doc(id).update({
        limitUploads: 999,
      });

      await billRef.doc().set(bill);
      await subscriptionRef.doc().set(subscription);
    },
  },
});
