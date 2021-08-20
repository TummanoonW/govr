const firebaseConfig = {
  apiKey: "AIzaSyBdJYPHvhaFuT1i2DyAlnuNOdSWHZCcaj4",
  authDomain: "govr-42c7d.firebaseapp.com",
  projectId: "govr-42c7d",
  storageBucket: "govr-42c7d.appspot.com",
  messagingSenderId: "687841800798",
  appId: "1:687841800798:web:e4a5d4bd6c7d4ea1503acf",
  measurementId: "G-KQLN5KBHTM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const storage = firebase.storage()

//firebase firestore
const usersRef = db.collection("Users");
const userInfoRef = db.collection("UserInfo");
const contentsRef = db.collection("Contents");
const linksRef = db.collection("Links");
const categoryRef = db.collection("Category");
const billRef = db.collection("Bills");
const subscriptionRef = db.collection("Subscriptions");

//firebase storage
const imgRef = storage.ref().child('360');
const thumbRef = storage.ref().child('thumbnails');
const thumb720Ref = storage.ref().child('thumbnails720');
const profileRef = storage.ref().child('profiles')

const DB = {
  USER: 'USER',
  AUTH: 'AUTH',
  USERINFO: 'UESRINFO',
  CONTENT: 'CONTENT',
  CATEGORY: 'CATEGORY',
  COOKIES: 'COOKIES'
};

const PAGES = {
  INDEX: "index.html",
  CALCULATOR: "calculator.html",
  LOGIN: "login.html",
  LOGOUT: "logout.html",
  REGISTER: "register.html",
  MAIN: "main.html",
  MYPROFILE: "my-profile.html",
  CATEGORY: "category.html",
  UPLOAD: "upload.html",
  WEBXR: "webxr.html",
  EDIT: "edit.html",
  CART: "cart.html",
  CHECKOUT: "checkout.html",
  TERMS_AGREEMENT: "terms-agreement.html",
  PRIVACY_POLICY: "privacy-policy.html",
  COOKIES: "cookies.html",
  ABOUTS_CONTACTS: "abouts-contacts.html",
  USER: "user.html",
  ORDER_DETAILS: "order-details.html"
};

const LINKS = {
  TWITTER: 'twitter.com',
  FACEBOOK: 'facebook.com',
  LINKEDIN: 'linkedin.com',
  INSTAGRAM: 'instagram.com',
  YOUTUBE: 'youtube.com'
}

const ASSETS = {
  LOGO512: 'assets/images/govr-logo-512.png'
}
