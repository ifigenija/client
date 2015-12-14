/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'template!../tpl/dogodek-izbira.tpl',
    '../Model/RazredDogodek',
    '../Model/TerminiStoritev'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        izbiraTpl,
        RazredDogodek,
        TerminiStoritev
        ) {

    var IzbiraView = Marionette.ItemView.extend({
        template: izbiraTpl,
        triggers: {
            'click .dogodek-vaja': 'vaja',
            'click .dogodek-predstava': 'predstava',
            'click .dogodek-zasedenost': 'zasedenost',
            'click .dogodek-gostovanje': 'gostovanje',
            'click .dogodek-splosni': 'splosni',
            'click .dogodek-tehnicni': 'tehnicni'
        }
    });

    IzbiraView.prototype.initialize = function (options) {
        this.model = options.model || this.model;
    };

    IzbiraView.prototype.initRazredDogodka = function (options) {
        var model = this.model = new RazredDogodek({
            view: options.view,
            zacetek: this.zacetek,
            konec: this.konec,
            title: options.title,
            status: options.status
        });

        return model;
    };
    
    IzbiraView.prototype.onVaja = function () {
        this.initRazredDogodka({
            view: 'vaja',
            title: 'Vaja',
            status: '100s'
        });
        this.trigger('ready');
    };
    IzbiraView.prototype.onPredstava = function () {
        this.initRazredDogodka({
            view: 'predstava',
            title: 'Predstava',
            status: '100s'
        });
        this.trigger('ready');
    };
    IzbiraView.prototype.onZasedenost = function () {
        var model = this.model = new TerminiStoritev.prototype.model();

        if (this.zacetek) {
            model.set('planiranZacetek', this.zacetek);
        }
        model.set('planiranKonec', this.konec);
        this.trigger('ready');
    };
    IzbiraView.prototype.onGostovanje = function () {
        this.initRazredDogodka({
            view: 'gostovanje',
            title: 'Gostovanje',
            status: '100s'
        });this.trigger('ready');
        
    };
    IzbiraView.prototype.onSplosni = function () {
        this.initRazredDogodka({
            view: 'dogodekSplosni',
            title: 'Splošni',
            status: '100s'
        });
        this.trigger('ready');
    };
    IzbiraView.prototype.onTehnicni = function () {
        this.initRazredDogodka({
            view: 'dogodekTehnicni',
            title: 'Tehnični',
            status: '100s'
        });
        this.trigger('ready');
    };

    return IzbiraView;
});