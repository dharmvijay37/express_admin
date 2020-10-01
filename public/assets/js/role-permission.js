$(document).ready(function() {
    $("button").click(function(){
        $.each($("input[name='value']:checked"), function(){
            $("#roleAssignPermission").val($(this).val);
        });
    });
});