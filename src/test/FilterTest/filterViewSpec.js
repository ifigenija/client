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
        
        it('get aktivne fitre', function () {
            //vhod array podatkov
            //
            //izhod collection vrste
            expect(false).to.equal(true);
        });

        it('dodaj novo aktivno vrsto filtra', function () {
            //vhod array podatkov
            //
            //izhod collection vrste
            expect(false).to.equal(true);
        });
        
        it('ponastavi aktivne vrste filtra', function () {
            //vhod array podatkov
            //
            //izhod collection vrste
            expect(false).to.equal(true);
        });
    });
});