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
            var view = this.view = new PlaniranjeView();
            view.render();
        });

        afterEach(function () {
        });

        it('renderira koledar', function () {
            var $region = this.view.$('.planiranje-region-koledar');
            expect($region.length).to.equal(1);
        });

        it('renderira filter', function () {
            var $region = this.view.$('.planiranje-region-toolbar');
            expect($region.length).to.equal(1);
        });

        it('renderira sidebar', function () {
            var $region = this.view.$('.planiranje-region-dogodek');
            expect($region.length).to.equal(1);
        });

        it('proži prikazi:dogodek', function () {

        });
    });
});