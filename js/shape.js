var Rect = function(_x, _y, _h, _w, _r) {
    var self = this;
    self.x = _x + 0.5; self.y = _y + 0.5;
    self.h = _h + 0.5; self.w = _w + 0.5;
    self.r = _r;

    self.resize = function(_h,_w) {
        self.h = _h + 0.5; self.w = _w + 0.5;
    };

    self.corners = function(_r) {
        self.r = _r
    };
};
