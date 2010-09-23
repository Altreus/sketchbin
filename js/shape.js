var Rect = function(_x, _y, _h, _w, _r) {
    var self = this;
    self.x = _x + 0.5; self.y = _y + 0.5;
    self.h = _h + 0.5; self.w = _w + 0.5;
    self.r = _r;

    self.resize = function(_h,_w) {
        if( _h < 0) {
            self.y = self.y + self.h + (_h - 0.5);
            self.h = Math.abs(_h);
        }
        else {
            self.h = _h + 0.5;
        }
        
        if( _w < 0) {
            self.x = self.x + self.w + (_w - 0.5);
            self.w = Math.abs(_w) + 0.5;
        }
        else {
            self.w = _w + 0.5;
        }
    };

    self.corners = function(_r) {
        self.r = _r
    };
};

var Ellipse = function(_x, _y, _rx, _ry) {
    var self = this;

    self.x = _x + 0.5; self.y = _y + 0.5;
    self.rx = _rx; self.ry = _ry;

    self.resize = function(x, y) {
        self.rx = Math.abs(x - self.x);
        self.ry = Math.abs(y - self.y);
    };
};
