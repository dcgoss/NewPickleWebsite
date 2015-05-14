$(document).ready(function() {   
    $('#signup-form').submit(function(event) {
        event.preventDefault();
        $('#signup-button').val('Signing up...')
        postToGoogleForm();
        return false;
    });
});

function addSuccessMessageToSignUpForm(signupNumber) {
    $('.alert').remove();
    
    var alert = $(" <div title='Success Message' style='text-align:center; width:300px; position:relative; left:50%; margin-left:-150px; font-family:Source Sans Pro; font-weight:bolder;' class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><span style='color:#333;'>Success! Sign up #" + signupNumber + ".</span></div> ").hide();
    
    alert.on('close.bs.alert', function() {
        alert.hide('fast', function() {
            $(this).remove();
        })
        return false;
    });
    
    $('.well').append(alert);
    alert.show('fast');
};
function addFailureMessageToSignUpForm(errorMessage) {
    $('.alert').remove();
    
    var alert = $(" <div title='Failure Message' style='text-align:center; width:300px; position:relative; left:50%; margin-left:-150px; font-family:Source Sans Pro; font-weight:bolder;' class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><span style='color:#333;'>Sign up failed. Please try again. Error: " + errorMessage + "</span></div> ").hide();
    
    alert.on('close.bs.alert', function() {
        alert.hide('fast', function() {
            $(this).remove();
        })
        return false;
    });
    
    $('.well').append(alert);
    alert.show('fast');
};

function postToGoogleForm() {
    $('#signup-button').prop('disabled', true);
    
    var firstname = $('#First-Name').val();
    var lastname = $('#Last-Name').val();
    var email = $('#Email').val();
    var formSubmissionRequest = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbx5_7FzY0uPyaNOMsJjGy3mzXtrcPOI7tfxTk_z5XkO80nWvr8/exec",
        data: {"First Name" : firstname, "Last Name" : lastname, "Email": email},
        type: "POST",
        dataType: "json", 
    });
    formSubmissionRequest.done(function(data, textStatus, jqXHR) {
            if (data["result"] === "success"){
                $('#First-Name').val("");
                $('#Last-Name').val("");
                $('#Email').val("");
                addSuccessMessageToSignUpForm(data["row"]); 
            } else{
                addFailureMessageToSignUpForm(JSON.stringify(data["error"])); 
                $('#signup-button').prop('disabled', false);
            };
            $('#signup-button').prop('disabled', false);
            $('#signup-button').val('Sign Up');
    });
    formSubmissionRequest.fail(function(jqXHR, textStatus, errorThrown) {
        addFailureMessageToSignUpForm(errorThrown); 
        $('#signup-button').prop('disabled', false);
        $('#signup-button').val('Sign Up');
    });
//    formSubmissionRequest.always(function(jqXHR, textStatus, errorThrown) {
//        alert(textStatus);
//        alert(jqXHR.resoponseText);
//        alert(String(errorThrown));
//        switch(jqXHR.status) {
//            case 200:
//            case 0:
//                
//                break;
//            default:
//                
//                break;
//        }
//    });
};