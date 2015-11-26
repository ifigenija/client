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

            this.filterView = new FilterView({
                vrsteFiltrov: [{
                        title: 'Izbira oseb',
                        id: 'oseba',
                        icon: 'fa fa-user',
                        stIzpisov: 1,
                        mozni: [
                            {id: 1, ident: "1", "label": "lovro"},
                            {id: 2, ident: "2", "label": "simon"},
                            {id: 3, ident: "3", "label": "aleš"}
                        ]
                    },
                    {
                        title: 'Izbira prostorov',
                        id: 'prostor',
                        icon: 'fa fa-home',
                        mozni: [
                            {id: 1, ident: "1", "label": "lovro"},
                            {id: 2, ident: "2", "label": "simon"},
                            {id: 3, ident: "3", "label": "aleš"}
                        ]
                    }],
                aktivneVrste: {
                    'oseba': [
                        1,
                        2,
                        3
                    ],
                    'prostor': [
                        1
                    ]
                }
            });
        });

        afterEach(function () {
            this.filterView = null;
        });

        it('inicializacija', function () {
            expect(this.filterView.collection.length).to.equal(2);
        });

        it('dodaj novo aktivno vrsto filtra', function () {

            expect(this.filterView.collection.length).to.equal(2);

            var model = this.filterView.vrsteFiltrov.models[0];
            this.filterView.dodajAktivnoVrsto(model);

            expect(this.filterView.collection.length).to.equal(3);
        });

        it('ponastavi aktivne vrste filtra', function () {
            var fView = this.filterView;
            expect(fView.collection.length).to.equal(2);

            var model = fView.vrsteFiltrov.models[0];
            fView.dodajAktivnoVrsto(model);

            expect(fView.collection.length).to.equal(3);

            var spy = sinon.spy(fView, 'onPonastavi');
            fView.triggerMethod('ponastavi', model);

            expect(fView.collection.length).to.equal(2);
            expect(spy).called;
        });

        it('get aktivne fitre', function () {
            var fView = this.filterView;
            expect(fView.collection.length).to.equal(2);
            var spy = sinon.spy(fView, 'getVrednostiAktivnihFiltrov');
            var obj = fView.getVrednostiAktivnihFiltrov();
            expect(spy).called;
            var objtest = {
                'oseba': [
                    1,
                    2,
                    3
                ],
                'prostor': [
                    1
                ]
            };
            expect(obj).to.equal(objtest);
        });
    });
});