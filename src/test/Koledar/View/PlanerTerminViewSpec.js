define([
    'jquery',
    'backbone',
    'moment',
    'app/koledar/View/PlanerIzbiraDatumaView'
], function (
        $,
        Backbone,
        moment,
        PlanerIzbiraDatumaView
        ) {

    describe("Planer termin view", function () {
        beforeEach(function () {
            this.nazajMSpy = sinon.spy(PlanerIzbiraDatumaView.prototype, 'nazajMesec');
            this.nazajTSpy = sinon.spy(PlanerIzbiraDatumaView.prototype, 'nazajTeden');
            this.naprejTSpy = sinon.spy(PlanerIzbiraDatumaView.prototype, 'naprejTeden');
            this.naprejMSpy = sinon.spy(PlanerIzbiraDatumaView.prototype, 'naprejMesec');

            this.view = new PlanerIzbiraDatumaView({
                model: new Backbone.Model({
                    datum: moment().toISOString()
                })
            });

            this.view.render();
        });
        afterEach(function () {
            PlanerIzbiraDatumaView.prototype.nazajMesec.restore();
            PlanerIzbiraDatumaView.prototype.nazajTeden.restore();
            PlanerIzbiraDatumaView.prototype.naprejTeden.restore();
            PlanerIzbiraDatumaView.prototype.naprejMesec.restore();
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