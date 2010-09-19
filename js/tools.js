$(function() {
    $('#line').click(function(e) {
        showLineToolSettings();
        drawCanvas.mode('line');
    });
    $('#shape').click(function(e) {
        drawCanvas.mode('rect');
    });
});

function showLineToolSettings() {
    var div = $('#tool-settings');

    div.find('fieldset').appendTo($('#spare-tools-settings'));

    $('#inputs-stroke').appendTo(div);
}
