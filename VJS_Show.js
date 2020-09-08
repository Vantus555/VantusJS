//import VantusJS from VantusJS.js 

let settingsShow = {
    //func: 'linear',
    property: ['height', 'width'],
    move: 'down',
    display: 'block', 
    speed: 0
}

function show1(speed, h, node){
    h.forEach(element => {
        element.forEach((value, key, map) =>{
            for (let j = 0; j <= parseInt(value); j += parseInt(value)/speed) {
                setTimeout(function(){
                    let myMap = new Map();
                    myMap.set(key, j + 'px');
                    V(node).css(myMap);
                }, speed / parseInt(value) + speed / parseInt(value) * j);
            }
        });
    });
}

VantusJS.prototype.show = function(settings)
{
    let elems = this;
    let display = settings.display ? settings.display : settingsShow.display;
    elems.css({'display' : display});
    let h = elems.css(settingsShow.property);
    console.log(h);

    let speed = settings.speed ? settings.speed : settingsShow.speed;
    if(speed != 0){
        if(h instanceof Map){
            let arr = elems.array();
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                h.forEach((value, key, map) =>{
                    for (let j = 0; j <= parseInt(value); j += parseInt(value)/speed) {
                        setTimeout(function(){
                            let myMap = new Map();
                            myMap.set(key, j + 'px');
                            V(element).css(myMap);
                        }, speed / parseInt(value) + speed / parseInt(value) * j);
                    }
                });
            }
        }
        else if(typeof(h) == 'string'){
            for (let j = 0; j <= parseInt(h); j += parseInt(h)/speed) {
                setTimeout(function(){
                    let prop = settings.property ? settings.property : settingsShow.property;
                    let mass = new Map;
                    mass.set(prop, j + 'px');
                    elems.css(mass);
                }, speed / parseInt(h) + speed / parseInt(h) * j);
            }
        }
        else{
            let arr = elems.array();
            for (let i = 0; i < arr.length; i++) {
                const node = arr[i];
                show1(speed, h, node);
            }
        }
    }
        

}