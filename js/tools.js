$(function() {
    $('#line').click(function(e) {
        showLineToolSettings();
        drawCanvas.mode('line');
    });
});

function showLineToolSettings() {
    var div = $('#tool-settings');

    div.find('fieldset').appendTo($('#spare-tools-settings'));

    $('#inputs-stroke').appendTo(div);
}
