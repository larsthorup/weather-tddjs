describe('weather', function () {

    it('renders', function () {

        // given
        var context = $('<div></div>');
        var weatherData = { text: 'rain' };

        // when
        render(context, weatherData);

        // then
        expect(context.find('p').text()).toBe('rain');
    });

    it('fetches', function (done) {
        // given
        $.mockjax({
            logging: false,
            url: '/weather',
            data: {query: 'Denver'},
            responseText: {text: 'sun'},
            responseTime: 1
        });

        // when
        var fetching = fetch('Denver');

        // then
        fetching.then(function (data) {
            expect(data.text).toBe('sun');
            done();
        });
    });

    it('listens', function () {
        // given
        var context = $('<div><input type="text" id="city" /></div>');
        var city = context.find('#city');
        spyOn(window, 'fetch').and.returnValue({
            then: function(callback) {
                callback({text: 'foggy'});
            }
        });
        spyOn(window, 'render').and.returnValue();

        // when
        listen(context);
        city.val('San Francisco');
        city.trigger('change');

        // then
        expect(fetch).toHaveBeenCalledWith('San Francisco');
        expect(render).toHaveBeenCalledWith(context, { text: 'foggy' });
    });
});