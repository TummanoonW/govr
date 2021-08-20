const layoutL = document.querySelector("#loading-layout")
if (layoutL) {
    layoutL.innerHTML = `
<div v-if="isLoading" class="modal-dialog modal-dialog-centered">
<div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status">
  <span class="visually-hidden"></span>
</div>
<span class="text-primary">{{lang.LOADING}}...</span>
</div>

<div class="alert alert-danger alert-dismissible fade show" v-if="isError" role="alert">
<i class="far fa-times-circle"></i>
<span class="ml-2">{{error}}</span>
</div>
    `;
}

const layoutN = document.querySelector("#navbar-layout")
if (layoutN) {
    layoutN.innerHTML = `
    <!-- Brand Start -->
    <div class="brand">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-3 col-md-5">
          <div class="b-logo">
            <a v-bind:href="PAGES.INDEX">
              <img v-bind:src="ASSETS.LOGO512" alt="Logo">
            </a>
          </div>
        </div>
        <div class="col-lg-7 col-md-4">
          <!--<div class="b-ads">
            <a href="https://htmlcodex.com">
              <img src="../img/ads-1.jpg" alt="Ads">
            </a>
          </div>-->
        </div>
        <div class="col-lg-2 col-md-3">
          <i class="fas fa-language"></i>
          <select id="langOption" class="form-control form-select" v-model="lang.code" v-on:change="selectLang">
            <option value="en">English</option>
            <option value="th">ไทย</option>
          </select>
          <!--<div class="text-right">
            <a v-bind:href="LINKS.TWITTER" class="ml-3"><i class="fab fa-twitter"></i></a>
            <a v-bind:href="LINKS.FACEBOOK" class="ml-3"><i class="fab fa-facebook-f"></i></a>
            <a v-bind:href="LINKS.LINKEDIN" class="ml-3"><i class="fab fa-linkedin-in"></i></a>
            <a v-bind:href="LINKS.INSTAGRAM" class="ml-3"><i class="fab fa-instagram"></i></a>
            <a v-bind:href="LINKS.YOUTUBE" class="ml-3"><i class="fab fa-youtube"></i></a>
          </div>-->
        </div>
      </div>
    </div>
    </div>
    <!-- Brand End -->
    
    <!-- Nav Bar Start -->
    <div class="nav-bar">
    <div class="container">
      <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <a href="#" class="navbar-brand text-uppercase">{{lang.MENU}}</a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
          <div class="navbar-nav mr-auto">
            <a id="tabHome" v-bind:href="PAGES.INDEX" class="nav-item nav-link">{{lang.HOME}}</a>
            <a id="tabProfile" v-bind:href="PAGES.MYPROFILE" class="nav-item nav-link">{{lang.MY_PROFILE}}</a>
          </div>
          <div class="d-grid gap-2" v-if="user !== null">
            <div class="btn-group profile-h">
              <a class="btn btn-primary profile-w" type="button" :href="PAGES.MYPROFILE">
                <div>
                  <img v-if="user.photoURL == null || user.photoURL == ''" src="assets/images/user.svg"
                    class="profile-r" />
                  <img v-else :src="user.photoURL" class="profile-r" />
                </div>
              </a>
    
              <button type="button" class="btn btn-primary dropdown-toggle " data-toggle="dropdown"
                aria-expanded="false">
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" type="button" :href="PAGES.UPLOAD">
                    <i class="fas fa-plus"></i>
                    <span class="ml-1">{{lang.ADD_UPLOAD}}</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" type="button" :href="PAGES.MYPROFILE">
                    {{lang.MY_PROFILE}}
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" type="button" :href="PAGES.LOGOUT">
                    {{lang.LOG_OUT}}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="ml-auto d-grid gap-2 d-md-block" v-else>
            <button v-on:click="window.location.href = PAGES.LOGIN" class="btn btn-primary"
              type="button">{{lang.LOG_IN}}</button>
            <button v-on:click="window.location.href = PAGES.REGISTER" class="btn btn-primary"
              type="button">{{lang.REGISTER}}</button>
          </div>
        </div>
      </nav>
    </div>
    </div>
    <!-- Nav Bar End -->
    `;
}

const layoutN2 = document.querySelector("#navbar-layout2")
if (layoutN2) {
    layoutN2.innerHTML = `
    <!-- Nav Bar Start -->
    <div class="nav-bar">
        <div class="container">
            <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                <a href="#" class="navbar-brand">{{lang.MENU}}</a>
                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <div class="navbar-nav mr-auto">
                        <a href="index.html" class="nav-item nav-link">{{lang.HOME}}</a>

                        <a href="my-profile.html" class="nav-item nav-link">{{lang.MY_PROFILE}}</a>
                    </div>
                    <div class="ml-auto">
                        <i class="fas fa-language text-light"></i>
                        <select id="langOption" class="form-control form-select" v-model="lang.code"
                            v-on:change="selectLang">
                            <option value="en">English</option>
                            <option value="th">ไทย</option>
                        </select>
                        <!-- <a href=""><i class="fab fa-twitter"></i></a>
                    <a href=""><i class="fab fa-facebook-f"></i></a>
                    <a href=""><i class="fab fa-linkedin-in"></i></a>
                    <a href=""><i class="fab fa-instagram"></i></a>
                    <a href=""><i class="fab fa-youtube"></i></a> -->
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <!-- Nav Bar End -->
    `;
}

