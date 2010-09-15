var Canvas = new (function(){
    var self = this;
    this.mode = function(mode) {
        self.clickZone.click(function(e) {
            debugger;
        });
    };
    this.beginLine = function(x,y) {
            
    };
})();

$(function() {
    Canvas.paper = Raphael(document.getElementById('sketchpad'), 320, 240);
    Canvas.clickZone = Canvas.paper.rect(0,0,320,240)
                                   .attr( {
                                        fill: "rgb(255,255,255)"
                                   });
});


