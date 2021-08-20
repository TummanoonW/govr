var apis = {
  apiURL: 'https://us-central1-govr-42c7d.cloudfunctions.net/api',
  // <USER CMS FUNCTIONS>
  registerUser: function (user, userInfo) {
    return new Promise((resolve, reject) => {
      const body = {
        data: JSON.stringify({ u: user, uinfo: userInfo })
      }
      $.post(
        `${this.apiURL}/users/register`,
        body,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  getUserInfo: function (uid) {
    return new Promise((resolve, reject) => {
      $.get(
        `${this.apiURL}/userinfo?uid=${uid}`,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  getUser: function (uid) {
    return new Promise((resolve, reject) => {
      $.get(
        `${this.apiURL}/users?uid=${uid}`,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  updateUser: function(uid, u){
    return new Promise((resolve, reject) => {
      $.post(`${this.apiURL}/users/update?uid=${uid}`,
        u,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  updateUserInfo: function(uid, uinfo){
    return new Promise((resolve, reject) => {
      $.post(`${this.apiURL}/userinfo/update?uid=${uid}`,
        uinfo,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  // </USER CMS FUNCTIONS>

  // <CONTENT CMS FUNCTIONS>
  getContentsNewest: function (limit) {
    return new Promise((resolve, reject) => {
      $.get(
        `${this.apiURL}/contents/newest?lim=${limit}&desc=true`,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  getContentsByCategory: function (category) {
    return new Promise((resolve, reject) => {
      $.get(
        `${this.apiURL}/contents/bycategory?lim=20&desc=true&cat=${category}`,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  getContentsByUid: function (uid) {
    return new Promise((resolve, reject) => {
      $.get(
        `${this.apiURL}/contents/byuid?uid=${uid}`,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  getContent: function (id) {
    return new Promise((resolve, reject) => {
      $.get(
        `${this.apiURL}/contents?id=${id}`,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  createContent: function (content) {
    return new Promise((resolve, reject) => {
      const body = {
        data: JSON.stringify(content)
      }
      $.post(
        `${this.apiURL}/contents/create`,
        body,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  updateContent: function (content) {
    return new Promise((resolve, reject) => {
      const body = {
        data: JSON.stringify(content)
      }
      $.ajax({
        method: `PUT`,
        url: `${this.apiURL}/contents/update`,
        data: body,
      }).done(function (data) {
        resolve(data);
      });
    });
  },
  deleteContent: function (id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: `DELETE`,
        url: `${this.apiURL}/contents/delete?id=${id}`,
      }).done(function (data) {
        resolve(data);
      });
    });
  },
  // </CONTENT CMS FUNCTIONS>

  // <CATEGORY CMS FUNCTIONS>
  allCategories: function () {
    return new Promise((resolve, reject) => {
      $.get(
        `${this.apiURL}/categories/all`,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  getCategoryByLabel: function (label) {
    return new Promise((resolve, reject) => {
      $.get(
        `${this.apiURL}/categories/bylabel?label=${label}`,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  // </CATEGORY CMS FUNCTIONS>

  // <LINK CMS FUNCTIONS>
  getLink: function (contentId) {
    return new Promise((resolve, reject) => {
      $.get(
        `${this.apiURL}/links/get?contentId=${contentId}`,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  generateLink: function (contentId) {
    return new Promise((resolve, reject) => {
      $.get(
        `${this.apiURL}/links/gen?contentId=${contentId}`,
        function (data) {
          resolve(data);
        }
      ).fail(function (error) {
        reject(error);
      });
    });
  },
  // </LINK CMS FUNCTIONS>
    // <BILLS AND ORDERS>
    getBillsbyUid: function(uid){
      return new Promise((resolve, reject) => {
        $.get(
          `${this.apiURL}/bills/byuid?uid=${uid}`,
          function (data) {
            resolve(data);
          }
        ).fail(function (error) {
          reject(error);
        });
      })
    },
    getBill: function(id){
      return new Promise((resolve, reject) => {
        $.get(
          `${this.apiURL}/bills?id=${id}`,
          function (data) {
            resolve(data);
          }
        ).fail(function (error) {
          reject(error);
        });
      })
    }
};
