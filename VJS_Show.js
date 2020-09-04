//import VantusJS from VantusJS.js 

VantusJS.prototype.show = (
    display = 'block', 
    func = 'linear', 
    speed = 0, 
    duration = 0) => 
{
    if(duration == 0){
        let height = V(this).css(['height']);
        console.log(height);
    }
}