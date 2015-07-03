/* 
 * Enota programa razširi funkcionalnost postavke view,
 * s funkcijami za izris postavk enote programa,
 * da jih ne bomo pisali pri pri vsaki enoti.
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'underscore',
    'i18next'
], function (
        PostavkeView,
        _,
        i18next
        ) {

    var IfiPostavkaView = PostavkeView.extend({});

    /**
     * ob kliku na izbris
     * @param {type} model
     * @returns {undefined}
     */
    IfiPostavkaView.prototype.onBrisi = function (model) {
        if (confirm(i18next.t('std.potrdiIzbris'))) {
            PostavkeView.prototype.onBrisi.apply(this, arguments);
        }
    };

    /**
     * ob kliku shrani
     * @returns {Boolean}
     */
    IfiPostavkaView.prototype.onShrani = function () {
        this.zapSortSt();

        var self = this;
        if (this.commit()) {
            this.shrani(this.model, {
                success: function (model) {
                    self.triggerMethod('save:success', model);
                    var tb = self.getToolbarModel();
                    var but = tb.getButton('doc-postavka-shrani');
                    if (but) {
                        but.set('disabled', true);
                    }
                    this.renderFormAndToolbar();
                },
                error: function(model){
                    //potrebno dodati da se ne shrane v collecijo napačna vrednost 901
                }
            });
        }
        return false;
    };
    /**
     * Izračun vrednosti atributa po katerem sortiramo v podani kolekciji
     * @param {type} collection
     * @param {type} attrSort
     * @returns {undefined}
     */
    IfiPostavkaView.prototype.zapSortSt = function () {
        var min = -100;
        _.each(this.collection.models, function (e) {
            var sort = e.get('sort');
            if (sort >= min) {
                min = sort;
            }
        });

        if (min >= 0) {
            this.model.set({sort: min + 1});
            this.form.fields.sort.editor.setValue(min + 1);
        }
    };
    return IfiPostavkaView;
});