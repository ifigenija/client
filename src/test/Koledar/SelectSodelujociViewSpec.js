define([
    'jquery',
    'backbone',
    'app/koledar/View/SelectSodelujociView',
    'text!./fixtures/funkcije.json'
], function (
        $,
        Backbone,
        SelectSodelujociView,
        funkcijeFixture
        ) {

    describe("SelectSodelujociView", function () {
        beforeEach(function () {
            var fixture = JSON.parse(funkcijeFixture);
            var funkcije = fixture.data;

            var coll = new Backbone.Collection(funkcije);

            this.view = new SelectSodelujociView({
                collection: coll
            });
        });
        afterEach(function () {
        });
//        it('proži change', function () {
//            var spy = sinon.spy();
//            this.view.on('selected:model', spy);
//            this.view.triggerMethod('childviewChange');
//
//            expect(spy).to.have.been.called();
//        });
    });
});