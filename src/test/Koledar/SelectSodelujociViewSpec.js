define([
    'jquery',
    'backbone',
    'app/koledar/View/SelectSodelujociView',
    'text!../fixtures/vzporedniceSodelujoci.json'
], function (
        $,
        Backbone,
        SelectSodelujociView,
        sodelujociFixture
        ) {

    describe("SelectSodelujociView", function () {
        beforeEach(function () {
            var fixture = JSON.parse(sodelujociFixture);
            var coll = new Backbone.Collection(fixture.data);

            this.view = new SelectSodelujociView({
                collection: coll
            });

            this.view.render();
        });
        afterEach(function () {
        });

        it('renderira 16 oseb', function () {
            var $osebe = this.view.$('.sodelujoci-oseba');

            expect($osebe.length).to.equal(16);
        });
        
        it('renderira 2 uprizoritvi', function () {
            var $osebe = this.view.$('.sodelujoci-uprizoritev');

            expect($osebe.length).to.equal(2);
        });
        
        it('proži change', function () {
            var spy = sinon.spy();
            this.view.on('change', spy);
            var $osebe = this.view.$('.sodelujoci-oseba');
            $osebe.first().click();

            expect(spy).to.have.been.called;
        });
    });
});