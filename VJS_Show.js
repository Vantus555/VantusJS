//import VantusJS from VantusJS.js 

let settingsShow = {
    func: 'linear',
    direction: 'down',
    display: 'block', 
    speed: 0
}

VantusJS.prototype.show = function(settings)
{
    let elems = this;
    let display = settings.display ? settings.display : settingsShow.display;
    let direction = settings.direction ? settings.direction : settingsShow.direction;
    let speed = settings.speed ? settings.speed : settingsShow.speed;
    let func = settings.func ? settings.func : settingsShow.func;

    let stepOpacity = 1/(speed+1);

    elems.css({'display' : display});

    if(direction == 'down'){
        elems.array().forEach(element => {
            let opacity = stepOpacity;
            let Velem = V(element);
            Velem.css({'overflow' : 'hidden'});
            let height = parseFloat(Velem.css('height'));
            if(height!=0)
                for (let i = 0; i <= height; i+=height/speed) {
                    setTimeout(function(){
                        Velem.css({
                            'height': i + 'px',
                            'opacity': opacity
                        });
                        opacity += stepOpacity;
                    }, speed/height * i);
                }
        });
    }
    if(direction == 'right'){
        elems.array().forEach(element => {
            let opacity = stepOpacity;
            let Velem = V(element);
            Velem.css({'overflow' : 'hidden'});
            let width = parseFloat(Velem.css('width'));
            if(width!=0)
                for (let i = 0; i <= width; i+=width/speed) {
                    setTimeout(function(){
                        Velem.css({
                            'width': i + 'px',
                            'opacity': opacity
                        });
                        opacity += stepOpacity;
                    }, speed/width * i);
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
                for (let i = 0; i <= height; i+=height/speed) {
                    setTimeout(function(){
                        Velem.css({
                            'height': i + 'px',
                            'width': countWidth + 'px',
                            'opacity': opacity
                        });
                        opacity += stepOpacity;
                        countWidth += stepWidth;
                    }, speed/height * i);
                }
        });
    }

}