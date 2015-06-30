/* 
 * Enota programa razširi funkcionalnost postavke view,
 * s funkcijami za izris postavk enote programa,
 * da jih ne bomo pisali pri pri vsaki enoti.
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'app/programDela/View/DrugiVirView',
    'app/programDela/View/KoprodukcijaView',
    'underscore'
], function (
        PostavkeView,
        DrugiVirView,
        KoprodukcijaView,
        _
        ) {

    var EnotaProgramaView = PostavkeView.extend({
        regions: {
            drugiViriR: '.region-drugiViri',
            koprodukcijeR: '.region-koprodukcije'
        }
    });


    /**
     * ob izrisu forme se izvede še izris postavk
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onRenderForm = function () {
        if (!this.model.isNew()) {
            this.renderDrugiViri();
            this.renderKoprodukcije();
        }
        this.listenTo(this, 'preklici', function () {
            console.log('preklici');
            this.drugiViriR.empty();
            this.koprodukcijeR.empty();
        });

    };

    /**
     * izris postavke drugi viri
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderDrugiViri = function () {
        var view = new DrugiVirView({
            collection: this.model.drugiViriCollection,
            dokument: this.model
        });

        this.drugiViriR.show(view);
        this.listenTo(view, 'destroy', function () {
            console.log('zapiram drugi');
        });
    };
    /**
     * Izris postavke koproducent
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderKoprodukcije = function () {
        var view = new KoprodukcijaView({
            collection: this.model.koprodukcijeCollection,
            dokument: this.model
        });

        this.koprodukcijeR.show(view);

        this.listenTo(view, 'destroy', function () {
            console.log('zapiram kopr');
        });
    };

    EnotaProgramaView.prototype.zapSortSt = function (collection, attrSort) {
        var min = -100;
        _.each(collection.models, function (e) {
            var sort = e.get(attrSort);
            if (sort >= min) {
                min = sort;
            }
        });

        if (min >= 0) {
            this.model.set({sort: min + 1});
            this.form.fields.sort.editor.setValue(min + 1);
        }
    };

    EnotaProgramaView.prototype.onDodaj = function () {
        PostavkeView.prototype.onDodaj.apply(this, arguments);
        this.zapSortSt(this.collection, 'sort');
    };

    return EnotaProgramaView;
});