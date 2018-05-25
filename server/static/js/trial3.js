function loadResults() {
    // var result = "";
    // for (var i = 0; i < 10; i++) {
    //     result += "<li>Result " + i + "</li>";
    // }
    //
    $.ajax({
        url: "/api/trial3/",
        type: "get",
        data: {},
        beforeSend: function(xhr) {
            $("#results").after($("<li class='loading'>Loading...</li>").fadeIn('slow')).data("loading", true);
        },
        success: function(data) {
            var $results = $("#results");
            $(".loading").fadeOut('fast', function() {
                $(this).remove();
            });
            var $data = $(data.data);
            $data.hide();
            $results.append($data);
            $data.fadeIn();
            $results.removeData("loading");
        }
    });
};

function initResults () {
    var result = "";
    for (var i = 0; i < 10; i++) {
        result += "<li>Result " + i + "</li>";
    }
    $("#results").after($("<li class='loading'>Loading...</li>").fadeIn('slow')).data("loading", true);
    var $results = $("#results");
    $(".loading").fadeOut('fast', function() {
        $(this).remove();
    });
    var $data = $(result);
    $data.hide();
    $results.append($data);
    $data.fadeIn();
    $results.removeData("loading");
}

$(function() {
    initResults();

    var $panel = $(".scrollpane");

    $panel.scroll(function() {
        var $this = $(this);
        var $results = $("#results");

        if (!$results.data("loading")) {

            if ($this.scrollTop() + $this.height() >= $results.height()) {
                loadResults();
            }
        }
    });
});