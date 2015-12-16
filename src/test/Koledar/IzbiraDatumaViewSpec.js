define([
    'jquery',
    'app/koledar/View/IzbiraDatumView',
    'moment',
    'backbone'
], function (
        $,
        IzbiraDatumView,
        moment,
        Backbone
        ) {

    describe("IzbiraDatumView", function () {
        beforeEach(function () {
            this.nadaljujSpy = sinon.spy(IzbiraDatumView.prototype, 'nadaljuj');
            var model = new Backbone.Model();

            this.view = new IzbiraDatumView();
            this.view.render({
                wizardModel: model
            });
        });
        afterEach(function () {
            this.nadaljujSpy.restore();
        });

        it('renderira vnosna polja', function () {
            var $zacetek = this.view.$('.field-zacetek');
            expect($zacetek.length).to.equal(1);

            var $konec = this.view.$('.field-konec');
            expect($zacetek.length).to.equal(1);
        });

        it('proži ready', function () {
            //vpis v vnosno polje
            var spy = sinon.spy();
            this.view.on('ready', spy);

            this.view.fields.zacetek.editor.setValue(moment());
            this.view.fields.konec.editor.setValue(moment());

            this.view.trigger('change');

            expect(spy).to.have.been.called;
        });

        it('proži not:ready', function () {
            //vpis v vnosno polje
            var spy = sinon.spy();
            this.view.on('not:ready', spy);

            this.view.fields.zacetek.editor.setValue(moment());
            
            this.view.trigger('change');

            expect(spy).to.have.been.called;
        });
    });
});