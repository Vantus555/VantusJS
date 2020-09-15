//import VantusJS from VantusJS.js 

let settingsShow = {
    func: 'linear',
    direction: 'down',
    display: 'block', 
    speed: 0
}

VantusJS.prototype.toggleShow = function(settings = {}){
    let a  = this.css('display');
    if(this.css('display') == 'none')
        this.show(settings);
    else this.hide(settings);
}

VantusJS.prototype.hide = function(settings = {}){
    if(Object.keys(settings).length == 0)
        this.css({'display' : ''});
    else{
        if(settings.direction == 'down' || settings.direction == ''){
            settings.direction = 'up';
            settings.display = 'none';
            this.show(settings);
        }
        if(settings.direction == 'right'){
            settings.direction = 'rightback';
            settings.display = 'none';
            this.show(settings);
        }
    }
}

VantusJS.prototype.show = function(settings = {})
{
    let elems = this;
    let display = settings.display ? settings.display : settingsShow.display;
    let direction = settings.direction ? settings.direction : settingsShow.direction;
    let speed = settings.speed ? settings.speed : settingsShow.speed;
    let func = settings.func ? settings.func : settingsShow.func;

    let stepOpacity = 1/(speed+1);
    
    if(speed > 0){
        if(direction == 'down'){
            elems.array().forEach(element => {
                let opacity = stepOpacity;
                let Velem = V(element);
                Velem.css({'overflow' : 'hidden'});
                let height = parseFloat(Velem.css('height'));
                if(height!=0)
                {
                    for (let i = 0; i <= height; i+=height/speed) {
                        setTimeout(function(){
                            if(i==0)
                                Velem.css({
                                    'height': i + 'px',
                                    'opacity': opacity,
                                    'display' : display
                                });
                            else
                                Velem.css({
                                    'height': i + 'px',
                                    'opacity': opacity
                                });
                            opacity += stepOpacity;
                        }, speed/height * i);
                    }
                    setTimeout(function(){
                        Velem.css({
                            'height': '',
                            'opacity': '',
                            'overflow' : ''
                        });
                        //elems.css({'display' : display});
                    }, speed);
                }
            });
        }
        if(direction == 'up'){
            elems.array().forEach(element => {
                let opacity = 1;
                let Velem = V(element);
                Velem.css({'overflow' : 'hidden'});
                let height = parseFloat(Velem.css('height'));
                if(height!=0)
                {
                    let j = 0;
                    for (let i = height; i >= 0; i-=height/speed) {
                        setTimeout(function(){
                            Velem.css({
                                'height': i + 'px',
                                'opacity': opacity
                            });
                            opacity -= stepOpacity;
                        }, speed/height * j);
                        j += height/speed;
                    }
                    setTimeout(function(){
                        Velem.css({
                            'height': '',
                            'opacity': '',
                            'overflow' : ''
                        });
                        elems.css({'display' : ''});
                    }, speed);
                }
            });
        }
        if(direction == 'right'){
            elems.array().forEach(element => {
                let opacity = stepOpacity;
                let Velem = V(element);
                Velem.css({'overflow' : 'hidden'});
                let width = parseFloat(Velem.css('width'));
                if(width!=0){
                    for (let i = 0; i <= width; i+=width/speed) {
                        setTimeout(function(){
                            if(i == 0)
                                Velem.css({
                                    'width': i + 'px',
                                    'opacity': opacity,
                                    'display' : display
                                });
                            else
                                Velem.css({
                                    'width': i + 'px',
                                    'opacity': opacity,
                                });
                            opacity += stepOpacity;
                        }, speed/width * i);
                    }
                    setTimeout(function(){
                        Velem.css({
                            'width': '',
                            'opacity': '',
                            'overflow' : ''
                        });
                    }, speed);
                }
            });
        }
        if(direction == 'rightback'){
            elems.array().forEach(element => {
                let opacity = 1;
                let Velem = V(element);
                Velem.css({'overflow' : 'hidden'});
                let width = parseFloat(Velem.css('width'));
                if(width!=0){
                    let j = 0;
                    for (let i = width; i >= 0; i-=width/speed) {
                        setTimeout(function(){
                            if(i == 0)
                                Velem.css({
                                    'width': i + 'px',
                                    'opacity': opacity
                                });
                            else
                                Velem.css({
                                    'width': i + 'px',
                                    'opacity': opacity,
                                });
                            opacity -= stepOpacity;
                        }, speed/width * j);
                        j += width/speed;
                    }
                    setTimeout(function(){
                        Velem.css({
                            'width': '',
                            'opacity': '',
                            'overflow' : '',
                            'display' : ''
                        });
                    }, speed);
                }
            });
            
        }
        if(direction == 'right_down'){
            elems.array().forEach(element => {
                let opacity = stepOpacity;
                let Velem = V(element);
                Velem.css({'overflow' : 'hidden'});
                let height = parseFloat(Velem.css('height'));
                let width = parseFloat(Velem.css('width'));
                let stepWidth = width/speed;
                let countWidth = stepWidth;
                if(height!=0 && height!=0)
                {
                    for (let i = 0; i <= height; i+=height/speed) {
                        setTimeout(function(){
                            if(i==0)
                                Velem.css({
                                    'height': i + 'px',
                                    'width': countWidth + 'px',
                                    'opacity': opacity,
                                    'display' : display
                                });
                            else
                                Velem.css({
                                    'height': i + 'px',
                                    'width': countWidth + 'px',
                                    'opacity': opacity
                                });
                            opacity += stepOpacity;
                            countWidth += stepWidth;
                        }, speed/height * i);
                    }
                    setTimeout(function(){
                        Velem.css({
                            'width': '',
                            'height': '',
                            'opacity': '',
                            'overflow' : ''
                        });
                    }, speed);
                }
            });
            Velem.css({
                'height': '',
                'width': '',
                'opacity': ''
            });
        }
    }

}