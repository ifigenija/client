/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'underscore',
    'marionette'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette
        ) {

    describe("Nalaganje fixura", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });
        it('should succed', function () {
            this.result = fixture.load('polniCollection.json');
            expect(result).to.equal('n');
        });
    });
});