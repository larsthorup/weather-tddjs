function render(context, data) {
    $('<p></p>').appendTo(context).text(data.text);
}

function fetch(query) {
    if(false) {
        return {
            then: function (callback) {
                callback({text: 'sunny'});
            }
        };
    }
    return $.ajax({
        url: '/weather',
        data: {query: query},
        dataType: 'json'
    });
}

function listen(context) {
    context.find('#city').on('change', function () {
        var city = $(this);
        fetch(city.val()).then(function (data) {
            render(context, data);
        })
    })
}