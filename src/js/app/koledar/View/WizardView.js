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
        options.template = template;
        Modal.prototype.initialize.apply(this, arguments);
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
        var content = options.content[this.stevecView];
        //Create the modal container
        $el.html(options.template(options));
        var $content = this.$content = $el.find('.modal-body');
        //Insert the main content if it's a view
        if (content.$el) {
            content.render();
            $el.find('.modal-body').html(content.$el);
        }

        if (options.animate && this.stevecView === 0) {
            $el.addClass('fade');
        }

        if (options.content.length > 1) {
            this.skrijOK();
            this.disableNaprej();
        }

        if (this.stevecView === 0) {
            this.$('.nazaj').addClass('hidden');
        }

        this.isRendered = true;

        return this;
    };

    WizardView.prototype.onReady = function () {
        this.enableNaprej();
    };

    WizardView.prototype.onNotReady = function () {
        this.disableNaprej();
    };

    /**
     * Ko se na viewju triggera naprej se izvede ta funkcija.
     * Povečamo števec vzamemo pravi view iz contenta
     * renderiramo view
     * @returns {undefined}
     */
    WizardView.prototype.onNaprej = function () {
        var $el = this.$el;
        var options = this.options;
        this.stevecView++;
        var content = options.content[this.stevecView];

        if (content.$el) {
            content.render();
            $el.find('.modal-body').html(content.$el);
        }

        if (this.stevecView >= options.content.length - 1) {
            this.prikaziOK();
            this.disableNaprej();
        }
        this.toggleNazaj();
    };
    /**
     * Ko se na viewju triggera nazaj se izvede ta funkcija.
     * Zmanjšamo števec vzamemo pravi view iz contenta
     * renderiramo view
     * @returns {undefined}
     */
    WizardView.prototype.onNazaj = function () {
        var $el = this.$el;
        var options = this.options;
        this.stevecView--;
        var content = options.content[this.stevecView];

        if (content.$el) {
            content.render();
            $el.find('.modal-body').html(content.$el);
        }

        if (this.stevecView < options.content.length - 1) {
            this.skrijOK();
            this.enableNaprej();
        }

        this.toggleNazaj();
    };
    /**
     * Prikaži gumbe Wizardviewja(Modala)
     * @returns {undefined}
     */
    WizardView.prototype.prikaziOK = function () {
        this.$('.ok').removeClass('hidden');
    };
    /**
     * Skrij gumbe Wizardviewja(Modala)
     * @returns {undefined}
     */
    WizardView.prototype.skrijOK = function () {
        this.$('.ok').addClass('hidden');
    };
    
    WizardView.prototype.toggleNazaj = function () {
        if (this.stevecView === 0) {
            this.$('.nazaj').addClass('hidden');
        } else {
            this.$('.nazaj').removeClass('hidden');
        }
    };
    WizardView.prototype.disableNaprej = function () {
        this.$('.naprej').prop('disabled', true);
        this.$('.naprej').attr('disabled', 'disabled');
    };
    
    WizardView.prototype.enableNaprej = function () {
        this.$('.naprej').prop('disabled', false);
        this.$('.naprej').removeAttr('disabled');
    };
    return WizardView;
});
