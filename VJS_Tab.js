; VantusJS.prototype.ArticleTab = function(element = ''){
    let mainelem = this;
    mainelem.children('.v-addArt').event({
        events: ['click'],
        funcs: [
            function () {
                var now = new Date();
                let elem;
                let countactive = mainelem.children('.v-art-title-active').count;
                if (countactive) {
                    elem = `<div data-art="${now.getTime()}" class="v-art-title">
                                    <span class="v-art-text">Пусто</span>
                                    <div class="v-art-close">X</div>
                                </div>`;
                }
                else {
                    elem = `<div data-art="${now.getTime()}" class="v-art-title-active v-art-title">
                                    <span class="v-art-text">Пусто</span>
                                    <div class="v-art-close">X</div>
                                </div>`;
                }
                V(this).put(elem, 'beforeBegin');
    
                let content = mainelem.children('.v-art-gr-content');
                //<div style='display: none;' data-art="${now.getTime()}" class="v-vertical-art-gr"></div>
                let contentelem;
    
    
                if (countactive)
                    contentelem = `<div style='display: none;' data-art="${now.getTime()}" class="v-contenteditable v-content-art-gr">${element}</div>`;
                else
                    contentelem = `<div style='display: block;' data-art="${now.getTime()}" class="v-contenteditable v-content-art-gr">${element}</div>`;
                content.put(contentelem, 'afterBegin');
            }
        ]
    });
    
    mainelem.children('.v-horizontal-art-gr').event({
        events: ['click'],
        funcs: [
            function () {
                var id = V(this).parent().attr('data-art');
                let content = mainelem.children(`div[data-art='${id}']`);
                content.remove();
            }
        ],
        elements: '.v-art-close'
    });
    
    mainelem.children('.v-horizontal-art-gr').event({
        events: ['click'],
        funcs: [
            function () {
                let id;
                let parent = V(this).parent('.v-art-title');
                mainelem.children('.v-art-title-active').removeClass('v-art-title-active');
    
                if (parent) {
                    parent.addClass('v-art-title-active');
                    id = parent.attr('data-art');
                }
                else {
                    V(this).addClass('v-art-title-active');
                    id = V(this).attr('data-art');
                }
    
                let main = mainelem.children('.v-art-gr-content');
                let contentHide = main.children(`div[style='display: block;']`);
                contentHide.hide();
    
                let content = main.children(`div[data-art='${id}']`);
                content.show();
            }
        ],
        elements: ['.v-art-title', '.v-art-text'],
    });
}