
function share(eventname, eventdescription) {

    $('.modal-header').html("<div> <h4></h4></div>");
    $('#databody').html("<form><div>Post to your facebook timeline:</br><input type='text' id='sharermsg' id='sharemsg' value='' /><br/><input type='button' name='Share' value='Share' onclick='graphStreamPublish(\"" + "" + "\", \"" + "localhost:2848/Foreigners@SG" + "\",\"" + "http://localhost:2848/Foreigners@SG/images/unity@sg.jpg" + "\", \"" + eventname + "\", \"" + eventdescription + "\");'/></div></form>"); 
$('#About').modal('show');
}
