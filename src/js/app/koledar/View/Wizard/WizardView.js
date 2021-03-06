/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'underscore',
    'marionette',
    'template!../../tpl/wizard-layout.tpl'
], function (
        i18next,
        _,
        Marionette,
        tpl
        ) {

    /**
     * WizardView namenjen je izpolnjevanju večjih količin podatkov po korakih.
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var WizardView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'wizard',
        state: 0,
        triggers: {
            'click .naprej': 'naprej',
            'click .nazaj': 'nazaj',
            'click .preklici': 'preklici',
            'click .potrdi': 'potrdi'
        },
        regions: {
            detailR: '.wizard-body'
        }
    });
    /**
     * 
     * @param {type} options
     * @returns {undefined}
     */
    WizardView.prototype.initialize = function (options) {
        this.state = 0;
        if (!options.views && !this.views) {
            throw new 'Koraki niso podani';
        } else {
            this.model = options.model || this.model;
            this.title = options.title || this.title || i18next.t('std.naslov');
            this.views = options.views || this.views;
            this.viewsOptions = options.viewsOptions || this.viewsOptions;
            if (!options.callback && !this.callback) {
                throw new 'Callback ni podan';
            } else {
                this.callback = options.callback || this.callback;
            }
            this.stevecView = 0;
        }
    };
    WizardView.prototype.serializeData = function () {
        return {
            title: this.title
        };
    };
    /**
     * renderiramo prvi vju iz polja model.views
     * skrijemo gumbe wizardViewja(Modala)
     * @returns {WizardView_L13.WizardView.prototype}
     */
    WizardView.prototype.onRender = function () {
        this.renderView(this.stevecView);
        this.renderState();
    };
    /**
     * Funkcija ki skrbi da se stanja wizarda izrišejo
     * state: 0 nepripravljen na naslednji korak
     * state: 1 pripravljen na naslednji korak
     * @returns {undefined}
     */
    WizardView.prototype.renderState = function () {
        if (this.state === 0) {
            this.disableNaprej();
            this.disablePotrdi();
        } else if (this.state === 1) {
            this.enableNaprej();
            this.enablePotrdi();
        }

        this.toggleNaprejPotrdi(this.stevecView, this.views.length);
        this.toggleNazaj(this.stevecView);
    };
    /**
     * Viewji prožijo ready, ko lahko wizard nadaljuje z naslednjim korakom
     * @returns {undefined}
     */
    WizardView.prototype.onReadyForward = function (model) {
        this.onReady(model);
        this.onNaprej();
    };
    /**
     * Viewji prožijo ready, ko lahko wizard nadaljuje z naslednjim korakom
     * @returns {undefined}
     */
    WizardView.prototype.onReady = function (model) {
        this.state = 1;
        this.renderState();
        this.model = model;
    };
    /**
     * Viewji prožijo not ready, da wizardview ne more nadaljevati z naslednjim korakom
     * @returns {undefined}
     */
    WizardView.prototype.onNotReady = function () {
        this.state = 0;
        this.renderState();
    };
    /**
     * Ko se na viewju triggera naprej se izvede ta funkcija.
     * Povečamo števec vzamemo pravi view iz model.viewsa
     * renderiramo view
     * @returns {undefined}
     */
    WizardView.prototype.onNaprej = function () {
        this.stevecView++;
        this.state = 0;
        this.renderState();
        this.renderView(this.stevecView);
    };
    /**
     * Ko se na viewju triggera nazaj se izvede ta funkcija.
     * Zmanjšamo števec vzamemo pravi view iz model.viewsa
     * renderiramo view
     * @returns {undefined}
     */
    WizardView.prototype.onNazaj = function () {

        this.stevecView--;
        this.state = 1;
        this.renderState();
        this.renderView(this.stevecView);
    };
    WizardView.prototype.onPotrdi = function () {
        this.callback(this.model);
        this.trigger('close', this.model);
    };
    /**
     * Funkcija veže na podano instanco viewja poslušalce
     * @param {type} view
     * @returns {undefined}
     */
    WizardView.prototype.bind = function (view) {
        view.on('ready:forward', this.onReadyForward, this);
        view.on('ready', this.onReady, this);
        view.on('not:ready', this.onNotReady, this);
    };
    /**
     * Funkcija odstrani poslušalje iz podane instance viewja
     * @param {type} view
     * @returns {undefined}
     */
    WizardView.prototype.unBind = function (view) {
        view.off('ready:forward', this.onReadyForward, this);
        view.off('ready', this.onReady, this);
        view.off('not:ready', this.onNotReady, this);
    };
    /**
     * Render enega izmed podanih viewjev iz model.viewsa
     * @param {type} stevecView
     * @returns {Modal@call;extend.prototype.renderView.model.views|backbone.marionette_L26.model.views|Marionette@call;_getValue.model.views|backbone.marionette_L35.model.views|backbone_L34.model.views|message.model.views}
     */
    WizardView.prototype.renderView = function (stevecView) {
        if (this.view) {
            this.unBind(this.view);
        }

        var options = _.extend({model: this.model}, this.viewsOptions[stevecView]);

        var View = this.views[stevecView];
        var view = this.view = new View(options);

        if (this.view) {
            this.bind(this.view);
        }

        this.detailR.show(view);
        return view;
    };
    /**
     * Funkcija skrije ali prikaže gumb nazaj glede na trenutni števec viewjev
     * @returns {undefined}
     */
    WizardView.prototype.toggleNazaj = function (stevecView) {
        //v primeru da gledamo prvi view je gumb nazaj skrit
        if (stevecView === 0) {
            this.$('.nazaj').addClass('hidden');
        } else {
            this.$('.nazaj').removeClass('hidden');
        }
    };
    /**
     * 
     * @param {type} stevecView
     * @param {type} stView
     * @returns {undefined}
     */
    WizardView.prototype.toggleNaprejPotrdi = function (stevecView, stView) {
        if (stevecView < stView - 1) {
            this.skrijPotrdi();
            this.prikaziNaprej();
        } else {
            this.prikaziPotrdi();
            this.skrijNaprej();
        }
    };
    WizardView.prototype.prikaziPotrdi = function () {
        this.$('.potrdi').removeClass('hidden');
    };
    WizardView.prototype.skrijPotrdi = function () {
        this.$('.potrdi').addClass('hidden');
    };
    WizardView.prototype.disablePotrdi = function () {
        this.$('.potrdi').addClass('disabled');
    };
    WizardView.prototype.enablePotrdi = function () {
        this.$('.potrdi').removeClass('disabled');
    };
    WizardView.prototype.disableNaprej = function () {
        this.$('.naprej').addClass('disabled');
    };
    WizardView.prototype.enableNaprej = function () {
        this.$('.naprej').removeClass('disabled');
    };
    WizardView.prototype.prikaziNaprej = function () {
        this.$('.naprej').removeClass('hidden');
    };
    WizardView.prototype.skrijNaprej = function () {
        this.$('.naprej').addClass('hidden');
    };
    return WizardView;
});
