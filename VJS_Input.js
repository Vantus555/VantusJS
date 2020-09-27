
V('.v-input-btn-clear').event({
    events: ['click'],
    funcs: [
        function () {
            let input = V(this).parent().children('.v-input-clear');
            input.val('');
        }
    ]
});