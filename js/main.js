class Timer {
    statusRun = false;
    defaultTime = 30000;
    constructor(el) {
        this.el = document.querySelector(el);
        this.elStart = this.el.querySelector("#start");
        this.elNext = this.el.querySelector("#next");
        this.elPlus = this.el.querySelector("#timer__plus");
        this.elMinus = this.el.querySelector("#timer__minus");
        this.elSec = this.el.querySelector("#sec");
        this.elColon = this.el.querySelector("#colon");
        this.elMs = this.el.querySelector("#ms");

        this.elStart.addEventListener('click', () => {
            if (!this.statusRun) {
            	this.statusRun = true;
                this.start();
            } else if (this.statusRun) {
                this.statusRun = false;
                this.stop();
            }
        });
        this.elNext.addEventListener('click', () => {
            this.next()
        });
        this.elPlus.addEventListener('click', () => {
            if (!this.statusRun && this.defaultTime < 60000) {
                this.currentTime = this.defaultTime += 1000;
                this.render();
            }
        });
        this.elMinus.addEventListener('click', () => {
            if (!this.statusRun && this.defaultTime > 0) {
                this.currentTime = this.defaultTime-= 1000;
                this.render();
            }
        });
    };
    get time() {
        return this.currentTime;
    };
    set time(ms) {
        this.currentTime = ms;
        this.render();
    };
    start() {
        if (this.statusRun) {
        	this.currentTime = this.defaultTime;
            this.elStart.innerText = 'Stop';
            this.animateChange(this.elColon, false);
            this.timerId = setInterval(() => {
                
                if (this.currentTime / 1000 <= 10) {
                    this.animateChange(this.el.querySelector(".timer__time"), true);
                }
                if (this.currentTime) {
                    this.currentTime -= 100;
                } else {
                    this.animateChange(this.el.querySelector(".timer__time"), false);
                    this.currentTime = this.defaultTime;
                }
                this.render()
            }, 100);
        }
    }
    stop() {
        clearInterval(this.timerId);
        this.elStart.innerText = 'Start';
        this.animateChange(this.elColon, true);
        this.animateChange(this.el.querySelector(".timer__time"), false);
        this.currentTime = this.defaultTime;
        this.statusRun = false;
    }
    next() {
        this.animateChange(this.el.querySelector(".timer__time"), false);
        if (this.statusRun) this.currentTime = this.defaultTime;
    }
    animateChange(el, status) {
        let classAnimate = 'timer__time-animate';
        let checkClass = el.classList.value.indexOf(classAnimate) === -1 ? false : true;
        if (!status && checkClass) {
            el.classList.remove(classAnimate);
        }
        if (status && !checkClass) {
            el.classList.add(classAnimate);
        }
    }
    render(){
    	this.elSec.innerHTML = (this.currentTime / 1000).toFixed(0);
        this.elMs.innerHTML = (this.currentTime / 1000).toFixed(2).split('.')[1];
    }
}
let timer = new Timer('#Timer')