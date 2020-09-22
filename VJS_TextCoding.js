; VantusJS.prototype.textCoding = function (text = '', speed = 50) {
    let elem = this;
    let textLength = text.length;
    let speedStep = speed / textLength;
    V(window).event({
        events: ['load'],
        funcs: [
            function () {
                for (let i = 0; i < textLength; i++) {
                    setTimeout(() => {
                        let currenttext = elem.text();
                        elem.text(currenttext + text[i]);
                        if (i + 1 == textLength)
                            elem.parent('.text-coding').children('.text-line-coding').addClass('text-line-coding-blink');
                    }, speedStep * i);
                }
            }
        ]
    });
}