define([
    'jquery',
    'moment',
    'app/koledar/Model/Dogodki',
    'app/koledar/View/PlanerTedenView',
    'app/koledar/Model/PlanerTeden',
    'app/koledar/Model/RazredDogodek',
    'text!./fixtures/dogodki.json',
    'text!./fixtures/razredDogodka.json'
], function (
        $,
        moment,
        Dogodki,
        PlanerTedenView,
        PlanerTeden,
        RazredDogodek,
        dogodkiFixture,
        razredDogodkaFixture
        ) {

    describe("PlanerDanView", function () {
        beforeEach(function () {
            var fixture = JSON.parse(dogodkiFixture);
            var modeli = fixture.data;
            
            fixture = JSON.parse(razredDogodkaFixture);
            this.razredModel = new RazredDogodek(fixture);

            this.planerTeden = new PlanerTeden();
            this.planerTeden.initTeden(moment("2015-12-21"));

            var collection = new Dogodki(modeli);
            collection.pretvoriVPlanerTeden(this.planerTeden);

            this.DanView = PlanerTedenView.prototype.childView;

            this.prikaziSpy = sinon.spy(this.DanView.prototype, 'prikaziDogodek');
            this.dodajSpy = sinon.spy(this.DanView.prototype, 'dodajDogodek');

            this.view = new this.DanView({
                model: this.planerTeden.first()
            });

            this.view.render();
        });
        afterEach(function () {
            this.view.destroy();
            this.DanView.prototype.prikaziDogodek.restore();
            this.DanView.prototype.dodajDogodek.restore();
        });

        it('regije v DOM', function () {
            var $dopoldne = this.view.$('.region-dopoldne');
            var $popoldne = this.view.$('.region-popoldne');
            var $zvecer = this.view.$('.region-zvecer');
            var $detail = this.view.$('.region-detail');

            expect($dopoldne.length).to.equal(1);
            expect($popoldne.length).to.equal(1);
            expect($zvecer.length).to.equal(1);
            expect($detail.length).to.equal(1);
        });

        it('posluša dodaj:dogodek', function () {
            this.view.dopoldneView.trigger('dodaj:dogodek', {
                zacetek: moment(),
                konec: moment()
            });
            expect(this.dodajSpy).to.have.been.called;
        });
        
        it('posluša prikazi:dogodek', function () {
            this.view.dopoldneView.trigger('prikazi:dogodek', this.razredModel);
            expect(this.prikaziSpy).to.have.been.called;
        });
    });
});