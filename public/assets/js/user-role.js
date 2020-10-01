$(document).ready(function() {
    $("button").click(function(){
        $.each($("input[name='value']:checked"), function(){
            $("#userAssignRole").val($(this).val);
        });
    });
});