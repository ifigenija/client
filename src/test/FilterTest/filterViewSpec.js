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
    'app/filter/View/FilterView',
    'app/filter/Model/VrstaCollection',
    'app/filter/Model/AktivnaVrstaCollection',
    'app/Max/Model/LookupModel'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        FilterView,
        Vrsta,
        AktivnaVrsta,
        LookupModel
        ) {

    describe("FilterView", function () {
        beforeEach(function () {
            this.collSelect = new LookupModel(null, {
                entity: 'oseba'
            });
            
            var self =this;
            
            this.filterView = new FilterView({
                vrsteFiltrov: [{
                        title: 'Izbira oseb',
                        vrsta: 'oseba',
                        icon: 'fa fa-user',
                        izbrani: new Backbone.Collection(),
                        mozni: self.collSelect
                    },
                    {
                        title: 'Izbira prostorov',
                        vrsta: 'prostor',
                        icon: 'fa fa-home',
                        izbrani: new Backbone.Collection(),
                        mozni: self.collSelect
                    }]
            });
        });

        afterEach(function () {
            this.filterView = null;
        });

        it('inicializacija', function () {
        });

        /**
         * Testiranje funkcije array to collection
         * @returns {undefined}
         */
        it('test arrayTCollection()', function () {
            var polje = [{
                    izbrani: new Backbone.Collection(),
                    vrsta: 'oseba'
                }, {
                    izbrani: new Backbone.Collection(),
                    vrsta: 'prostor'
                }];

            var coll = this.filterView._arrayToCollection(polje, AktivnaVrsta);

            expect(coll.length).to.equal(2);
            expect(coll.models[0].get('vrsta')).to.equal('oseba');
            expect(coll.models[1].get('vrsta')).to.equal('prostor');
        });

        it('test dolociVrsto()', function () {
            var polje = [{
                    izbrani: new Backbone.Collection(),
                    vrsta: 'oseba'
                }, {
                    izbrani: new Backbone.Collection(),
                    vrsta: 'prostor'
                }];

            var coll = this.filterView._arrayToCollection(polje, AktivnaVrsta);
            expect(coll.models[0].get('vrstaModel').get('vrsta')).to.equal('nedoloceno');
            expect(coll.models[1].get('vrstaModel').get('vrsta')).to.equal('nedoloceno');
            
            coll = this.filterView.dolociVrsto(coll);
            
            expect(coll.models[0].get('vrstaModel')).to.not.equal(new Vrsta());
            expect(coll.models[1].get('vrstaModel')).to.not.equal(new Vrsta());
        });

        it('pretvorba aktivnih vrst Filtra, s podano vsrsto filtra', function () {
            //vhod array
            //izhod collection vrste
        });

        it('pretvorba aktivnih vrst Filtra, brez podane vrste filtra', function () {
            //vhod array podatkov
            //
            //izhod collection vrste
        });

        it('get aktivni fiter', function () {
            //vhod array podatkov
            //
            //izhod collection vrste
        });

        it('get aktivni fitri', function () {
            //vhod array podatkov
            //
            //izhod collection vrste
        });
    });
});