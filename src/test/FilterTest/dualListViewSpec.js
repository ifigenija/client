/* 
 * Licenca GPLv3
 * 
 * testi:
 *      vstavi select collection
 *      pridobi selected collection
 */

define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'underscore',
    'marionette',
    'text!./fixtures/polniCollection.json',
    'app/filter/View/DualListView'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        collFixture,
        DualListView
        ) {

    describe("DualListView", function () {

        beforeEach(function () {
            var fixture = JSON.parse(collFixture);
            var models = fixture.data;

            var coll = this.coll = new Backbone.Collection();
            coll.add(models);

            var view = this.view = new DualListView({
                collIzbira: coll,
                collIzbrani: new Backbone.Collection()
            });

            view.render();
        });
        
        afterEach(function () {
            this.view = null;
            this.coll = null;
        });

        it('inicializacija View-a', function () {
            expect(this.view.collIzbira).to.equal(this.coll);
        });

        //izberemo vse elemente iz levega seznama
        it('izberi vse elemente', function (done) {
            var collIzbrani = this.view.collIzbrani;

            collIzbrani.on('add', function () {
                expect(collIzbrani.length).to.not.equal(0);
                done();
            });

            this.view.triggerMethod('vseDesno');
        });

        // izberemo samo označene elemente iz levega seznama
        it('izberi označene elemente', function (done) {
            var collIzbrani = this.view.collIzbrani;

            collIzbrani.on('add', function () {
                expect(collIzbrani.length).to.not.equal(0);
                done();
            });

            this.view.triggerMethod('izbraneDesno');
        });

        //odstranimo označene elemente iz desnega seznama
        it('odstrani označene elemente', function (done) {
            var collIzbrani = this.view.collIzbrani;

            collIzbrani.on('remove', function () {
                expect(collIzbrani.length).to.equal(0);
                done();
            });

            this.view.triggerMethod('premakniIzbraneLevo');
        });

        //odstranimo vse elemente iz desnega seznama
        it('odstrani vse elemente', function (done) {
            var collIzbrani = this.view.collIzbrani;

            collIzbrani.on('remove', function () {
                expect(collIzbrani.length).to.equal(0);
                done();
            });

            this.view.triggerMethod('premakniVseLevo');
        });
        
        //v collection shrani ali je označen
        //izbiraš še vedno lahko več
    });
});