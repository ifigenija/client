/* 
 * Licenca GPLv3
 */
define([
    'moment',
    'app/koledar/View/VzporedniceView'
], function (
        moment,
        VzporedniceView
        ) {

    var WizardVzporedniceView = VzporedniceView.extend({
    });

    /**
     * inicializacija collectiona Uprizoritev
     * V kolekcijo dodamo uprizoritev, ki jo trenutno gledamo
     * @param {type} options
     * @returns {undefined}
     */
    WizardVzporedniceView.prototype.initialize = function (options) {
        VzporedniceView.prototype.initialize.apply(this, arguments);

        var zacetek = options.model.get('zacetek');
        var konec = options.model.get('konec');

        if (options && options.model) {
            this.model = options.model;
        }

        if (options && options.model.get('uprizoritev')) {
            this.collectionUprizoritev.add(options.model.get('uprizoritev'));
        }

        if (options && zacetek) {
            this.zacetek = moment(zacetek).toISOString();
        }

        if (options && konec) {
            this.konec = moment(konec).toISOString();
        }

        if (!this.collectionUprizoritev.length) {
            this.trigger('not:ready');
        }
    };

    /**
     * Funkcija se kliče, ko vzporedniceview/prekrivanjaView prožijo select oz takrak ko izberemo uprizoritev
     * @param {type} model
     * @returns {undefined}
     */
    WizardVzporedniceView.prototype.onSelected = function (model) {
        if (!this.collectionUprizoritev.length) {
            this.collectionUprizoritev.add(model);
        } else {
            this.collectionUprizoritev.reset(model);
        }

        if (this.collectionUprizoritev.length) {
            this.$('.prikazi-prekrivanja').removeClass('hidden');

            this.model.set('uprizoritev', model);

            this.collectionUprizoritev.on('added', function () {
                this.model.set('alternacije', this.collectionUprizoritev.vrniIzbraneAlternacije());
                this.trigger('ready', this.model);
            }, this);
        }
    };

    WizardVzporedniceView.prototype.onChange = function (model) {
        if (!this.collectionUprizoritev.length) {
            this.trigger('not:ready');
        } else {
            this.model.set('alternacije', this.collectionUprizoritev.vrniIzbraneAlternacije());
            this.trigger('ready', this.model);
        }
    };

    return WizardVzporedniceView;
});