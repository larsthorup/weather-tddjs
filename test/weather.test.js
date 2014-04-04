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
});