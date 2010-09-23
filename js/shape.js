var Rect = function(_x, _y, _h, _w, _r) {
    var self = this;
    self.x = _x; self.y = _y;
    self.h = _h; self.w = _w;
    self.r = _r;

    self.resize = function(_h,_w) {
        self.h = _h;
        self.w = _w;
    };

    self.corners = function(_r) {
        self.r = _r
    };
};

var Ellipse = function(_x, _y, _rx, _ry) {
    var self = this;

    self.x = _x; self.y = _y;
    self.rx = _rx; self.ry = _ry;

    self.resize = function(x, y) {
        self.rx = Math.abs(x - self.x);
        self.ry = Math.abs(y - self.y);
    };
};
