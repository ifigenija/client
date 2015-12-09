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
    'app/filter/View/DualListView',
    'backgrid',
    'jquery'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        collFixture,
        DualListView,
        Backgrid,
        $
        ) {

    describe("DualListView", function () {
        
        before(function () {
            var ajax = $.ajax({
                dataType: 'html',
                url: 'http://localhost:8889/',
                headers: {
                    'Authorization': "Basic " + btoa('admin@ifigenija.si' + ":" + 'Admin1234')
                }
            });
        });

        beforeEach(function () {
            var fixture = JSON.parse(collFixture);
            var models = fixture.data;

            var coll = this.coll = new Backbone.Collection();
            coll.add(models);

            var view = this.view = new DualListView({
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

            this.view.triggerMethod('vseDesno');
            expect(izbrani.length).to.equal(this.dolzina);
        });

        // izberemo samo označene elemente iz levega seznama
        it('izberi označene elemente', function () {
            var izbrani = this.view.izbrani;

            //simulacija klika na model v seznamu
            var self = this;
            var item = {
                $el: $('.test'),
                model: self.coll.models[0]
            };
            
            var mouseEvent = {
                shiftkey: false,
                ctrlKey: false
            };
            
            this.view.mozniView.triggerMethod('childviewSelect', item, mouseEvent);

            //izberemo označene modele
            this.view.triggerMethod('izbraneDesno');
            expect(izbrani.length).to.equal(1);
        });

        //odstranimo označene elemente iz desnega seznama
        it('odstrani označene elemente', function () {
            var izbrani = this.view.izbrani;

            //izberemo vse modele
            this.view.triggerMethod('vseDesno');
            expect(izbrani.length).to.equal(this.dolzina);

            //simulacija klika na model v seznamu
            var self = this;
            var item = {
                $el: $('.test'),
                model: self.coll.models[0]
            };

            var mouseEvent = {
                shiftkey: false,
                ctrlKey: false
            };

            this.view.izbraniView.triggerMethod('childviewSelect', item, mouseEvent);

            //odstranimo označen model
            this.view.triggerMethod('izbraneLevo');
            expect(izbrani.length).to.equal(this.dolzina - 1);
        });

        //odstranimo vse elemente iz desnega seznama
        it('odstrani vse elemente', function () {
            var izbrani = this.view.izbrani;

            //izberemo vse modele
            this.view.triggerMethod('vseDesno');
            expect(izbrani.length).to.equal(this.dolzina);

            //odstranimo vse modele
            this.view.triggerMethod('vseLevo');
            expect(izbrani.length).to.equal(0);
        });

        //vrnemo celotni collection od izraniView
        it('get izbrane modele', function () {
            var izbrani = this.view.izbrani;
            var izbraniView = this.view.izbraniView;

            this.view.triggerMethod('vseDesno');
            expect(izbrani.length).to.equal(this.dolzina);

            //preverimo ali je vrnjen celi collection od izbraniView
            var spy = sinon.spy(izbraniView, 'getAllModels');
            izbraniView.triggerMethod('getAllModels');
            spy.returned(izbrani.models);
        });

//        it('search collection', function () {
//            var izbrani = this.view.izbrani;
//            var filterView = this.view.filterView;
//
//            var stub = sinon.stub(filterView, "searchBox", function () {
//                return {
//                    val: function () {
//                        return 'ana';
//                    }
//                };
//            });
//            var spy = sinon.spy(filterView,'search');
//
//            filterView.trigger('submit');
//            
//            expect(spy.called).to.be.true;
//
//            //this.view.triggerMethod('vseDesno');
//            expect(izbrani.length).to.equal(2);
//
//        });
    });
});