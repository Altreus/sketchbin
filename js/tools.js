$(function() {
    $('#line').click(function(e) {
        drawCanvas.mode('line');
    });
    $('#shape').click(function(e) {
        drawCanvas.mode('rect');
    });
});