const layoutF = document.querySelector("#footer-layout")
if (layoutF) {
    layoutF.innerHTML = `
    <!-- Footer Start -->
    <div class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6">
            <div class="footer-widget">
              <h3 class="title">Get in Touch</h3>
              <div class="contact-info">
                <p><i class="fa fa-map-marker"></i>332 A1-A3 Urban Square, Prachacheun 12, Lak Si, Bangkok, Thailand</p>
                <p><i class="fa fa-envelope"></i>daydevthailand@gmail.com</p>
                <p><i class="fa fa-phone"></i>+662-591-8866</p>
                <div class="social">
                  <a href="https://twitter.com/daydev"><i class="fab fa-twitter"></i></a>
                  <a href="https://www.facebook.com/daydevthailand"><i class="fab fa-facebook-f"></i></a>
                  <!-- <a href=""><i class="fab fa-linkedin-in"></i></a> -->
                  <!-- <a href="https://www.instagram.com/daydev/"><i class="fab fa-instagram"></i></a> -->
                  <a href="https://www.youtube.com/user/DAYDEVGame"><i class="fab fa-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>
    
          <div class="col-lg-3 col-md-6">
            <div class="footer-widget">
              <h3 class="title">Categories</h3>
              <ul>
                <li><a :href="PAGES.CATEGORY+'?label=indoor'">Indoor</a></li>
                <li><a :href="PAGES.CATEGORY+'?label=travel'">Travel</a></li>
                <li><a :href="PAGES.CATEGORY+'?label=outdoor'">Outdoor</a></li>
              </ul>
            </div>
          </div>
    
          <div class="col-lg-3 col-md-6">
            <div class="footer-widget">
              <h3 class="title">Latest Contents</h3>
              <ul>
                <li v-for="m in mV">
                    <a :href="PAGES.WEBXR+'?id='+m.id">{{m.title}}</a>
                </li>
              </ul>
            </div>
          </div>
    
          <!--<div class="col-lg-3 col-md-6">
            <div class="footer-widget">
              <h3 class="title">Newsletter</h3>
              <div class="newsletter">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed porta dui. Class aptent taciti
                  sociosqu
                </p>
                <form>
                  <input class="form-control" type="email" placeholder="Your email here">
                  <button class="btn">Submit</button>
                </form>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- Footer End -->
    
    <!-- Footer Menu Start -->
    <div class="footer-menu">
      <div class="container">
        <div class="f-menu">
          <a :href="PAGES.TERMS_AGREEMENT">Terms & Agreement</a>
          <a :href="PAGES.PRIVACY_POLICY">Privacy Policy</a>
          <a :href="PAGES.COOKIES">Cookies</a>
          <a :href="PAGES.ABOUTS_CONTACTS">Abouts & Contacts</a>
          <!-- <a href="PAGES.TERMS">Accessibility help</a> -->
          <!-- <a href="PAGES.TERMS">Advertise with us</a> -->
        </div>
      </div>
    </div>
    <!-- Footer Menu End -->
    
    <!-- Footer Bottom Start -->
    <div class="footer-bottom">
      <div class="container">
        <div class="row">
          <div class="col-md-6 copyright">
            <p>2021 &copy; <a href="https://www.daydev.com">Daydev Co, Ltd.</a> All Rights Reserved</p>
          </div>
    
          <div class="col-md-6 template-by">
            <p>Template By <a href="https://htmlcodex.com">HTML Codex</a></p>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer Bottom End -->
    
    <!-- Back to Top -->
    <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>
    `;
}

const layoutC = document.querySelector("#cookies-layout")
if (layoutC) {
    try {
        const c = localStorage.getItem(DB.COOKIES)
        if (!c) {
            layoutC.innerHTML = `
            <div id="cookies-popup" class="popup">
                <div class="row">
                  <div class="col-md-9 col-12 mt-3">
                    <div class="text-center">
                      <div>
                        เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณและนำเสนอเนื้อหาแบบเฉพาะบุคคล หากคุณใช้งานเว็บไซต์ของเราต่อ ถือว่าคุณยินยอมให้มีการใช้งานคุกกี้ <a :href="PAGES.COOKIES">นโยบายคุกกี้</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-12 mt-3">
                    <div class="text-right mr-4">
                      <button onclick="layout.acceptCookies()" class="btn btn-primary mr-4">ใช่ ฉันยอมรับ</button>
                    </div>
                  </div>
                </div>
            </div>
            `
        }
    } catch (error) {
        console.error(error)
    }
}

var mV = []

apis.getContentsNewest(5).then(data => {
    console.log(data)
    mV = data
})

const layout = {
    acceptCookies: function(){
        localStorage.setItem(DB.COOKIES, "true")
        document.querySelector("#cookies-popup").style = "display: none"
    }
}