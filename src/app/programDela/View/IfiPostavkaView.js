/* 
 * Enota programa razširi funkcionalnost postavke view,
 * s funkcijami za izris postavk enote programa,
 * da jih ne bomo pisali pri pri vsaki enoti.
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'underscore',
    'radio'
], function (
        PostavkeView,
        _,
        Radio
        ) {

    var IfiPostavkaView = PostavkeView.extend({});

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