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
    'app/filter/Model/VrstaCollection',
    'app/filter/Model/AktivnaVrstaCollection'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        _,
        $,
        VrstaColl,
        AktivnaVrstaColl
        ) {

    describe("AktivnavrstaCollection", function () {
        
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
            this.vrsteFiltrov = new VrstaColl(null, {
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
        });

        afterEach(function () {
            this.vrsteFiltrov = null;
        });

        it('inicializacija colectiona brez podatkov', function () {
            var coll = new AktivnaVrstaColl();
            expect(coll.length).to.equal(0);
        });

        it('inicializacija colectiona s podatki(object)', function () {
            var self = this;
            var coll = new AktivnaVrstaColl(null, {
                aktivneVrste: {
                    'oseba': [
                        1,
                        2,
                        3
                    ],
                    'prostor': [
                        1
                    ]
                },
                vrsteFiltrov: self.vrsteFiltrov
            });

            expect(coll.length).to.equal(2);
            expect(coll.models[0].get('vrsta')).to.not.equal('nedoloceno');
            expect(coll.models[1].get('vrsta')).to.not.equal('nedoloceno');
            expect(coll.models[0].get('vrstaModel')).to.not.equal(new VrstaColl());
            expect(coll.models[1].get('vrstaModel')).to.not.equal(new VrstaColl());
            expect(coll.models[0].get('izbrani').length).to.equal(3);
            expect(coll.models[1].get('izbrani').length).to.equal(1);
        });
    });
});