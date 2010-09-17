var Canvas = (function(element,_h,_w){
    var self = this,
        mousePos = {},
        handlers = {
            click: function(e){},
            mousemove: function(e){}
        },
        paper,
        clickZone;
        
        paper = Raphael(element,_h,_w);
        clickZone = paper.rect(0,0,_h,_w)
                          .attr({
                               fill: "rgb(255,255,255)"
                          });

    clickZone.click(function(e) {
        handlers.click(e);
    });
    clickZone.mousemove(function(e){
        handlers.mousemove(e);
    });

    self.mode = function(mode) {
        handlers.click = function(e) {
            self.beginLine(e.offsetX, e.offsetY);
        };
    };

    self.beginLine = function(x,y) {
        var p = new Path(x,y);
        var l = paper.path(p.svgString());
        l.attr({ stroke: "rgb(0,0,0)", "stroke-width": 1 });

        handlers.mousemove = function(e) {
            p.moveNode(-1, e.offsetX, e.offsetY);
            l.attr({ path: p.svgString() });
        };
        
        handlers.click = function(e) {
            p.addNode(e.offsetX, e.offsetY);
            l.attr({ path: p.svgString() });
        };
    };
});

var drawCanvas;

$(function() {
    drawCanvas = new Canvas(document.getElementById('sketchpad'), 320, 240);
});


