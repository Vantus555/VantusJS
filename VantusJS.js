'use strict';

function isEmpty(obj) {
    for (let key in obj) 
        return false;
    return true;
}

class VantusJS {
    constructor(query){
        this.elems = Array();
        if(Array.isArray(query) || query instanceof NodeList)
            query.forEach(element => {
                this.elems.push(element);
            });
        else{
            this.elems.push(query);
        }
    }
    get(i){
        return this.elems[i];
    }
    event(sttingsEvents= {
        events: [],
        funcs: [],
        useCapture: false
    }){
        let i = 0;
        let j = 0;
        if (sttingsEvents.events.length != 0 && sttingsEvents.funcs.length != 0){
            this.elems.forEach(elem => {
                for (let count = 0; count < sttingsEvents.events.length; count++) {
                    elem.addEventListener(sttingsEvents.events[i], sttingsEvents.funcs[j], sttingsEvents.useCapture);
                    if(i < sttingsEvents.events.length - 1)
                        i++;
                    if(j < sttingsEvents.funcs.length - 1)
                        j++;
                }
                j = 0;
                i = 0;
            });
        }
        return this;
    }
    css(styles){
        if(!(styles instanceof Array)){
            if(typeof(styles) == "string"){
                let res = [];
                this.elems.forEach(element => {
                    res.push(window.getComputedStyle(element).getPropertyValue(styles));
                });
                if(res.length == 1)
                    return res[0];
                else return res;
            }
            else{
                this.elems.forEach(element => {
                    if(!(styles instanceof Map))
                        for (var key in styles) {
                            element.style.setProperty(key, styles[key]);
                        }
                    else
                        styles.forEach((value, key, map) =>{
                            element.style.setProperty(key, value);
                        });
                        
                });
            }
        }
        else{
            let level1 = [];

            this.elems.forEach(element => {
                let level2 = new Map();
                styles.forEach(prop => {
                    level2.set(prop, window.getComputedStyle(element).getPropertyValue(prop));
                });
                let flag = true;
                level1.forEach(element => {
                    if(element == level2){
                        flag = false;
                        //break;
                    }
                });
                if(flag)
                    level1.push(level2);
            });
                
            if(level1.length == 1){
                if(level1[0].length == 1)
                    return level1[0][0];
                else
                    return level1[0];
            }
            
            return level1;
        }
    }
    attr(attrib, value=''){
        if(value == ''){
            let a = [];
            this.elems.forEach(element => {
                a.push(element.getAttribute(attrib));
            });
            return a;
        }
        else{
            this.elems.forEach(element => {
                element.setAttribute(attrib, value);
            });
        }
    }
    
    array(){
        return this.elems;
    }
}

let V = (str) => {
    if(typeof(str) == "string"){
        let elems = document.querySelectorAll(str);
        if(elems.length)
            return new VantusJS(elems);
        else alert('Не удалось найти элемент(ы): "' + str +'"');
    }
    else return new VantusJS(str);
}