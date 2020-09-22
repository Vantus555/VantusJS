; VantusJS.prototype.Navbar = function (navbar, speed = 250, display = 'block', direction = 'down', width = '') {
    this.event({
        events: ['click'],
        funcs: [
            function () {
                let collapsing = V(this).parent(navbar).children('.v-collapsing');
                collapsing.toggleShow({
                    speed: speed,
                    display: display,
                    direction: direction,
                    width: width
                });
            }
        ]
    });
    if (navbar == '.v-navbar-2') V(".v-navbar-2-items").Navbar2(speed);
}

VantusJS.prototype.Navbar2 = function (speed) {
    this.event({
        events: ['mouseover', 'mouseout'],
        funcs: [
            function () {
                let border = V(this).parent().children(".borderdown");
                border.show({
                    speed: 150,
                    display: "flex",
                    direction: 'right'
                });
            },
            function () {
                let border = V(this).parent().children(".borderdown");
                border.show({
                    speed: 150,
                    display: "flex",
                    direction: 'rightback'
                });
            }
        ]
    });
}