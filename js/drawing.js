var Canvas = (function(element,_h,_w){
    var self = this,
        mousePos = {},
        // There is a handler for each of the paper, any object, and
        // the object currently being edited.
        handlers = {
            paper: {
                click: function(e){},
                dblclick: function(e){},
                mousemove: function(e){}
            },
            obj: {
                click: function(e){},
                dblclick: function(e){},
                mousemove: function(e){}
            }
        },
        defaultFns = {
            paper: {
                click: function(e){},
                dblclick: function(e){},
                mousemove: function(e){}
            },
            obj: {
                click: function(e){},
                dblclick: function(e){},
                mousemove: function(e){}
            }
        },
        paper,
        clickZone;
        
        paper = Raphael(element,_h,_w);
        clickZone = paper.rect(0,0,_h,_w)
                          .attr({
                               fill: "rgb(255,255,255)"
                          });

    clickZone.click(function(e) {
        handlers.paper.click(e);
    });
    clickZone.dblclick(function(e) {
        handlers.paper.dblclick(e);
    });
    clickZone.mousemove(function(e){
        handlers.paper.mousemove(e);
    });

    var resetDefaultPaperFns = function() {
        handlers.paper.click = defaultFns.paper.click;
        handlers.paper.dblclick = defaultFns.paper.dblclick;
        handlers.paper.mousemove = defaultFns.paper.mousemove;
    };
    var resetDefaultObjFns = function() {
        handlers.obj.click = defaultFns.obj.click;
        handlers.obj.dblclick = defaultFns.obj.dblclick;
        handlers.obj.mousemove = defaultFns.obj.mousemove;
    };
    self.mode = function(mode) {
        switch (mode) {
            case 'line':
                handlers.paper.click =
                handlers.obj.click = function(e) {
                    self.beginLine(e.offsetX, e.offsetY);
                };
                break;
            case 'rect':
                handlers.paper.click =
                handlers.obj.click = function(e) {
                    self.beginRect(e.offsetX, e.offsetY,0,0);
                };
                break;
            case 'ellipse':
                handlers.paper.click =
                handlers.obj.click = function(e) {
                    self.beginEllipse(e.offsetX, e.offsetY,0,0);
                };
                break;
        }
    };

    self.beginLine = function(x,y) {
        var p = new Path(x,y);
        var l = paper.path(p.svgString());
        l.attr({ 
            stroke: $('#stroke-colour').val(), 
            "stroke-width": $('#stroke-width').val(),
            "stroke-linecap": $('#line-caps').val()
        });
 
        // set it up so that clicking this line calls the handler on the Path
        l.click(function(e) { p.click(e); });
        l.dblclick(function(e){ p.dblclick(e) });
        l.mousemove(function(e){ p.mousemove(e) });

        // If we click the line by accident it should act as though we'd clicked
        // the canvas, which is easy if we don't worry about mouse location.
        p.click =
        handlers.obj.click = 
        handlers.paper.click = function(e) {
            p.addNode();
            l.attr({ path: p.svgString() });
        };

        p.dblclick = 
        handlers.obj.dblclick =
        handlers.paper.dblclick = function(e) {
            resetDefaultObjFns();
            resetDefaultPaperFns();

            self.mode('line');
            // Set it up so that when the line is committed, we can change the
            // click handler for all objects at the same time, since I envisage
            // no situation where clicking will depend on what object it was.
            p.click = function(e) {
                handlers.obj.click(e);
            }
            p.dblclick = function(e) {
                handlers.obj.dblclick(e);
            }
            p.mousemove = function(e) {
                handlers.obj.mousemove(e);
            }
        };

        p.mousemove =
        handlers.obj.mousemove =
        handlers.paper.mousemove = function(e) {
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
        handlers.obj.click =
        handlers.paper.click = function(e) {
            R.click = function(){};
            R.mousemove = function(){};

            resetDefaultObjFns();
            resetDefaultPaperFns();

            self.mode('rect'); 
        };

        R.mousemove =
        handlers.obj.mousemove =
        handlers.paper.mousemove = function(e) {
            R.resize(e.offsetY - R.y, e.offsetX - R.x);
            var y = R.y, x = R.x;

            if (R.h < 0)
                y += R.h;

            if (R.w < 0)
                x += R.w;

            r.attr({ 
                x: x + 0.5, 
                y: y + 0.5, 
                height: Math.abs(R.h),
                width: Math.abs(R.w)
            });
        };
    };

    self.beginEllipse = function(x,y,r1,r2) {
        var E = new Ellipse(x,y,r1,r2);
        var el = paper.ellipse(x,y,r1,r2);
        el.attr({  stroke: "rgb(0,0,0)", "stroke-width": 1 });

        el.click( function(e) { E.click(e); } );
        el.mousemove( function(e) { E.mousemove(e); } );

        E.click =
        handlers.obj.click =
        handlers.paper.click = function(e) {
            E.click = function(){};
            E.mousemove = function(){};

            resetDefaultObjFns();
            resetDefaultPaperFns();

            self.mode('ellipse'); 
        };

        E.mousemove =
        handlers.obj.mousemove =
        handlers.paper.mousemove = function(e) {
            E.resize(e.offsetX, e.offsetY);
            el.attr({ 
                x: E.x, 
                y: E.y, 
                rx: E.rx,
                ry: E.ry 
            });
        };
    };
});

var drawCanvas;

$(function() {
    drawCanvas = new Canvas(document.getElementById('sketchpad'), 320, 240);
});


