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
    'app/filter/View/ToggleListView',
    'backgrid',
    'jquery',
    'app/Max/View/Toolbar'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        collFixture,
        ToggleListView,
        Backgrid,
        $,
        Toolbar
        ) {

    describe("ToggleListView", function () {

        beforeEach(function () {
            var fixture = JSON.parse(collFixture);
            var models = fixture.data;

            var coll = this.coll = new Backbone.Collection();
            coll.add(models);

            var view = this.view = new ToggleListView({
                mozni: coll,
                izbrani: new Backbone.Collection()
            });

            this.dolzina = this.coll.length;

            view.render();
        });

        afterEach(function () {
            this.view = null;
            this.coll = null;
        });

        it('inicializacija View-a', function () {
            expect(this.view.mozni.length).to.equal(this.dolzina);
        });

        //izberemo vse elemente iz levega seznama
        it('izberi vse elemente', function () {
            var izbrani = this.view.izbrani;

            this.view.triggerMethod('izberiVse');
            expect(izbrani.length).to.equal(this.dolzina);
        });
        
        //izberemo vse elemente iz levega seznama
        it('Prekliči izbor', function () {
            var izbrani = this.view.izbrani;

            this.view.triggerMethod('izberiVse');
            this.view.triggerMethod('izberiVse');
            
            expect(izbrani.length).to.equal(0);
        });
        
       //vrnemo celotni collection od izraniView
        it('get izbrane modele', function () {
            var izbrani = this.view.izbrani;
            var mozniView = this.view.mozniView;

            this.view.triggerMethod('izberiVse');
            expect(izbrani.length).to.equal(this.dolzina);

            //preverimo ali je vrnjen celi collection od izbraniView
            var spy = sinon.spy(mozniView, 'getSelectedModels');
            mozniView.triggerMethod('getSelectedModels');
            spy.returned(izbrani.models);
        });
    });
});