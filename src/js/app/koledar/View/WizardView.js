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
        if (!_.isArray(options.views)) {
            throw new 'Content naj bo array';
        } else {
            this.title = options.title || i18next.t('std.naslov');
            this.stevecView = 0;
            
            if (options) {
                this.state = options;
            }
        }
    };
    
    WizardView.prototype.serializeData = function () {
        return {
            title: this.title
        };
    };
    /**
     * renderiramo prvi vju iz polja state.views
     * skrijemo gumbe wizardViewja(Modala)
     * @returns {WizardView_L13.WizardView.prototype}
     */
    WizardView.prototype.onRender = function () {
        this.renderView(this.stevecView);

        if (this.state.views.length > 1) {
            this.skrijOK();
            this.disableNaprej();
        }

        this.toggleNazaj(this.stevecView);
    };
    /**
     * Viewji prožijo ready, ko lahko wizard nadaljuje z naslednjim korakom
     * @returns {undefined}
     */
    WizardView.prototype.onReady = function (state) {
        this.enableNaprej();
        this.enableOK();
        this.state = state;
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
     * Povečamo števec vzamemo pravi view iz state.viewsa
     * renderiramo view
     * @returns {undefined}
     */
    WizardView.prototype.onNaprej = function () {
        this.disableNaprej();
        this.disableOK();

        this.stevecView++;
        this.renderView(this.stevecView);

        this.toggleNaprejOK(this.stevecView, this.state.views.length);
        this.toggleNazaj(this.stevecView);
    };
    /**
     * Ko se na viewju triggera nazaj se izvede ta funkcija.
     * Zmanjšamo števec vzamemo pravi view iz state.viewsa
     * renderiramo view
     * @returns {undefined}
     */
    WizardView.prototype.onNazaj = function () {
        this.enableNaprej();
        this.enableOK();

        this.stevecView--;
        this.renderView(this.stevecView);

        this.toggleNaprejOK(this.stevecView, this.state.views.length);
        this.toggleNazaj(this.stevecView);
    };
    
    WizardView.prototype.onPotrdi = function () {
        var self = this;
        
        this.state.model.save({},{
            success:function(){
                Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                self.trigger('zapri:wizard', this.state);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    /**
     * Render enega izmed podanih viewjev iz state.viewsa
     * @param {type} stevecView
     * @returns {Modal@call;extend.prototype.renderView.state.views|backbone.marionette_L26.state.views|Marionette@call;_getValue.state.views|backbone.marionette_L35.state.views|backbone_L34.state.views|message.state.views}
     */
    WizardView.prototype.renderView = function (stevecView) {
        var View = this.state.views[stevecView];
        var view = new View(this.state);

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
