define([
    'jquery',
    'app/koledar/View/PlanerView'
], function (
        $,
        PlanerView
        ) {

    describe("PlanerView", function () {
        beforeEach(function () {
            this.tedenSpy = sinon.spy(PlanerView.prototype, 'naloziDogodke');
            this.view = new PlanerView();
            this.view.render();
        });
        afterEach(function () {
            PlanerView.prototype.naloziDogodke.restore();
        });
        it('regions in DOM', function () {
            var $termin = this.view.$('.region-termin');
            var $teden = this.view.$('.region-teden');

            expect($termin.length).to.equal(1);
            expect($teden.length).to.equal(1);
        });
        it('renderira IzbiraTerminaView', function () {
            var $region = this.view.$('.region-termin');
            expect($region.html()).to.not.be.empty;
        });
        it('ne renderira PlanerTedenView', function () {
            var $region = this.view.$('.region-teden');
            expect($region.html()).to.be.empty;
        });

        it('proži funkcijo naloziDogodke', function () {
            this.view.form.trigger('change');
            expect(this.tedenSpy).to.have.been.called;
        });
        
        //renderTednatest
    });
});