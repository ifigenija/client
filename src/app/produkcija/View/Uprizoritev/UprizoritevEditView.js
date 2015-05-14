/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/uprizoritev/uprizoritev-edit.tpl',
    'template!../../tpl/uprizoritev/uprizoritev-form.tpl',
    'formSchema!uprizoritev',
    'i18next'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next
        ) {

    var UprizoritevEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        triggers: {
            'click .tab-splosno': 'splosni',
            'click .tab-osebe': 'osebe',
            'click .tab-arhivalije': 'arhivalije'
        },
        regions: {
            regionArhivalije: '.region-arhivalije',
            regionOsebe: '.region-osebe'
        }
    });

    UprizoritevEditView.prototype.getNaslovUprizoritve = function () {
        var naslovT = this.model.get('naslov');
        
        var naslov = naslovT ? naslovT : i18next.t('produkcija.view.uprizoritev.naslov');
        
        return naslov;
    };

    UprizoritevEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('produkcija.view.uprizoritev.nova') : this.getNaslovUprizoritve();
    };
    
    UprizoritevEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };


    UprizoritevEditView.prototype.onRender = function () {
        if (this.isNew()) {
            this.$('.tab-osebe a').prop('disabled', 'disabled');
            this.$('.tab-arhivalije a').prop('disabled', 'disabled');
        } else {
            this.renderOsebe();
            this.renderArhivalije();
        }
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        this.$('.tab-splosno').addClass('active');
        
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onOsebe = function () {
        this.deselectTab();
        this.$('.pnl-osebe').addClass('active');
        this.$('.tab-osebe').addClass('active');
    };
    /**
     * Klik na tab za trr podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onArhivalije = function () {
        this.deselectTab();
        this.$('.pnl-arhivalije').addClass('active');
        this.$('.tab-arhivalije').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.deselectTab = function () {
        this.$('.uprizoritev-tabs li').removeClass('active');
        this.$('.uprizoritev-panels .tab-pane').removeClass('active');
    };


    UprizoritevEditView.prototype.renderArhivalije = function () {
        var self = this;
        require(['app/produkcija/View/ArhivalijaView'], function (View) {
            var view = new View({
                collection: self.model.arhivalijeCollection,
                dokument: self.model
            });
            self.regionArhivalije.show(view);
            return view;
        });
    };

    UprizoritevEditView.prototype.renderOsebe = function () {
//        var self = this;
//        require(['app/produkcija/View/Oseba/OsebaView'], function (View) {
//            var view = new View({
//                collection: self.model.osebeCollection,
//                dokument: self.model
//            });
//            self.regionOsebe.show(view);
//            return view;
//        });
    };

    return UprizoritevEditView;
});
