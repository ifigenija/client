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
    'marionette',
    'underscore',
    'jquery',
    'app/filter/Model/VrstaCollection'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        _,
        $,
        VrstaColl
        ) {

    describe("VrstaCollection", function () {

        beforeEach(function () {
        });

        afterEach(function () {
        });

        it('inicializacija collectiona brez podatkov', function () {
            var coll = new VrstaColl();
            expect(coll.length).to.equal(0);
        });

        it('inicializacija collectiona s podatki(array)', function () {
            var coll = new VrstaColl(null, {
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
                    }]
            });
            
            expect(coll.length).to.equal(2);
            expect(coll.models[0].get('mozni')).to.be.instanceof(Backbone.Collection);
            expect(coll.models[1].get('mozni')).to.be.instanceof(Backbone.Collection);
        });
        it('inicializacija collectiona s podatki(Collection)', function () {
            var vrsteFiltrov = new VrstaColl();
            vrsteFiltrov.add([{
                    title: 'Izbira oseb',
                    id: 'oseba',
                    icon: 'fa fa-user',
                    mozni: [
                        {id: 1, ident: "1", "label": "lovro"},
                        {id: 2, ident: "2", "label": "simon"},
                        {id: 3, ident: "3", "label": "aleš"}
                    ]
                },
                {
                    title: 'Izbira prostorov',
                    vrsta: 'prostor',
                    icon: 'fa fa-home',
                    mozni: [
                        {id: 1, ident: "1", "label": "lovro"},
                        {id: 2, ident: "2", "label": "simon"},
                        {id: 3, ident: "3", "label": "aleš"}
                    ]
                }]);
            var coll = new VrstaColl(null, {
                vrsteFiltrov: vrsteFiltrov
            });
            
            expect(coll.length).to.equal(2);
            expect(coll.models[0].get('mozni')).to.be.instanceof(Backbone.Collection);
            expect(coll.models[1].get('mozni')).to.be.instanceof(Backbone.Collection);
        });
    });
});