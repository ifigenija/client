define([
    'jquery',
    'backbone',
    'moment',
    'app/koledar/View/IzbiraRazredDogodkaView',
    'app/koledar/View/WizardView'
], function (
        $,
        Backbone,
        moment,
        IzbiraView,
        WizardView
        ) {

    describe("WizardView", function () {
        beforeEach(function () {
            this.NaprejSpy = sinon.spy(WizardView.prototype, 'onNaprej');
            this.NazajSpy = sinon.spy(WizardView.prototype, 'onNazaj');

            var model = new Backbone.Model();
            model.set('zacetek', moment().toISOString());
            model.set('konec', moment().toISOString());

            var wizard = this.wizardView = new WizardView({
                model: model,
                defView: {
                    views: [
                        IzbiraView,
                        IzbiraView,
                        IzbiraView
                    ],
                    title: 'dodaj dogodek'
                }
            });

            wizard.render();
        });
        afterEach(function () {
            WizardView.prototype.onNaprej.restore();
            WizardView.prototype.onNazaj.restore();
            this.wizardView.destroy();
        });

        it('gumbi v DOM', function () {
            var $potrdi = this.wizardView.$('.potrdi');
            var $preklici = this.wizardView.$('.preklici');
            var $naprej = this.wizardView.$('.naprej');
            var $nazaj = this.wizardView.$('.nazaj');

            expect($potrdi.length).to.equal(1);
            expect($preklici.length).to.equal(1);
            expect($naprej.length).to.equal(1);
            expect($nazaj.length).to.equal(1);
        });

        it('on ready', function () {
            this.wizardView.view.trigger('ready');
            var $potrdi = this.wizardView.$('.naprej.disabled');
            expect($potrdi.length).to.equal(0);
        });
        it('on not:ready', function () {
            this.wizardView.view.trigger('ready');
            var $naprej = this.wizardView.$('.naprej.disabled');
            expect($naprej.length).to.equal(0);

            this.wizardView.view.trigger('not:ready');
            $naprej = this.wizardView.$('.naprej.disabled');
            expect($naprej.length).to.equal(1);
        });
        it('on naprej', function () {
//            this.wizardView.trigger('naprej');
            var $naprej = this.wizardView.$('.naprej');
            $naprej.click();

            expect(this.wizardView.stevecView).to.equal(1);
            expect(this.NaprejSpy).to.have.been.called;

        });

        it('on nazaj', function () {
//            this.wizardView.trigger('naprej');
            var $naprej = this.wizardView.$('.naprej');
            $naprej.click();
            expect(this.wizardView.stevecView).to.equal(1);
//            this.wizardView.trigger('nazaj');
            var $nazaj = this.wizardView.$('.nazaj');
            $nazaj.click();

            expect(this.wizardView.stevecView).to.equal(0);
            expect(this.NazajSpy).to.have.been.called;

        });

        it('pravilno skrivanje btn potrdi', function () {
            var wizardView = this.wizardView;

//            this.wizardView.trigger('naprej');
            var $naprej = this.wizardView.$('.naprej');
            $naprej.click();
            var $potrdi = wizardView.$('.potrdi.hidden');
            expect($potrdi.length).to.equal(1);

//            this.wizardView.trigger('naprej');
            var $naprej = this.wizardView.$('.naprej');
            $naprej.click();
            var $potrdi = wizardView.$('.potrdi.hidden');
            expect($potrdi.length).to.equal(0);
        });
        /**
         * Prikaz gumbov pri prvem izrisanem viewju
         * preklici: true
         * nazaj: false
         * naprej: true
         * potrdi/potrdi: false
         * @returns {undefined}
         */
        it('Prikaz gumbov pri prvem view', function () {
            var wizardView = this.wizardView;

            var $nazaj = wizardView.$('.nazaj.hidden');
            var $naprej = wizardView.$('.naprej.hidden');
            var $preklici = wizardView.$('.preklici.hidden');
            var $potrdi = wizardView.$('.potrdi.hidden');

            expect($nazaj.length).to.equal(1);
            expect($naprej.length).to.equal(0);
            expect($preklici.length).to.equal(0);
            expect($potrdi.length).to.equal(1);
        });

        /**
         * Prikaz gumbov pri vmesnem viewju
         * preklici: true
         * nazaj: true
         * naprej: true
         * potrdi/potrdi: false
         * @returns {undefined}
         */
        it('Prikaz gumbov pri prvem view', function () {
            var wizardView = this.wizardView;
//            this.wizardView.trigger('naprej');
            var $naprej = this.wizardView.$('.naprej');
            $naprej.click();

            var $nazaj = wizardView.$('.nazaj.hidden');
            var $naprej = wizardView.$('.naprej.hidden');
            var $preklici = wizardView.$('.preklici.hidden');
            var $potrdi = wizardView.$('.potrdi.hidden');

            expect($nazaj.length).to.equal(0);
            expect($naprej.length).to.equal(0);
            expect($preklici.length).to.equal(0);
            expect($potrdi.length).to.equal(1);
        });

        /**
         * Prikaz gumbov pri zadnjem izrisanem viewju
         * preklici: true
         * nazaj: true
         * naprej: false
         * potrdi/potrdi: true
         * @returns {undefined}
         */
        it('prikaz gumbov pri zadnjem viewju', function () {
            var wizardView = this.wizardView;
//            this.wizardView.trigger('naprej');
//            this.wizardView.trigger('naprej');
            var $naprej = this.wizardView.$('.naprej');
            $naprej.click();
            $naprej.click();

            var $nazaj = wizardView.$('.nazaj.hidden');
            var $naprej = wizardView.$('.naprej.hidden');
            var $preklici = wizardView.$('.preklici.hidden');
            var $potrdi = wizardView.$('.potrdi.hidden');

            expect($nazaj.length).to.equal(0);
            expect($naprej.length).to.equal(1);
            expect($preklici.length).to.equal(0);
            expect($potrdi.length).to.equal(0);
        });
    });
});