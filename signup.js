$(document).ready(function() {   
    $('#signup-form').submit(function(event) {
            event.preventDefault();
            postToGoogleForm();
            return false;
    });
});

function postToGoogleForm() {
    var firstname = $('#First-Name').val();
    var lastname = $('#Last-Name').val();
    var email = $('#Email').val();
    if ((firstname !== "") && (lastname !== "") && ((email !== ""))){
        $.ajax({
            url: "https://docs.google.com/forms/d/1kUZXl8QaW2qFYNbjfs3gr7OLlkqk4IgT0Z5crABL8Fg/formResponse",
            data: {"entry.1126922455" : firstname, "entry.352906697" : lastname, "entry.1425258291": email},
            type: "POST",
            dataType: "json",
            statusCode: {
                0: function (){
                    $('#First-Name').val("");
                    $('#Last-Name').val("");
                    $('#Email').val("");
                    //Success message

                },
                200: function (){
                    $('#First-Name').val("");
                    $('#Last-Name').val("");
                    $('#Email').val("");
                }
            }    
        });
    } else {
        //Error message
        alert("error");
    };
};