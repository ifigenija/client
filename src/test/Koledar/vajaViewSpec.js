/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'jquery',
    'text!./fixtures/terminiStoritve.json',
    'app/koledar/View/VajaView'
], function (
        Backbone,
        $,
        collFixture,
        VajaView
        ) {

    describe("Vaja view", function () {
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
            var view = new VajaView();
            view.render();
        });
        afterEach(function () {
        });

        it('je renderirano', function () {
            var $title = $('.field-title');
            var $tipVaje = $('.field-tipvaje');
            var $prostor = $('[name~="prostor"]');
            var $zacetek = $('.field-zacetek');
            var $konec = $('.field-konectitle');

            expect($title).to.not.be.null;
            expect($tipVaje).to.not.be.null;
            expect($prostor).to.not.be.null;
            expect($zacetek).to.not.be.null;
            expect($konec).to.not.be.null;
        });

        it('Proženje eventov', function () {
        });
    });
});