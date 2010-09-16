var Canvas = new (function(){
    var self = this;
    var mousePos = {};

    self.mode = function(mode) {
        self.clickZone.click(function(e) {
            self.beginLine(e.offsetX, e.offsetY);
        });
    };
    self.beginLine = function(x,y) {
        var l = self.paper.path("M" + x + " " + y + "L" + x + " " + y)
            .attr({ stroke: "rgb(0,0,0)", "stroke-width": 1 });

        self.clickZone.mousemove(function(e) {
            l.attr({ path: "M" + x + " " + y + "L" + e.offsetX + " " +
                e.offsetY });
        });
    };
})();

$(function() {
    Canvas.paper = Raphael(document.getElementById('sketchpad'), 320, 240);
    Canvas.clickZone = Canvas.paper.rect(0,0,320,240)
                                   .attr( {
                                        fill: "rgb(255,255,255)"
                                   });
});


