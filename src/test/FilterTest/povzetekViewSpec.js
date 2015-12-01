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
    'app/filter/View/PovzetekView'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        PovzetekView
        ) {

    describe("PovzetekView", function () {
        beforeEach(function () {
            var coll = new Backbone.Collection();

            coll.add([{
                    label: 'lovro',
                    poklic: 'razvijalec'
                }, {
                    label: 'boris',
                    poklic: 'direktor'
                }]);

            this.povzetek = new PovzetekView({
                collection: coll,
                stIzpisov: 1
            });

            this.povzetek.render();
        });

        afterEach(function () {
        });

        it('inicializacija', function () {
            expect(this.povzetek.collection.length).to.equal(2);
        });

        it('pravilen izpis', function () {
            var $item = this.povzetek.$('.povzetek-item');
            var $ostanek = this.povzetek.$('.povzetek-ostanek');

            expect($item.length).to.equal(1);
            expect($ostanek.text()).to.contain('(1)');
        });

        it('dodaj vrednost izpis', function () {
            this.povzetek.collection.add({
                label: 'aleš',
                poklic: 'web'
            });

            var $item = this.povzetek.$('.povzetek-item');
            var $ostanek = this.povzetek.$('.povzetek-ostanek');

            expect($item.length).to.equal(1);
            expect($ostanek.text()).to.contain('(2)');
        });

        it('odstrani izpis', function () {
            this.povzetek.collection.remove({
                label: 'lovro',
                poklic: 'razvijalec'
            });
            
            var $ostanek = this.povzetek.$('.povzetek-ostanek');
            expect($ostanek.text()).to.not.contain('(');
        });
    });
});