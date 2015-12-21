/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone',
    'underscore',
    'app/bars',
    'marionette',
    'jquery',
    'template!../tpl/wizard-layout.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Handlebars,
        Marionette,
        $,
        tpl
        ) {

    var WizardView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'wizard',
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
        if (!_.isArray(options.defView.views)) {
            throw new 'Content naj bo array';
        } else {
            if (options) {
                this.model = options.model;
                this.defView = options.defView;
                this.title = this.defView.title || i18next.t('std.naslov');
                this.views = this.defView.views;
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

        if (this.views.length > 1) {
            this.skrijOK();
            this.disableNaprej();
        }

        this.toggleNazaj(this.stevecView);
    };
    /**
     * Viewji prožijo ready, ko lahko wizard nadaljuje z naslednjim korakom
     * @returns {undefined}
     */
    WizardView.prototype.onReadyNaprej = function (model) {
        this.onReady(model);
        this.onNaprej();
    };

    /**
     * Viewji prožijo ready, ko lahko wizard nadaljuje z naslednjim korakom
     * @returns {undefined}
     */
    WizardView.prototype.onReady = function (model) {
        this.enableNaprej();
        this.enableOK();
        this.model = model;
    };

    /**
     * Viewji prožijo not ready, da wizardview ne more nadaljevati z naslednjim korakom
     * @returns {undefined}
     */
    WizardView.prototype.onNotReady = function () {
        this.disableNaprej();
        this.disableOK();
    };

    /**
     * Ko se na viewju triggera naprej se izvede ta funkcija.
     * Povečamo števec vzamemo pravi view iz model.viewsa
     * renderiramo view
     * @returns {undefined}
     */
    WizardView.prototype.onNaprej = function () {
        this.disableNaprej();
        this.disableOK();

        this.stevecView++;
        this.renderView(this.stevecView);

        this.toggleNaprejOK(this.stevecView, this.views.length);
        this.toggleNazaj(this.stevecView);
    };
    /**
     * Ko se na viewju triggera nazaj se izvede ta funkcija.
     * Zmanjšamo števec vzamemo pravi view iz model.viewsa
     * renderiramo view
     * @returns {undefined}
     */
    WizardView.prototype.onNazaj = function () {
        this.enableNaprej();
        this.enableOK();

        this.stevecView--;
        this.renderView(this.stevecView);

        this.toggleNaprejOK(this.stevecView, this.views.length);
        this.toggleNazaj(this.stevecView);
    };

    WizardView.prototype.onPotrdi = function () {
        var self = this;

        this.model.save({}, {
            success: function () {
                Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                self.trigger('zapri:wizard', this.model);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    /**
     * Render enega izmed podanih viewjev iz model.viewsa
     * @param {type} stevecView
     * @returns {Modal@call;extend.prototype.renderView.model.views|backbone.marionette_L26.model.views|Marionette@call;_getValue.model.views|backbone.marionette_L35.model.views|backbone_L34.model.views|message.model.views}
     */
    WizardView.prototype.renderView = function (stevecView) {
        var View = this.views[stevecView];
        var view = this.view = new View({
            model: this.model
        });

        view.on('ready:naprej', this.onReadyNaprej, this);
        view.on('ready', this.onReady, this);
        view.on('not:ready', this.onNotReady, this);

        this.detailR.show(view);
        return view;
    };

    /**
     * Funkcija skrije ali prikaže gumb nazaj glede na trenutni števec viewjev
     * @returns {undefined}
     */
    WizardView.prototype.toggleNazaj = function (stevecView) {
        if (stevecView === 0) {
            this.$('.nazaj').addClass('hidden');
        } else {
            this.$('.nazaj').removeClass('hidden');
        }
    };

    WizardView.prototype.toggleNaprejOK = function (stevecView, stView) {
        if (stevecView < stView - 1) {
            this.skrijOK();
            this.prikaziNaprej();
        } else {
            this.prikaziOK();
            this.skrijNaprej();
        }
    };

    WizardView.prototype.prikaziOK = function () {
        this.$('.potrdi').removeClass('hidden');
    };
    WizardView.prototype.skrijOK = function () {
        this.$('.potrdi').addClass('hidden');
    };
    WizardView.prototype.disableOK = function () {
        this.$('.potrdi').addClass('disabled');
    };

    WizardView.prototype.enableOK = function () {
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
