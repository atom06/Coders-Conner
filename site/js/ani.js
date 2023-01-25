class TextScramble {

    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=@$~%&+::*^?#________'
        this.update = this.update.bind(this)
        this.i = 100
    }

    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({
                from,
                to,
                start,
                end
            })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }

    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {
                from,
                to,
                start,
                end,
                char
            } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            setTimeout(() => {
                requestAnimationFrame(this.update);
                this.frame++
                this.i - 1
            }, this.i);
        }

    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}


const phrases = [
    'Hello',
    'Welcome to ',
    'Coder\'s Corrner',
    'Unleash creativity,',
    '<img src="./logo.png">'
]

const fx = new TextScramble(document.querySelector("h1.title"))

let counter = 0
const next = () => {
    if (counter < (phrases.length + 1)) {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 1000)
        })
        counter = counter + 1
    }
}

document.querySelector("h1.title").onclick = () => {
    counter = 0;
    next()
}

const h1 = document.querySelector("h1.title");

setInterval(() => {
    if (h1.innerHTML == "<img src=\"./logo.png\">") {
        setTimeout(() => {
            document.getElementById("sec-2").scrollIntoView();
        }, 1000);
    }
}, 1000);

var nav = document.querySelector("div.topBar");
var navTop = nav.offsetTop;

window.addEventListener("scroll", function() {
  if(window.pageYOffset >= navTop) {
    document.body.style.paddingTop = nav.offsetHeight + "px";
    nav.classList.add("sticky");
  } else {
    document.body.style.paddingTop = 10;
    nav.classList.remove("sticky");
  }
});