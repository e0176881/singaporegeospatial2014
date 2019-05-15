

/*-----------------------------------------Main Search-----------------------------------------------*/

var resultsSearch;
var row;
var xVal;
var yVal;

function GetSearchData() {
    var basicSearch = new BasicSearch;
    var searchText = document.getElementById("tbSearch").value;
    basicSearch.searchVal = searchText;
    basicSearch.returnGeom = '1';

    basicSearch.GetSearchResults(displayData);
}
function GetEventLocation() {
    var basicSearch = new BasicSearch;
    var searchText = document.getElementById("tblocaleSearch").value;
    basicSearch.searchVal = searchText;
    basicSearch.returnGeom = '1';

    basicSearch.GetSearchResults(displayData22);
}

function displayData22(resultData) {
    resultsSearch = resultData.results;
    if (resultsSearch == 'No results') {
        //alert('No Results Found');
        return false
    }
    else {
        document.getElementById('dlSearchz').innerHTML = "";
        var htmlStr = "";
        for (var i = 0; i < resultsSearch.length; i++) {
            row = resultsSearch[i];
            htmlStr = htmlStr + "<option value='" + row.SEARCHVAL + "'>";
        }
        document.getElementById('dlSearchz').innerHTML += htmlStr;
    }

   
 

}

function displayData(resultData) {
    resultsSearch = resultData.results;
    if (resultsSearch == 'No results') {
        //alert('No Results Found');
        return false
    }
    else {
        document.getElementById('dlSearch').innerHTML = "";
        var htmlStr = "";
        for (var i = 0; i < resultsSearch.length; i++) {
            row = resultsSearch[i];
            htmlStr = htmlStr + "<option value='" + row.SEARCHVAL + "'>";
        }
        document.getElementById('dlSearch').innerHTML += htmlStr;
    }
}

function zoomToArea(control) {
    var test = document.getElementById('tbSearch').value;

    for (var i = 0; i < resultsSearch.length; i++) {

        if (resultsSearch[i].SEARCHVAL == document.getElementById('tbSearch').value) {
            xVal = resultsSearch[i].X;
            yVal = resultsSearch[i].Y;
            this.control(ZoomTo(+resultsSearch[i].X, +resultsSearch[i].Y));
        }
        else
        { }

    }
}

function ZoomTo(xVal, yVal) {
    OneMap.showLocation(xVal, yVal);
}



function insertEventDetails() {
    
    var dogx;
    var dogy;
    for (var i = 0; i < resultsSearch.length; i++) {

        if (resultsSearch[i].SEARCHVAL == document.getElementById('tblocaleSearch').value) {
            dogx = resultsSearch[i].X;
            dogy = resultsSearch[i].Y;
          
        }
        else
        { }
      
    }
  
    $.ajax({
   
        type: "POST",
        url: "Default.aspx/InsertEventDetailsz",
        data: '{eventname: "' + document.getElementById('eventname').value + '" , eventdescz: "' + document.getElementById('desc').value + '" , eventdate: "' + document.getElementById('eventdate').value + '" , eventplace: "' + document.getElementById('tblocaleSearch').value + '" , coordX: "' + dogx + '" , coordY: "' + dogy + '"}',
        contentType: "application/json; charset=utf-8", 
        dataType: "json",
        success: OnSuccessz,
        failure: function (response) {

        }
    });
}

function OnSuccessz(response) {
    // alert(response.d);
    var x = response.d;
    if (x == "true") {
        alert("Successfully submitted");
    }
    if (x == "fail") {
        alert("not logged in");
    }
    if (x == "noadmin") {
        alert("You are not authorised to post");
    }
    if (x == "fb") {
        alert("Facebook user not authorised");
    }
}