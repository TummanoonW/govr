document.title = "My Calculator"

let user = JSON.parse(localStorage.getItem(DB.USER))

if(user != null || user != undefined){    
    var app = new Vue({
        el: '#app',
        data: {
            title: 'My Calculator',
            user: user,
            num1: 0,
            num2: 0,
            answer: 0
        },
        methods: {
            logout: function(){
                localStorage.removeItem(DB.USER)
                window.location.href = PAGES.INDEX
            },
            plus: function() {
                const n1 = Number(this.num1)
                const n2 = Number(this.num2)
                this.answer = n1 + n2
            },
            minus: function() {
                const n1 = Number(this.num1)
                const n2 = Number(this.num2)
                this.answer = n1 - n2
            },
            multiply: function() {
                const n1 = Number(this.num1)
                const n2 = Number(this.num2)
                this.answer = n1 * n2
            },
            divide: function() {
                const n1 = Number(this.num1)
                const n2 = Number(this.num2)
                this.answer = n1 / n2
            }
        }
    })
}else{
    window.location.href = PAGES.INDEX
}