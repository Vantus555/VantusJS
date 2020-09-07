//import VantusJS from VantusJS.js 

VantusJS.prototype.show = function(settingsShow = {
    //func: 'linear',
    property: ['height'],
    move: 'down',
    display: 'block', 
    speed: 0
})
{
    let elems = this;
    elems.css({'display' : settingsShow.display});
    let h = elems.css('height');

    if(settingsShow.speed != 0){
        for (let i = 0; i < h.length; i++) {
            for (let j = 0; j <= parseInt(h[i]); j += (parseInt(h[i])/settingsShow.speed)) {
                setTimeout(function(){
                    V(elems.get(i)).css({"height" : j + 'px'});
                }, settingsShow.speed / parseInt(h[i]) + settingsShow.speed / parseInt(h[i]) * j);
            }
        } 
    }
        

}