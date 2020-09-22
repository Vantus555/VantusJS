; V(".v-btn-collapse").event({
    events: ['click'],
    funcs: [
        function () {
            let thiselem = V(this);
            if (!thiselem.hasClass("v-btn-collapse-x") && !thiselem.hasClass("v-btn-collapse-notx")) {
                thiselem.toggleClass("v-btn-collapse-x");
            }
            else {
                thiselem.toggleClass("v-btn-collapse-notx");
                thiselem.toggleClass("v-btn-collapse-x");
            }
        }
    ]
});