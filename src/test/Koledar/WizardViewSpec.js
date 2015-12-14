define([
    'jquery',
    'app/koledar/View/IzbiraView',
    'app/koledar/View/IzbiraUprizoritveView',
    'app/koledar/View/WizardView'
], function (
        $,
        IzbiraView,
        IzbiraUprizoritveView,
        WizardView
        ) {

    describe("WizardView", function () {
        beforeEach(function () {
            this.NaprejSpy = sinon.spy(WizardView.prototype, 'onNaprej');
            this.NazajSpy = sinon.spy(WizardView.prototype, 'onNazaj');

            var izbiraView = this.izbiraView = new IzbiraView();
            var izbiraUprizoritveView = this.izbiraUprizoritveView = new IzbiraUprizoritveView();
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

        it('gumbi v DOM', function () {
            var $ok = this.wizardView.$('.ok');
            var $cancel = this.wizardView.$('.cancel');
            var $naprej = this.wizardView.$('.naprej');
            var $nazaj = this.wizardView.$('.nazaj');

            expect($ok.length).to.equal(1);
            expect($cancel.length).to.equal(1);
            expect($naprej.length).to.equal(1);
            expect($nazaj.length).to.equal(1);
        });

        it('on ready', function () {
            this.izbiraView.trigger('ready');
            var $ok = this.wizardView.$('.ok.hidden');
            expect($ok.length).to.equal(0);
        });
        it('on not:ready', function () {
            this.izbiraView.trigger('ready');
            var $ok = this.wizardView.$('.ok.hidden');
            expect($ok.length).to.equal(0);
            
            this.izbiraView.trigger('not:ready');
            var $ok = this.wizardView.$('.ok.hidden');
            expect($ok.length).to.equal(1);
        });
        it('on naprej', function () {
            this.wizardView.trigger('naprej');

            expect(this.wizardView.stevecView).to.equal(1);
            expect(this.NaprejSpy).to.have.been.called;

        });

        it('on nazaj', function () {
            this.wizardView.trigger('naprej');
            expect(this.wizardView.stevecView).to.equal(1);
            this.wizardView.trigger('nazaj');

            expect(this.wizardView.stevecView).to.equal(0);
            expect(this.NazajSpy).to.have.been.called;

        });

        it('pravilno skrivanje btn ok', function () {
            var wizardView = this.wizardView;

            this.wizardView.trigger('naprej');
            var $ok = wizardView.$('.ok.hidden');
            expect($ok.length).to.equal(1);

            this.wizardView.trigger('naprej');
            var $ok = wizardView.$('.ok.hidden');
            expect($ok.length).to.equal(0);
        });
        /**
         * Prikaz gumbov pri prvem izrisanem viewju
         * preklici: true
         * nazaj: false
         * naprej: true
         * potrdi/ok: false
         * @returns {undefined}
         */
        it('Prikaz gumbov pri prvem view', function () {
            var wizardView = this.wizardView;
            
            var $nazaj = wizardView.$('.nazaj.hidden');
            var $naprej = wizardView.$('.naprej.hidden');
            expect($nazaj.length).to.equal(1);
            expect($naprej.length).to.equal(0);
        });
        
        /**
         * Prikaz gumbov pri zadnjem izrisanem viewju
         * preklici: true
         * nazaj: true
         * naprej: false
         * potrdi/ok: true
         * @returns {undefined}
         */
        it('prikaz gumbov pri zadnjem viewju', function () {
            var wizardView = this.wizardView;
            
            this.wizardView.trigger('naprej');
            this.wizardView.trigger('naprej');
            
            var $nazaj = wizardView.$('.nazaj.hidden');
            var $naprej = wizardView.$('.naprej.hidden');
            expect($nazaj.length).to.equal(0);
            expect($naprej.length).to.equal(1);
        });
    });
});