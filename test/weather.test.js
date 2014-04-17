describe('weather', function () {

    it('renders', function () {

        // given
        var context = $('<div></div>');
        var weatherData = { text: 'rain' };

        // when
        Weather.render(context, weatherData);

        // then
        expect(context.find('p').text()).toBe('rain');
    });

    it('fetches', function (done) {
        // given
        $.mockjax({
            logging: false,
            url: 'http://api.openweathermap.org/data/2.5/weather',
            data: {q: 'Denver'},
            responseText: {
                weather: [
                    {
                        description: 'sun'
                    }
                ]
            },
            responseTime: 1
        });

        // when
        var fetching = Weather.fetch('Denver');

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
        spyOn(Weather, 'fetch').and.returnValue({
            then: function(callback) {
                callback({text: 'foggy'});
            }
        });
        spyOn(Weather, 'render').and.returnValue();

        // when
        Weather.listen(context);
        city.val('San Francisco');
        city.trigger('change');

        // then
        expect(Weather.fetch).toHaveBeenCalledWith('San Francisco');
        expect(Weather.render).toHaveBeenCalledWith(context, { text: 'foggy' });
    });
});