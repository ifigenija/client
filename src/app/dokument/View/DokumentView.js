define([
    'application',
    'underscore',
    'backbone',
    'app/Dokument/View/FormView',
    'text!app/Dokument/tpl/dokument.tpl',
    'app/handlebars'
], function (
        App,
        _,
        Backbone,
        FormView,
        tpl,
        Handlebars
        ) {

    var DokumentView = FormView.extend({
        viewRoute: null,
        formTitle: 'Glava dokumenta',
        template: Handlebars.compile(tpl),
        buttons: {
            'doc-shrani': {
                id: 'doc-shrani',
                label: 'Shrani',
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            'doc-skrij': {
                id: 'doc-skrij',
                label: 'Skrij',
                element: 'button-trigger',
                trigger: 'skrij'
            }
        },
        constructor: function () {
            FormView.prototype.constructor.apply(this, arguments);
            if (!this.regionDocToolbar) {
                this.addRegions({regionDocToolbar: '.region-doctoolbar'});
            }
            if (this.postavkeView && !this.regionPostavke) {
                this.addRegions({regionPostavke: '.region-postavke'});
            }
        }
    });
    DokumentView.prototype.serializeData = function () {
        return _.extend(this.model.toJSON(), {
            docStevilka: this.getStevilka(),
            docTipDokumenta: this.getTipDokumenta(),
            docStatus: this.getStatus(),
            docNaslov: this.getNaslov(),
            formTitle: this.formTitle,
            
        });
    };
    
    DokumentView.prototype.getNaslov = function () {
        if (this.isNew()) {
            return 'Nov dokument';
        } else {
            var stevilka = this.getStevilka();
            return stevilka ? 'Dokument ' + stevilka : 'Dokument';
        }
    };
    DokumentView.prototype.getTabNaslov = function () {
        return this.getNaslov();
    };
    DokumentView.prototype.getStevilka = function () {
        return this.model.get('stevilka') || _.escape('<brez>');
    };
    DokumentView.prototype.getTipDokumenta = function () {
        return this.model.get('dok');
    };
    DokumentView.prototype.getStatus = function () {
        return this.model.get('potrjen') ? 'Potrjen' : 'Osnutek';
    };
    DokumentView.prototype.render = function () {
        var result = FormView.prototype.render.apply(this, arguments);
        if (this.postavkeView && !this.isNew()) {
            this.renderPostavke();
        }
        return result;
    };
    DokumentView.prototype.renderPostavke = function () {
        var postavke = new this.postavkeView({
            collection: this.model.postavkeCollection,
            dokument: this.model
        });
        this.regionPostavke.show(postavke);
        return postavke;
    };
    DokumentView.prototype.onFormChange = function (form) {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-shrani');
        if (but.get('disabled')) {
            but.set({
                disabled: false
            });
        }
    };
    DokumentView.prototype.onSkrij = function () {
        this.$('.glava-panel')
                .find('.panel-body')
                .css({'display': 'none'})
                .animate(700);
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-skrij');
        but.set({
            label: 'Pokaži',
            trigger: 'pokazi'
        });
    };
    DokumentView.prototype.onPokazi = function () {

        this.$('.glava-panel')
                .find('.panel-body')
                .css({'display': 'block'})
                .animate(700);
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-skrij');
        but.set({
            label: 'Skrij',
            trigger: 'skrij'
        });
    };
    DokumentView.prototype.onShrani = function (options) {
        options = options || {};
        var isNew = this.isNew();
        if (this.commit()) {
            var self = this;
            this.model.save({}, {
                wait: true,
                success: function (model) {
                    App.FlashManager.flash({
                        message: 'Dokument uspešno shranjen',
                        severity: 'success'
                    });
                    if (!options.success) {
                        if (isNew) {
                            // zamenjamo zadnji del url z id (#model/dodaj -> #model/id)
                            var url = Backbone.history.location.hash;
                            var newUrl = url.replace(/([\w-]+)$/g, self.model.id);
                            App.TabLayout.replaceUrl(newUrl);
                            App.TabLayout.setTabTitle(self.getNaslov());
                            self.render();
                        } else if (this.viewRoute) {
                            App.TabLayout.closeActiveTab();
                            App.TabLayout.loadFragment(self.viewRoute + self.model.id);
                        }
                    } else {
                        options.sucess.apply(self, arguments);
                    }
                    var tb = self.getToolbarModel();
                    var but = tb.getButton('doc-shrani');
                    but.set('disabled', true);
                },
                error: function (model, xhr) {
                    App.FlashManager.fromXhr(model, xhr);
                    if (options.error) {
                        options.error.apply(self, arguments);
                    }
                }
            });
            return true;
        }
        return false;
    };
    
    return DokumentView;
});