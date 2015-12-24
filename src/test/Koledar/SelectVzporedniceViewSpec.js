define([
    'jquery',
    'backbone',
    'app/koledar/View/SelectVzporedniceView',
    'text!../fixtures/vzporednice.json'
], function (
        $,
        Backbone,
        SelectVzporedniceView,
        vzporedniceFixture
        ) {

    describe("SelectVzporedniceView", function () {
        beforeEach(function () {
            var fixture = JSON.parse(vzporedniceFixture);
            var coll = new Backbone.Collection(fixture);

            this.view = new SelectVzporedniceView({
                collection: coll
            });

            this.view.render();
        });
        afterEach(function () {
        });

        it('renderira 5 oseb', function () {
            var $osebe = this.view.$('.vzporednice-oseba');

            expect($osebe.length).to.equal(5);
        });
        it('proži change', function () {
            var spy = sinon.spy();
            this.view.on('change', spy);
            var $osebe = this.view.$('.vzporednice-oseba');
            $osebe.first().click();

            expect(spy).to.have.been.called;
        });
    });
});