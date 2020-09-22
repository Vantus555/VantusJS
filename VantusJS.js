'use strict';

function isEmpty(obj) {
    for (let key in obj)
        return false;
    return true;
}

class VantusJS {
    constructor(query) {
        this.elems = Array();
        if (Array.isArray(query) || query instanceof NodeList)
            query.forEach(element => {
                this.elems.push(element);
            });
        else {
            this.elems.push(query);
        }
        this.count = this.elems.length;
    }

    get(i) {
        return V(this.elems[i]);
    }

    elem(i) {
        return this.elems[i];
    }

    event(sttingsEvents = {
        events: [],
        funcs: [],
        useCapture: false
    }) {
        let i = 0;
        let j = 0;
        if (sttingsEvents.events.length != 0 && sttingsEvents.funcs.length != 0) {
            this.elems.forEach(elem => {
                for (let count = 0; count < sttingsEvents.events.length; count++) {
                    elem.addEventListener(sttingsEvents.events[i], sttingsEvents.funcs[j], sttingsEvents.useCapture);
                    if (i < sttingsEvents.events.length - 1)
                        i++;
                    if (j < sttingsEvents.funcs.length - 1)
                        j++;
                }
                j = 0;
                i = 0;
            });
        }
        return this;
    }

    click() {
        this.elems.forEach(element => {
            element.click();
        });
    }

    css(styles) {
        if (!(styles instanceof Array)) {
            if (typeof (styles) == "string") {
                let res = [];
                this.elems.forEach(element => {
                    res.push(window.getComputedStyle(element).getPropertyValue(styles));
                });
                if (res.length == 1)
                    return res[0];
                else {
                    let set = new Set(res);
                    if (set.size == 1)
                        return Array.from(set)[0];
                    else
                        return res;
                }
            }
            else {
                this.elems.forEach(element => {
                    if (!(styles instanceof Map))
                        for (var key in styles) {
                            element.style.setProperty(key, styles[key]);
                        }
                    else
                        styles.forEach((value, key, map) => {
                            element.style.setProperty(key, value);
                        });

                });
            }
        }
        else {
            let level1 = [];

            this.elems.forEach(element => {
                let level2 = new Map();
                styles.forEach(prop => {
                    level2.set(prop, window.getComputedStyle(element).getPropertyValue(prop));
                });
                let flag = true;
                level1.forEach(element => {
                    if (element == level2) {
                        flag = false;
                        //break;
                    }
                });
                if (flag)
                    level1.push(level2);
            });

            if (level1.length == 1) {
                if (level1[0].length == 1)
                    return level1[0][0];
                else
                    return level1[0];
            }

            return level1;
        }
    }

    attr() {
        if (arguments.length == 1) {
            let a = [];
            this.elems.forEach(element => {
                a.push(element.getAttribute(arguments[0]));
            });
            return a;
        }
        else if (arguments.length == 2) {
            this.elems.forEach(element => {
                if (arguments[1] != '')
                    element.setAttribute(arguments[0], arguments[1]);
                else element.removeAttribute(arguments[0]);
            });
        }
        return this
    }

    array() {
        return this.elems;
    }

    hasClass(search_class) {
        if (this.elems[0].classList.contains(search_class)) {
            return true;
        }
        return false;
    }

    addClass(search_class = '') {
        this.elems.forEach(element => {
            element.classList.add(search_class);
        });
    }

    removeClass(search_class = '') {
        this.elems.forEach(element => {
            element.classList.remove(search_class);
        });
    }

    toggleClass(search_class = '') {
        this.elems.forEach(element => {
            element.classList.toggle(search_class);
        });
    }

    parent(search_class = '') {
        if (search_class == '')
            return V(this.elems[0].parentElement);
        else {
            let parent = this.elems[0].closest(search_class)
            return parent ? V(parent) : false;
        }
    }

    isEmpty() {
        return (this.elems.length == 1 && this.elems[0] == null) ? true : false;
    }

    children(search_class = '') {
        if (search_class == '') {
            let htmlCollection = [].slice.call(this.elems[0].children);
            return V(htmlCollection);
        }
        else {
            let htmlCollection = [].slice.call(this.elems[0].querySelectorAll(search_class));
            let arr = []
            htmlCollection.forEach(element => {
                arr.push(element);
            });
            return V(arr);
        }
    }

    put(what, how) {
        if (what != 0) {
            if (how == 'append')
                this.elems.forEach(element => { element.append(what); });
            if (how == 'prepend')
                this.elems.forEach(element => { element.prepend(what); });
            if (how == 'before')
                this.elems.forEach(element => { element.before(what); });
            if (how == 'after')
                this.elems.forEach(element => { element.after(what); });
            if (how == 'replace')
                this.elems.forEach(element => { element.replaceWith(what); });
        }
    }

    forEach(callback) {
        this.elems.forEach(element => {
            callback(V(element));
        });
    }

    for(callback) {
        for (let i = 0; i < this.elems.length; i++) {
            if (!callback(i, V(this.elems[i]), this.elems))
                break;
        }
    }

    text() {
        if (arguments.length == 0)
            return this.elems[0].textContent;
        else this.elems[0].textContent = arguments[0];
    }

}

let V = (str) => {
    if (typeof (str) == "string") {
        let elems = document.querySelectorAll(str);
        if (elems.length)
            return new VantusJS(elems);
        else return new VantusJS([]);//alert('Не удалось найти элемент(ы): "' + str +'"');
    }
    else return new VantusJS(str);
}