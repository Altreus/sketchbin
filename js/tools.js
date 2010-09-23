$(function() {
    $('#line').click(function(e) {
        showLineToolSettings();
        drawCanvas.mode('line');
    });
    $('#shape').click(function(e) {
        showShapeToolSettings();
        drawCanvas.mode('shape');
    });
});

function showLineToolSettings() {
    var div = $('#tool-settings');

    div.find('fieldset').appendTo($('#spare-tools-settings'));

    $('#inputs-stroke').appendTo(div);
}

function showShapeToolSettings() {
    var div = $('#tool-settings');

    div.find('fieldset').appendTo($('#spare-tools-settings'));

    $('#inputs-stroke').appendTo(div);
    $('#inputs-shape').appendTo(div);
}
