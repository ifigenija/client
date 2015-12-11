define([
    'jquery',
    'app/koledar/View/IzbiraView',
    'app/koledar/View/izbiraUprizoritveView',
    'app/koledar/View/WizardView'
], function (
        $,
        IzbiraView,
        izbiraUprizoritveView,
        WizardView
        ) {

    describe("WizardView", function () {
        beforeEach(function () {
            this.NaprejSpy = sinon.spy(WizardView.prototype, 'onNaprej');
            this.NazajSpy = sinon.spy(WizardView.prototype, 'onNazaj');

            var izbiraView = this.izbiraView = new IzbiraView();
            var izbiraUprizoritveView = this.izbiraUprizoritveView = new izbiraUprizoritveView();
            var izbiraView3 = this.izbiraView3 = new IzbiraView();

            var wizard = this.wizardView = new WizardView({
                content: [
                    izbiraView,
                    izbiraUprizoritveView,
                    izbiraView3
                ],
                animate: true
            });

            wizard.open();
        });
        afterEach(function () {
            this.NaprejSpy.restore();
            this.NazajSpy.restore();
        });
        it('on naprej', function () {
            this.izbiraView.trigger('naprej');

            expect(this.wizardView.stevecView).to.equal(1);
            expect(this.NaprejSpy).to.have.been.called;

        });

        it('on nazaj', function () {
            this.izbiraView.trigger('naprej');
            expect(this.wizardView.stevecView).to.equal(1);
            this.izbiraView.trigger('nazaj');

            expect(this.wizardView.stevecView).to.equal(0);
            expect(this.NazajSpy).to.have.been.called;

        });

        it('pravilno delovanje btn ok in btn cancel', function () {
            //imamo dva itema
            this.izbiraView.trigger('naprej');
            var wizardView = this.wizardView;

            var $ok = wizardView.$('.ok.hidden');
            var $cancel = wizardView.$('.cancel.hidden');

            expect($ok.length).to.equal(1);
            expect($cancel.length).to.equal(1);

            this.izbiraView.trigger('naprej');

            var $ok = wizardView.$('.ok.hidden');
            var $cancel = wizardView.$('.cancel.hidden');

            expect($ok.length).to.equal(0);
            expect($cancel.length).to.equal(0);
        });

        it('pravilno skrivanje nazaj', function () {
            //prvi view mora imeti skrit nazaj
            var $nazaj = this.izbraniView.$('.nazaj.hidden');
            //prvi view mora imeti skrit nazaj
            expect($nazaj.length).to.equal(1);
            
            //prvi view priži naprej
            this.izbiraView.trigger('naprej');

            var $nazaj2 = this.izbraniView2.$('.nazaj.hidden');
            //drugiview gumb nazaj mora biti viden
            expect($nazaj2.length).to.equal(0);

            //drugi view proži nazaj
            this.izbiraView2.trigger('nazaj');

            //prvi view mora imeti skrit nazaj
            var $nazaj = this.izbraniView.$('.nazaj.hidden');
            //prvi view mora imeti skrit nazaj
            expect($nazaj.length).to.equal(1);
        });
    });
});