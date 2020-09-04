'use strict';

let sttingsEvents = {
    events: [],
    funcs: [],
    useCapture: false
}

function isEmpty(obj) {
    for (let key in obj) 
        return false;
    return true;
}

class VantusJS {
    constructor(query){
        this.elems = Array();
        if('forEach' in query)
            query.forEach(element => {
                this.elems.push(element);
            });
        else{
            this.elems.push(query);
        }
    }
    event(sttingsEvents){
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
    css(styles = []){
        if(styles.length != 1){
            this.elems.forEach(element => {
                for (var key in styles) {
                    element.style.setProperty(key, styles[key]);
                }
            });
        }
        else{
            let result = [];
            this.elems.forEach(element => {
                result.push(window.getComputedStyle(element).getPropertyValue(styles));
            });
            return result;
        }

        return this;
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