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

const usersRef = db.collection("Users");
const userInfoRef = db.collection("UserInfo");
const contentsRef = db.collection("Contents");
const linksRef = db.collection("Links");
const categoryRef = db.collection("Category");

const DB = {

};

const PAGES = {
  INDEX: "index.html",
  CALCULATOR: "calculator.html",
  LOGIN: "login.html",
  REGISTER: "register.html",
  MAIN: "main.html",
  MYPROFILE: "my-profile.html",
};