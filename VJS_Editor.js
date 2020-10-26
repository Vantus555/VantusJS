
; VantusJS.prototype.editorCode = function (valueLeft, valueTop) {
    let main = this;
    this.valueLeft = valueLeft;
    this.valueTop = valueTop;
    this.line_count = 1;
    this.cursor_node = '<div class="v-editor-cursor"></div>';

    this.event({
        events: ['blur'],
        funcs: [
            function(e){
                V(this).children('.v-editor-cursor').remove();
            }
        ]
    });

    this.event({
        events: ['click'],
        funcs: [
            function(e){
                V('.v-editor-active-area').removeClass('v-editor-active-area');
                let activeline = V(this).addClass('v-editor-active-area');/**/

                let line_count = 1;
                let x = e.offsetX;
                let y = e.offsetY;
                let top = 0;
                let left = 0;
                let count_elems = V(this).children('text');

                while(top < y - main.valueTop)
                    top+=main.valueTop;
                while(left < x - main.valueLeft)
                    left+=main.valueLeft;
                //alert(left + 'x' + top);
                let cur = VantusJS.createElement(main.cursor_node);
                if(count_elems.count == 0){
                    cur.css({
                        'left': 0,
                        'top': 0
                    });
                    V(this).put(cur, 'append');
                }
                else{
                    let cursor = V(this).parent('.v-editor').children('.v-editor-cursor');
                    if(cursor.count == 0)
                        cursor = VantusJS.createElement(main.cursor_node);
                    let h = parseInt(V(this).css('width'));
                    let symbols_in_line = parseInt(h/main.valueLeft);
                    let cursor_position = (top/main.valueTop)*symbols_in_line + (left/main.valueLeft);
                    let elems_in_area = V(this).children('text');

                    if(elems_in_area.count > cursor_position){
                        cursor.css({
                            'left': left + 'px',
                            'top': top + 'px'
                        });
                    }
                    else{
                        let l = parseInt(elems_in_area.count % symbols_in_line) * main.valueLeft;
                        let t = parseInt(elems_in_area.count / symbols_in_line) * main.valueTop;
                        cursor.css({
                            'left': l + 'px',
                            'top': t + 'px'
                        });
                    }

                    V(this).put(cursor, 'append');
                }
            }
        ],
        elements: ['.v-editor-area']
    });

    V(window).event({
        events: ['keydown'],
        funcs: [
            function(e){
                let cursor = main.parent().children('.v-editor-cursor');
                if(cursor.count != 0){
                    e.preventDefault();

                    let inputValue = e.which;
                    let left = parseFloat(cursor.css('left'));
                    let top = parseFloat(cursor.css('top'));
                    let area = cursor.parent('.v-editor-area');
                    let areaWH = area.css(['width', 'height']);
                    let prevTextElems = cursor.prevAll();
                    let lineW = parseInt(cursor.parent('.v-editor-area').css('width'));
                    let lineH = parseFloat(cursor.parent('.v-editor-area').css('height'));
    
                    let LH = parseInt(lineH / parseInt(main.valueTop));
                    lineH = valueTop * LH;
    
                    let symbols_in_line = parseInt(lineW/valueLeft);
                    let cursor_position = (top/valueTop)*symbols_in_line + (left/valueLeft);
                    cursor_position = parseInt(cursor_position);
                    
                    areaWH.forEach((value, key, map) => {
                        map.set(key, parseInt(areaWH.get(key)));
                    });
                    if( inputValue >= 48 && inputValue <= 90 || 
                        inputValue >= 96 && inputValue <= 111 || 
                        inputValue >= 219 && inputValue <= 222 || 
                        inputValue >= 187 && inputValue <= 192 || 
                        [32, 9].indexOf(inputValue) != -1)
                    {
                        let text = 0;
                        let length = 1;
                        if(inputValue == 32)
                            text = document.createTextNode('\u00A0');
                        else if(inputValue == 9)
                            text = document.createTextNode('\u00A0');
                        else text = document.createTextNode(e.key);
    
                        for (let i = 0; i < length; i++) {
                            if(cursor_position == 0)
                                cursor.parent().put(text, 'prepend');
                            else{
                                prevTextElems.get(cursor_position - 1).put(text, 'after');
                            }
                            if(left < lineW-valueLeft)
                                cursor.css({'left': left + valueLeft + 'px'});
                            else {
                                cursor.css({'left': valueLeft + 'px'});
                                cursor.css({'top': top + valueTop + 'px'});
                            }
                        }
                    }
                    else if(e.key == 'ArrowLeft'){
                        if(left > 0)
                            cursor.css({'left': left - valueLeft + 'px'});
                        else if(top != 0){
                            cursor.css({'left': symbols_in_line*valueLeft + 'px'});
                            cursor.css({'top': top-valueTop + 'px'});
                        }
                        else if(top == 0 && left == 0){
                            let parentline = cursor.parent('.v-editor-line');
                            let prevline = parentline.prevElement();
                            if(prevline){
                                let prevarea = prevline.children('.v-editor-area');
                                let elemsinprevarea = prevarea.children('all');
    
                                let topprev = parseFloat(prevarea.css('height'));
                                let i = 0;
                                while(i < top)
                                    i+=valueTop;
                                topprev = i;
    
                                let leftprev = parseInt(elemsinprevarea.count % symbols_in_line);
    
                                cursor.css({
                                    'top': topprev + 'px',
                                    'left': leftprev * valueLeft + 'px'
                                })
    
                                prevarea.put(cursor, 'append');
                            }
                        }
                    }
                    else if(e.key == 'ArrowRight'){
                        if(prevTextElems.count > cursor_position){
                            if(left <= areaWH.get('width')-valueLeft)
                                cursor.css({'left': left + valueLeft + 'px'});
                            else{
                                cursor.css({'left': 0 + 'px'});
                                cursor.css({'top': top + valueTop + 'px'});
                            }
                        }
                        else{
                            let next = cursor.parent('.v-editor-line').nextElement();
                            if(next){
                                cursor.css({
                                    'left': 0,
                                    'top': 0
                                });
                                next.children('.v-editor-area').put(cursor, 'append');
                            }
                        }
                    }
                    else if(e.key == 'ArrowUp'){
                        if(top > 0)
                            cursor.css({'top': top - valueTop + 'px'});
                        else{
                            let parentline = cursor.parent('.v-editor-line');
                            let prevline = parentline.prevElement();
                            if(prevline){
                                let prevarea = prevline.children('.v-editor-area');
                                let elemsinprevarea = prevarea.children('all');
                                let prevareaHfake = parseFloat(prevline.children('.v-editor-area').css('height'));
                                let prevareaH = 0;
                                let y = 0;
                                let x = 0;
                                do {
                                    prevareaH+=valueTop;
                                    y = prevareaHfake - prevareaH;
                                    x = parseInt(y);
                                } while (x != 0);

                                if(prevareaHfake < prevareaH - valueTop)
                                    prevareaH -= valueTop;
                                
                                let prevareaSymobolsLeft = parseInt(elemsinprevarea.count % symbols_in_line);
    
                                if(elemsinprevarea.count >= cursor_position && prevareaSymobolsLeft == 0){
                                    cursor.css({
                                        'top' : prevareaH - valueTop + 'px',
                                    });
                                }
                                else if(cursor_position > prevareaSymobolsLeft){
                                    cursor.css({
                                        'left' : prevareaSymobolsLeft * valueLeft + 'px',
                                        'top' : prevareaH - valueTop + 'px',
                                    });
                                }
                                else{
                                    cursor.css({
                                        'left' : cursor_position * valueLeft + 'px',
                                        'top' : prevareaH - valueTop + 'px',
                                    });
                                }
    
                                prevarea.put(cursor, 'append');
                            }
                        }
                    }
                    else if(e.key == 'ArrowDown'){
                        let a = Math.abs(parseInt(lineH - valueTop));
                        let elemsinarea = area.children('all');
                        let ost = parseInt(elemsinarea.count % symbols_in_line);
                        if(top < lineH - valueTop && ost >= cursor_position)
                            cursor.css({'top': top + valueTop + 'px'});
                        else if(top < lineH - valueTop && ost <= cursor_position){
                            cursor.css({'top': top + valueTop + 'px'});
                            let b = (ost - 1) * valueLeft;
                            cursor.css({'left': b + 'px'});
                        }
                        else if(parseInt(top) == a){
                            let nextline = cursor.parent('.v-editor-line').nextElement();
                            if(nextline){
                                let area = nextline.children('.v-editor-area');
                                let areaH = parseFloat(area.css('height'));
                                let ost = area.children('text').count % symbols_in_line;

                                let curs_ost = cursor_position % symbols_in_line;
                                
                                cursor.css({
                                    'top': 0
                                });

                                if(ost < curs_ost){
                                    cursor.css({
                                        'left': ost * valueLeft + 'px'
                                    });
                                }
                                else if(ost > curs_ost){
                                    cursor.css({
                                        'left': curs_ost * valueLeft + 'px'
                                    });
                                }
                                area.put(cursor, 'append');
                            }
                        }
                    }
                    else if(e.key == 'Backspace'){
                        if(left > 0)
                            cursor.css({'left': left - valueLeft + 'px'});
                        else if(top != 0){
                            cursor.css({'left': symbols_in_line*valueLeft - valueLeft + 'px'});
                            cursor.css({'top': top-valueTop + 'px'});
                        }
                        else if(cursor_position == 0){
                            let parentline = cursor.parent('.v-editor-line');
                            let prevline = parentline.prevElement();
                            if(prevline){
                                main.line_count-=1;
                                let prevarea = prevline.children('.v-editor-area');
                                let elemsinprevarea = prevarea.children('all');
                                let prevareaH = prevline.css('height');
                                let prevareaSymobolsLeft = parseInt(elemsinprevarea.count % symbols_in_line);
    
                                if(prevareaSymobolsLeft == 0){
                                    cursor.css({
                                        'left' : elemsinprevarea.count * valueLeft + 'px',
                                        'top' : 0,
                                    });
                                }
                                else{
                                    cursor.css({
                                        'left' : prevareaSymobolsLeft * valueLeft + 'px',
                                        'top' : prevareaH - valueTop + 'px',
                                    });
                                }
    
                                prevarea.put(prevTextElems, 'append');
                                prevarea.put(cursor, 'append');
                                parentline.remove();
                                let num_lines = main.children('.v-editor-line-num');

                                num_lines.for((index, velement, mass) => {
                                    velement.text(index+1);
                                    return true;
                                });
                            }
                        }
                        if(cursor_position != 0){
                            if(left != 0 && top == 0){
                                prevTextElems.get(left/valueLeft-1).remove();
                            }
                            else{
                                prevTextElems.get(((top/valueTop)*symbols_in_line) + (left/valueLeft) - 1).remove();
                            }
                        }
                    }
                    else if(e.key == 'Enter'){
                        if(cursor.count != 0){
                            main.line_count+=1;
                            let newline = ` <div class="v-editor-line">\
                                                <div class="v-editor-line-num"></div>\
                                                <div class="v-editor-area"></div>\
                                            </div>`;
                            newline = VantusJS.createElement(newline);
                            let addnewline = cursor.parent('.v-editor-line');
                            let newlineparent = newline.children('.v-editor-area');
    
                            if(cursor_position < prevTextElems.count){
                                for (let i = 0; i < prevTextElems.count - cursor_position; i++) {
                                    newlineparent.put(prevTextElems.get(cursor_position+i), 'append');
                                }
                            }
                            cursor.css({
                                'top': 0,
                                'left': 0
                            });
    
                            newlineparent.put(cursor, 'append');
                            addnewline.put(newline, 'after');
    
                            let num_lines = main.children('.v-editor-line-num');

                            num_lines.for((index, velement, mass) => {
                                velement.text(index+1);
                                return true;
                            });
                        }
                    }
                    
                    V('.v-editor-active-area').removeClass('v-editor-active-area');
                    cursor.parent('.v-editor-area').addClass('v-editor-active-area');/**/
                }
            }
        ]
    });
}

