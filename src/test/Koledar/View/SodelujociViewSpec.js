/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'jquery',
    'app/koledar/View/SodelujociView',
    'text!../../fixtures/uprizoritve.json'
], function (
        Backbone,
        $,
        SodelujociView,
        uprizoritveFixture
        ) {

    describe("Sodelujoči view", function () {
        before(function () {
            var ajax = $.ajax({
                dataType: 'html',
                url: 'http://localhost:8889/',
                headers: {
                    'Authorization': "Basic " + btoa('admin@ifigenija.si' + ":" + 'Admin1234')
                }
            });
            
            var fixture = JSON.parse(uprizoritveFixture);
            this.models = fixture.data;
        });
        
        beforeEach(function () {
            var model = this.models[0];
            
            this.urediSpy = sinon.spy(SodelujociView.prototype, 'renderUredi');
            var view = this.view = new SodelujociView({
                uprizoritev: model
            });
            view.render();
        });
        afterEach(function () {
            this.urediSpy.restore();
        });

        /**
         * ali se vse regije zapolnijo
         * @returns {undefined}
         */
        it('renderiran region umetniki', function () {
            var $region = this.view.$('.region-umetniki');
            expect($region.length).to.equal(1);
        });
        
        it('renderiran region tehniki', function () {
            var $region = this.view.$('.region-tehniki');
            expect($region.length).to.equal(1);
        });
        
        it('renderiran region gosti', function () {
            var $region = this.view.$('.region-gosti');
            expect($region.length).to.equal(1);
        });

        it('poslušanje renderUredi', function () {
            this.view.umetnikiView.trigger('render:uredi');
            
            expect(this.urediSpy).to.have.been.called;
        });
    });
});