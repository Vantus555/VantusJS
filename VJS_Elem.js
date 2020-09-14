class VJS_Elem{
    constructor(str){
        this.str = str.replace(/\s/g, '');
        this.mass = Array();
        this.elem = Array();
        this.parseElem();
        this.getElems();
    }
    parseElem(){
        for (let i = 0; i < this.str.length; i++) {
            if(this.str[i].match(/[#;:.,>+]/)){
                this.mass.push(i);
                this.mass.push(this.str[i]);
            }
        }
        console.log(this.mass);
        if(this.mass[0] == 0){
            for (let i = 0; i < this.mass.length; i+=2) {
                if(this.mass.length-2 == i)
                    this.elem.push(this.str.substring(this.mass[i]));
                else
                    this.elem.push(this.str.substring(this.mass[i], this.mass[i + 2]));
            }
        }
        else{
            if(this.mass.length == 0){
                this.elem.push(this.str);
            }
            else{
                this.elem.push(this.str.substring(0, this.mass[0]));
                for (let i = 0; i < this.mass.length; i+=2) {
                    if(this.mass.length-2 == i)
                        this.elem.push(this.str.substring(this.mass[i]));
                    else
                        this.elem.push(this.str.substring(this.mass[i], this.mass[i + 2]));
                }
            }
        }
        console.log(this.elem);
    }
    getElems(){
        
    }
}