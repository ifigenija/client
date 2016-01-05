define([
    'jquery',
    'moment',
    'app/koledar/Model/Dogodki',
    'app/koledar/View/PlanerDogodkiView',
    'text!../fixtures/dogodki.json'
], function (
        $,
        moment,
        Dogodki,
        PlanerDogodkiView,
        dogodkiFixture
        ) {

    describe("PlanerDogodkiView", function () {
        beforeEach(function () {
            var fixture = JSON.parse(dogodkiFixture);
            var modeli = fixture.data;

            var collection = new Dogodki(modeli);

            this.view = new PlanerDogodkiView({
                collection: collection,
                zacetek: moment("2015-12-21").add(5, 'hour'),
                konec: moment("2015-12-21").subtract(10, 'hour')
            });

            this.view.render();
        });
        afterEach(function () {
            this.view.destroy();
        });
        it('proži dodaj:dogodek', function () {
            var $dodaj = this.view.$('.dodaj-dogodek');
            expect($dodaj.length).to.equal(1);

            var spy = sinon.spy();
            this.view.on('dodaj:dogodek', spy);
            $dodaj.click();

            expect(spy).to.have.been.called;
        });
        it('proži odstrani:dogodke', function () {
            var $odstrani = this.view.$('.odstrani-dogodke');
            expect($odstrani.length).to.equal(1);

            var spy = sinon.spy();
            this.view.on('odstrani:dogodke', spy);
            $odstrani.click();

            expect(spy).to.have.been.called;
        });
        it('proži prikazi:dogodek', function () {
            var spy = sinon.spy();
            this.view.on('prikazi:dogodek', spy);

            this.view.triggerMethod('childviewPrikaziDogodek');

            expect(spy).to.have.been.called;
        });
    });

    describe("PlanerDogodekItemView", function () {
        beforeEach(function () {
            var fixture = JSON.parse(dogodkiFixture);
            var modeli = fixture.data;
            var collection = new Dogodki(modeli);

            this.ItemView = PlanerDogodkiView.prototype.childView;
            this.view = new this.ItemView({
                model: collection.first()
            });

            this.view.render();
        });
        afterEach(function () {
            this.view.destroy();
        });
        it('proži prikazi:dogodek', function () {
            var spy = sinon.spy();
            this.view.on('prikazi:dogodek', spy);
            this.view.trigger('prikazi');

            setTimeout(function () {
                expect(spy).to.have.been.called;
            }, 1000);

        });
    });
});