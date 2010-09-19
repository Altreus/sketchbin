var Canvas = (function(element,_h,_w){
    var self = this,
        mousePos = {},
        handlers = {
            click: function(e){},
            dblclick: function(e){},
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
    clickZone.dblclick(function(e) {
        handlers.dblclick(e);
    });
    clickZone.mousemove(function(e){
        handlers.mousemove(e);
    });

    self.mode = function(mode) {
        switch (mode) {
            case 'line':
                handlers.click = function(e) {
                    self.beginLine(e.offsetX, e.offsetY);
                };
                break;
            case 'rect':
                handlers.click = function(e) {
                    self.beginRect(e.offsetX, e.offsetY,0,0);
                };
                break;
        }
    };

    self.beginLine = function(x,y) {
        var p = new Path(x,y);
        var l = paper.path(p.svgString());
        l.attr({ stroke: "rgb(0,0,0)", "stroke-width": 1 });

        // If we click the line by accident it should act as though we'd clicked
        // the canvas, which is easy if we don't worry about mouse location.
        p.click =
        handlers.click = function(e) {
            p.addNode();
            l.attr({ path: p.svgString() });
        };
 
        // set it up so that clicking this line calls the handler on the Path
        l.click(function(e) { p.click(e); });

        p.dblclick = 
        handlers.dblclick = function(e) {
            self.mode('line');
            handlers.mousemove = function(e){};
        };
        l.dblclick(function(e){ p.dblclick(e) });

        handlers.mousemove = function(e) {
            p.moveNode(-1, e.offsetX, e.offsetY);
            l.attr({ path: p.svgString() });
        };
    };

    self.beginRect = function(x,y,h,w) {
        var R = new Rect(x,y,h,w);
        var r = paper.rect(x,y,h,w);
        r.attr({  stroke: "rgb(0,0,0)", "stroke-width": 1 });

        r.click( function(e) { R.click(e); } );
        r.mousemove( function(e) { R.mousemove(e); } );

        R.click =
        handlers.click = function(e) {
            R.click = function(){};
            R.mousemove = function(){};

            self.mode('rect'); 
            handlers.mousemove = function(){};
        };

        R.mousemove =
        handlers.mousemove = function(e) {
            R.resize(e.offsetY - R.y, e.offsetX - R.x);
            r.attr({ 
                x: R.x, 
                y: R.y, 
                height: R.h, 
                width: R.w 
            });
        };
    };
});

var drawCanvas;

$(function() {
    drawCanvas = new Canvas(document.getElementById('sketchpad'), 320, 240);
});


