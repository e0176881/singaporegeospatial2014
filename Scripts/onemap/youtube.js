 function getSearchValue() {
            $.ajax({
                type: "POST",
                url: "Default.aspx/getSearchVal",
                data: '{searchvar: "' + document.getElementById('searchyoutube').value + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess11111,
                failure: function (response) {

                }
            });
        }
        function OnSuccess11111(response) {
            alert(response.d);
        }


      function WatchYoutube(youtubeurl){
          $('.modal-headerz').html('<div> </div>');
          youtubeurl = youtubeurl.replace("&feature=youtube_gdata_player", "");
$('#youtubebody').html("<div class='wtfzzzz' id='ccbcccb'><iframe width='780' height='500' src='" + "http://www.youtube.com/embed/" + youtubeurl + "?autoplay=1' frameborder='0' allowfullscreen></iframe></div>");
$('#youtube').modal('show');

}







