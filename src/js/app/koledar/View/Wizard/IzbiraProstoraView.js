/* 
 * Licenca GPLv3
 */
define([
    'baseUrl',
    'i18next',
    'app/bars',
    'backbone',
    'app/Max/Module/Form'

], function (
        baseUrl,
        i18next,
        Handlebars,
        Backbone,
        Form
        ) {

    var IzbiraProstoraView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="prostor"></div></form>')
    });

    IzbiraProstoraView.prototype.initialize = function (options) {
        options.schemaOptions[0] = i18next.t("prostor.brez");

        this.schema = {
            prostor: {
                title: i18next.t('prostor.title'),
                name: 'prostor',
                type: 'Select',
                targetEntity: 'prostor',
                options: options.schemaOptions,
                editorAttrs: {
                    class: 'form-control',
                    type: 'optionalselect',
                    name: 'prostor'
                }
            }
        };

        Form.prototype.initialize.apply(this, arguments);

        this.options = options;

        if (options && options.model) {
            this.model = options.model || this.model;
            if (typeof (options.izberiProstor) !== 'undefined') {
                this.izberiProstor = options.izberiProstor;
            } else {
                this.izberiProstor = true;
            }
        }

        var self = this;
        //ob spremembi izbranega prostora se mora prostor v model tudi zabeležit
        this.on('prostor:change', function (form, editor) {
            //pridobimo vrednost iz editorja. V kolikor ni vrednosti se proži not:ready
            var prostor = editor.getValue();
            if (prostor !== '0') {
                //nastavimo vrednost prostora v modelu
                self.model.set('prostor', prostor);
                self.trigger('ready', self.model);
            }
            else {
                if (self.izberiProstor) {
                    self.trigger('not:ready');

                } else {
                    self.trigger('ready', self.model);
                }
            }
        }, this);
    };

    IzbiraProstoraView.prototype.render = function () {
        Form.prototype.render.apply(this, arguments);
        // Iz modela poskušamo prebrati prostor in uprizoritev.
        // V primeru da je prostor že določen se ponovno nastavi v modelu
        if (this.options && this.options.model) {
            var upr = this.model.get('uprizoritev');
            var uprID;
            if (upr) {
                uprID = upr.get('id');
            }
            var prostor = this.model.get('prostor');

            if (prostor) {
                this.nastaviProstor(prostor);
            } else if (uprID) {
                //v primeru da prostor ne obstaja se nastavi kot prostor matični oder uprizoritve
                this.nastaviProstorUprizoritve(uprID);
            }
            this.trigger('prostor:change', this, this.fields.prostor.editor);
        }
    };

    /**
     * Iz uprizoritve preberemo naslov in ga nastavimo kot prostor tega modela
     * @param {type} uprizoritevID
     * @returns {undefined}
     */
    IzbiraProstoraView.prototype.nastaviProstorUprizoritve = function (uprizoritevID) {
        var self = this;

        var UprModel = Backbone.Model.extend({
            urlRoot: baseUrl + '/rest/uprizoritev'
        });

        var model = new UprModel({id: uprizoritevID});

        model.fetch({
            success: function () {
                self.nastaviProstor(model.get('maticniOder'));
            }
        });
    };

    /**
     * Nastavimo prostor in kličemo on change, da se nastavi prostor tudi v modelu
     * @param {type} prostor
     * @returns {undefined}
     */
    IzbiraProstoraView.prototype.nastaviProstor = function (prostor) {
        this.setValue({
            prostor: prostor
        });
        this.trigger('prostor:change', this, this.fields.prostor.editor);
    };

    return IzbiraProstoraView;
});