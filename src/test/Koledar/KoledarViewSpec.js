/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'jquery',
    'app/koledar/View/KoledarView'
], function (
        Backbone,
        $,
        KoledarView
        ) {

    describe("Koledar View", function () {
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
            var view = this.view = new KoledarView();
            view.render();
        });

        afterEach(function () {
        });

        it('renderira koledar', function () {
            var $region = this.view.$('.koledar-container');
            expect($region.length).to.equal(1);
        });

        it('renderira filter', function () {
            var $region = this.view.$('.koledar-region-filter');
            expect($region.length).to.equal(1);
        });

        it('renderira sidebar', function () {
            var $region = this.view.$('.koledar-region-sidebar');
            expect($region.length).to.equal(1);
        });

        it('proži prikazi:dogodek ob kliku na prazno', function () {

        });
        
        it('proži prikazi:dogodek ob kliku na dogodek', function () {

        });
    });
});