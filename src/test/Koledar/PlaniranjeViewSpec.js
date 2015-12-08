/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'jquery',
    'text!./fixtures/terminiStoritve.json',
    'app/koledar/View/PlaniranjeView'
], function (
        Backbone,
        $,
        collFixture,
        KoledarView
        ) {

    describe("Planiranje View", function () {
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
        
        it('renderira koledar', function () {
        });
        
        it('renderira toolbar', function () {
        });
        
        it('renderira dogodek', function () {
        });
        
        it('proži in posluša triggerje', function () {
        });
        
        it('posluša Koledar klikPrazno', function () {
        });
    });
});