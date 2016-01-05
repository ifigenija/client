/* 
 * Licenca GPLv3
 * 
 * testi:
 *      vstavi select collection
 *      pridobi selected collection
 */

define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'underscore',
    'marionette',
    'text!../fixtures/polniCollection.json',
    'app/filter/View/DualListView',
    'backgrid',
    'jquery'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        collFixture,
        DualListView,
        Backgrid,
        $
        ) {

    describe("AktivnaVrstaView", function () {
        
        before(function () {
            var ajax = $.ajax({
                dataType: 'html',
                url: 'http://localhost:8889/',
                headers: {
                    'Authorization': "Basic " + btoa('admin@ifigenija.si' + ":" + 'Admin1234')
                }
            });
        });

        beforeEach(function () {
        });

        afterEach(function () {
        });

        it('inicializacija View-a', function () {
        });

        //odstranimo aktivno vrsto filtra
        it('odstrani aktivno vrsto', function () {
        });

        //uredimo aktivno vrsto filtra
        it('uredi aktivno vrsto', function () {
        });
    });
});