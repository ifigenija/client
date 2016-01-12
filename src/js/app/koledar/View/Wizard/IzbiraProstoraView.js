/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'baseUrl',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'app/Max/Module/Form'

], function (
        Radio,
        baseUrl,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        Form
        ) {
    var sch = {type: 'Toone', targetEntity: 'prostor', editorAttrs: {class: 'form-control'}, title: 'Prostor'};

    var IzbiraProstoraView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="prostor"></div></form>'),
        schema: {
            prostor: sch
        }
    });

    IzbiraProstoraView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);

        this.options = options;
        this.model = options.model;

        var self = this;
        //ob spremembi izbranega prostora se mora prostor v model tudi zabeležit
        this.on('prostor:change', function (form, editor) {
            //pridobimo vrednost iz editorja. V kolikor ni vrednosti se proži not:ready
            var prostor = editor.getValue();
            if (prostor && prostor.id) {
                //nastavimo vrednost prostora v modelu
                self.model.set('prostor', prostor.id);
                self.trigger('ready', self.model);
            } else {
                self.trigger('not:ready');
            }
        }, this);
    };

    IzbiraProstoraView.prototype.render = function () {
        Form.prototype.render.apply(this, arguments);
        // Iz modela poskušamo prebrati prostor in uprizoritev.
        // V primeru da je prostor že določen se ponovno nastavi v modelu
        if (this.options && this.options.model) {
            var uprID = this.model.get('uprizoritev');
            var prostorID = this.model.get('prostor');

            if (prostorID) {
                this.nastaviProstor(prostorID);
            } else if (uprID) {
                //v primeru da prostor ne obstaja se nastavi kot prostor matični oder uprizoritve
                this.nastaviProstorUprizoritve(uprID);
            }
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
     * @param {type} prostorID
     * @returns {undefined}
     */
    IzbiraProstoraView.prototype.nastaviProstor = function (prostorID) {
        this.setValue({
            prostor: prostorID
        });
        this.trigger('prostor:change', this, this.fields.prostor.editor);
    };

    return IzbiraProstoraView;
});