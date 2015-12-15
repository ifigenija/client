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
    'backbone-modal'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Handlebars,
        Marionette,
        $,
        Modal
        ) {

    //Set custom template settings
    var _interpolateBackup = _.templateSettings;
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g,
        evaluate: /<%([\s\S]+?)%>/g
    };

    var template = _.template('\
    <div class="modal-dialog"><div class="modal-content">\
    <% if (title) { %>\
      <div class="modal-header">\
        <% if (allowCancel) { %>\
          <a class="close">&times;</a>\
        <% } %>\
        <h4>{{title}}</h4>\
      </div>\
    <% } %>\
    <div class="modal-body">{{content}}</div>\
    <% if (showFooter) { %>\
      <div class="modal-footer">\
        <% if (allowCancel) { %>\
          <% if (cancelText) { %>\
            <a href="#" class="btn cancel">{{cancelText}}</a>\
          <% } %>\
        <% } %>\
        <a href="#" class="btn nazaj btn-default">{{nazajText}}</a>\
        <a href="#" class="btn naprej btn-default">{{naprejText}}</a>\
        <a href="#" class="btn ok btn-primary">{{okText}}</a>\
      </div>\
    <% } %>\
    </div></div>\
  ');

    //Reset to users' template settings
    _.templateSettings = _interpolateBackup;


    var WizardView = Modal.extend({
        className: 'wizard-modal modal',
        events: function () {
            return _.extend({}, Modal.prototype.events, {
                'click .naprej': function (event) {
                    event.preventDefault();
                    this.trigger('naprej');
                },
                'click .nazaj': function (event) {
                    event.preventDefault();
                    this.trigger('nazaj');
                }
            });
        }
    });
    WizardView.prototype.initialize = function (options) {
        Modal.prototype.initialize.apply(this, arguments);

        this.options = _.extend({
            nazajText: i18next.t('std.nazaj'),
            naprejText: i18next.t('std.naprej')
        }, 
        this.options, {template: template});

        if (!_.isArray(options.content)) {
            throw new 'Content naj bo array';
        } else {
            for (var id in options.content) {
                var view = options.content[id];
                view.on('ready', this.onReady, this);
                view.on('not:ready', this.onNotReady, this);
            }

            this.zacetek = options.zacetek || this.zacetek;
            this.konec = options.konec || this.konec;
            this.title = options.title || i18next.t('std.naslov');
        }

        this.on('naprej', this.onNaprej, this);
        this.on('nazaj', this.onNazaj, this);

        this.stevecView = 0;
    };
    /**
     * renderiramo prvi vju iz polja content
     * skrijemo gumbe wizardViewja(Modala)
     * @returns {WizardView_L13.WizardView.prototype}
     */
    WizardView.prototype.render = function () {

        var $el = this.$el;
        var options = this.options;
        $el.html(options.template(options));
        
        
        this.renderView(this.stevecView);

        if (options.animate && this.stevecView === 0) {
            $el.addClass('fade');
        }

        if (options.content.length > 1) {
            this.skrijOK();
            this.disableNaprej();
        }

        this.toggleNazaj(this.stevecView);

        this.isRendered = true;

        return this;
    };
    /**
     * Viewji prožijo ready, ko lahko wizard nadaljuje z naslednjim korakom
     * @returns {undefined}
     */
    WizardView.prototype.onReady = function () {
        this.enableNaprej();
        this.enableOK();
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
     * Povečamo števec vzamemo pravi view iz contenta
     * renderiramo view
     * @returns {undefined}
     */
    WizardView.prototype.onNaprej = function () {
        this.disableNaprej();
        this.disableOK();

        this.stevecView++;
        this.renderView(this.stevecView);

        this.toggleNaprejOK(this.stevecView, this.options.content.length);
        this.toggleNazaj(this.stevecView);
    };
    /**
     * Ko se na viewju triggera nazaj se izvede ta funkcija.
     * Zmanjšamo števec vzamemo pravi view iz contenta
     * renderiramo view
     * @returns {undefined}
     */
    WizardView.prototype.onNazaj = function () {
        this.enableNaprej();
        this.enableOK();

        this.stevecView--;
        this.renderView(this.stevecView);

        this.toggleNaprejOK(this.stevecView, this.options.content.length);
        this.toggleNazaj(this.stevecView);
    };

    /**
     * Render enega izmed podanih viewjev iz contenta
     * @param {type} stevecView
     * @returns {Modal@call;extend.prototype.renderView.content|backbone.marionette_L26.content|Marionette@call;_getValue.content|backbone.marionette_L35.content|backbone_L34.content|message.content}
     */
    WizardView.prototype.renderView = function (stevecView) {
        var $el = this.$el;
        var options = this.options;
        var content = options.content[stevecView];

        if (content.$el) {
            content.render();
            $el.find('.modal-body').html(content.$el);
        }

        return content;
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
        this.$('.ok').removeClass('hidden');
    };
    WizardView.prototype.skrijOK = function () {
        this.$('.ok').addClass('hidden');
    };
    WizardView.prototype.disableOK = function () {
        this.$('.ok').addClass('disabled');
    };

    WizardView.prototype.enableOK = function () {
        this.$('.ok').removeClass('disabled');
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
