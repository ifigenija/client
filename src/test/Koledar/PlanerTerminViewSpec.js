define([
    'jquery',
    'backbone',
    'moment',
    'app/koledar/View/PlanerTerminView'
], function (
        $,
        Backbone,
        moment,
        PlanerTerminView
        ) {

    describe("Planer termin view", function () {
        beforeEach(function () {
            this.nazajMSpy = sinon.spy(PlanerTerminView.prototype, 'nazajMesec');
            this.nazajTSpy = sinon.spy(PlanerTerminView.prototype, 'nazajTeden');
            this.naprejTSpy = sinon.spy(PlanerTerminView.prototype, 'naprejTeden');
            this.naprejMSpy = sinon.spy(PlanerTerminView.prototype, 'naprejMesec');

            this.view = new PlanerTerminView({
                model: new Backbone.Model({
                    datum: moment().toISOString()
                })
            });

            this.view.render();
        });
        afterEach(function () {
            PlanerTerminView.prototype.nazajMesec.restore();
            PlanerTerminView.prototype.nazajTeden.restore();
            PlanerTerminView.prototype.naprejTeden.restore();
            PlanerTerminView.prototype.naprejMesec.restore();
        });

        it('elementi v DOM', function () {
            var view = this.view;

            var $nazajM = view.$('.naprej-mesec');
            var $nazajT = view.$('.nazaj-teden');
            var $naprejT = view.$('.naprej-teden');
            var $naprejM = view.$('.nazaj-mesec');
            var $vnos = view.$('[data-editors="teden"]');

            expect($nazajM.length).to.equal(1);
            expect($nazajT.length).to.equal(1);
            expect($naprejT.length).to.equal(1);
            expect($naprejM.length).to.equal(1);
            expect($vnos.length).to.equal(1);
        });

        it('kliki na gumbe', function () {
            var view = this.view;
            
            var $nazajM = view.$('.naprej-mesec');
            var $nazajT = view.$('.nazaj-teden');
            var $naprejT = view.$('.naprej-teden');
            var $naprejM = view.$('.nazaj-mesec');

            $nazajM.click();
            $nazajT.click();
            $naprejT.click();
            $naprejM.click();

            expect(this.nazajMSpy).to.have.been.called;
            expect(this.nazajTSpy).to.have.been.called;
            expect(this.naprejTSpy).to.have.been.called;
            expect(this.naprejMSpy).to.have.been.called;
        });
    });
});