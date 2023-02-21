/**
 * Writer - 안학룡(BieNew22)
 * Role of this file
 *              - manage confetti when a user sets a new record
 *              - orginal source : https://kmkblog.tistory.com/292 
 *              - changes : remove jQuery, function -> class
 *              - confettiManger use singleton pattern
 * Date of latest update - 2023.02.21
 */


class ConfettiParticle {
    
    constructor(color, ctx, confettiSize) {
        this.ctx = ctx;
        this.x = Math.random() * ctx.width;
        this.y = Math.random() * ctx.height - ctx.height;
        this.color = color;
        this.radius = Math.floor(Math.random() * (15 - 10 + 1) + 10);;
        this.dencity = (Math.random() * confettiSize) + 10;
        this.tilt = Math.floor(Math.random() * 10) - 10;;
        this.angle = 0;
        this.tiltAngleIncremental = (Math.random() * 0.07) + .05;
        this.tiltAngle = 0;
    }

    draw_particle() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.radius / 2;
        this.ctx.strokeStyle = this.color;
        this.ctx.moveTo(this.x + this.tilt + (this.radius / 4), this.y);
        this.ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.radius / 4));
        this.ctx.stroke();
    }

    next_step(particleIdx) {
        // calc next paricle location
        this.angle += 0.01;
        this.tiltAngle += this.tiltAngleIncremental;
        this.y += (Math.cos(this.angle + this.dencity) + 3 + this.radius / 2) / 3;
        this.x += Math.sin(this.angle);
        this.tilt = (Math.sin(this.tiltAngle - (particleIdx / 3))) * 15;
    }

    reposition(x, y, tilt) {
        // when particle moving out 
        this.x = x;
        this.y = y;
        this.tilt = tilt;
    }
}


let confettiManagerInstance = null;
class ConfettiManager {
    constructor() {
        if (confettiManagerInstance != null) {
            return confettiManagerInstance;
        }

        this.confettiActive = false;

        this.animationComplete = true;
        this.animationHandler = null;
        this.animationSpeed = 1000 / 60;
        this.animationDuration = 3000;

        this.particleColor = {
            colorList: ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"],
            colorIndex: 0,
            colorIncrementer: 0,
            colorThreshold: 5,
            getColor: function () {
                if (this.colorIncrementer >= this.colorThreshold) {
                    this.colorIncrementer = 0;
                    this.colorIndex += 1;
                    if (this.colorIndex >= this.colorList.length) {
                        this.colorIndex = 0;
                    }
                }
                this.colorIncrementer += 1;
                return this.colorList[this.colorIndex];
            }
        };

        this.angle = 0;
        this.particleNumber = 50;

        confettiManagerInstance = this;
    }

    start_confetti() {
        // init canvas
        this.canvas = document.getElementById("canvas");
        this.canvas.width = this.canvas.width * 2;
        this.canvas.height = this.canvas.height * 2;

        this.ctx = this.canvas.getContext("2d");
        this.ctx.width = this.canvas.width;
        this.ctx.height = this.canvas.height;

        this.confettiActive = true;
        this.animationComplete = false;
        
        this.particleList = new Array();
        for(let i = 0; i < this.particleNumber; i++) {
            this.particleList.push(new ConfettiParticle(this.particleColor.getColor(), this.ctx, this.particleNumber));
        }

        // start animation
        this.animation_loop(this);

        setTimeout((obj)=>{obj.deactive_confetti();}, this.animationDuration, this);
    }

    deactive_confetti() {
        // stop make new confetti particle
        this.confettiActive = false;
        cancelAnimationFrame(this.animationHandler);
    }

    end_confetti() {
        // end confetti
        this.animationComplete = true;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    is_active() {
        return this.confettiActive;
    }

    animation_loop(obj) {
        if (obj.animationComplete) {
            return;
        }

        obj.draw_confetti();
        obj.animationHandler = requestAnimationFrame(function() {
            setTimeout(function () {
                obj.animation_loop(obj);
            }, obj.animationSpeed);
        });
    }

    draw_confetti() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.particleList.length; i++) {
            this.particleList[i].draw_particle();
        }
        this.update_particle();
    }

    update_particle() {
        let remainingFlakes = 0;

        this.angle += 0.01;

        for (let i = 0; i < this.particleList.length; i++) {
            let particle = this.particleList[i];

            if (!this.confettiActive && particle.y < -15) {
                particle.y = this.canvas.height + 100;
                continue;
            }

            particle.next_step(i);

            if (particle.y <= this.canvas.height) {
                remainingFlakes += 1;
            }

            this.check_reposition(particle, i);
        }

        if (remainingFlakes == 0) {
            this.end_confetti();
        }
    }

    check_reposition(particle, idx) {
        if ((particle.x > this.canvas.width + 20 || particle.x < -20 || particle.y > this.canvas.height) && this.confettiActive) {
            if (idx % 5 > 0 || idx % 2 == 0) {
                particle.reposition(Math.random() * this.canvas.width, -10, Math.floor(Math.random() * 10) - 20);
            } else {
                if (Math.sin(this.angle) > 0) {
                    //Enter from the left
                    particle.reposition(-20, Math.random() * this.canvas.height, Math.floor(Math.random() * 10) - 20);
                } else {
                    //Enter from the right
                    particle.reposition(this.canvas.width + 20, Math.random() * this.canvas.height, Math.floor(Math.random() * 10) - 20);
                }
            }
        }
    }
}