/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/bars'
], function (
        Marionette,
        Handlebars
        ) {

    var DogodkiGostovanjaView = Marionette.ItemView.extend({
        template: Handlebars.compile('I AM HERE')
    });

    return DogodkiGostovanjaView;
});