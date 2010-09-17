var Path = function(_x,_y) {
    var self = this,
        nodes = [];

    self.addNode = function(x,y) {
        if (x === undefined)
            x = nodes.slice(-1)[0][0];
        else
            x += 0.5;

        if (y === undefined)
            y = nodes.slice(-1)[0][1];
        else
            y += 0.5;

        nodes.push([x,y]);
    };

    /* TODO: this can be made even more efficient by changing it only when we
     * need to. */
    self.svgString = function() {
        var str;

        for (var i in nodes) {
            var node = nodes[i];

            if (str === undefined) {
                str = "M " + node[0] + " " + node[1] + " L";
            }
            else {
                str += " " + node[0] + " " + node[1];
            }
        }

        return str;
    };

    self.moveNode = function(i,x,y) {
        if (Math.abs(i) >= nodes.length)
            return;

        if (i < 0) {
            i = nodes.length + i;
        }

        nodes[i] = [x + 0.5, y + 0.5];
    };

    self.addNode(_x,_y); 
    self.addNode(_x,_y);
};
