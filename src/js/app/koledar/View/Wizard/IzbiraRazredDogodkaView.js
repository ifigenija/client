/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'moment',
    'template!../../tpl/dogodek-izbira.tpl',
    '../../Model/RazredDogodek',
    '../../Model/TerminiStoritve'
], function (
        Marionette,
        moment,
        izbiraTpl,
        RazredDogodek,
        TerminiStoritve
        ) {

    var IzbiraRazredDogodkaView = Marionette.ItemView.extend({
        template: izbiraTpl,
        triggers: {
            'click .dogodek-vaja': 'vaja',
            'click .dogodek-predstava': 'predstava',
            'click .dogodek-zasedenost': 'zasedenost',
            'click .dogodek-gostovanje': 'gostovanje',
            'click .dogodek-splosni': 'splosni',
            'click .dogodek-tehnicni': 'tehnicni',
            'click .preklici': 'preklici'
        }
    });

    IzbiraRazredDogodkaView.prototype.initialize = function (options) {
        this.model = options.model;
        this.zacetek = moment(options.model.get('zacetek'));
        this.konec = moment(options.model.get('konec'));
    };

    IzbiraRazredDogodkaView.prototype.initRazredDogodka = function (options) {
        var model = this.model = new RazredDogodek({
            view: options.view,
            zacetek: this.zacetek,
            konec: this.konec,
            title: options.title,
            status: options.status,
            razred: options.razred
        });

        return model;
    };
    IzbiraRazredDogodkaView.prototype.onVaja = function () {
        this.initRazredDogodka({
            view: 'vaja',
            title: 'Vaja',
            status: '200s',
            razred: '200s'
        });
        this.trigger('izbrano', this.model);
    };
    IzbiraRazredDogodkaView.prototype.onPredstava = function () {
        this.initRazredDogodka({
            view: 'predstava',
            title: 'Predstava',
            status: '200s',
            razred: '100s'
        });
        this.trigger('izbrano', this.model);
    };
    IzbiraRazredDogodkaView.prototype.onZasedenost = function () {
        var model = this.model = new TerminiStoritve.prototype.model();

        if (this.zacetek) {
            model.set('planiranZacetek', this.zacetek);
        }
        model.set('planiranKonec', this.konec);
        model.set('razred', '500s');
        this.trigger('izbrano', this.model);
    };
    IzbiraRazredDogodkaView.prototype.onGostovanje = function () {
        this.initRazredDogodka({
            view: 'gostovanje',
            title: 'Gostovanje',
            status: '200s',
            razred: '300s'
        });
        this.trigger('izbrano', this.model);
    };
    IzbiraRazredDogodkaView.prototype.onSplosni = function () {
        this.initRazredDogodka({
            view: 'dogodekSplosni',
            title: 'Splošni',
            status: '200s',
            razred: '400s'
        });
        this.trigger('izbrano', this.model);
    };
    IzbiraRazredDogodkaView.prototype.onTehnicni = function () {
        this.initRazredDogodka({
            view: 'dogodekTehnicni',
            title: 'Tehnični',
            status: '200s',
            razred: '600s'
        });
        this.trigger('izbrano', this.model);
    };

    return IzbiraRazredDogodkaView;
});