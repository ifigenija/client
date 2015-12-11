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


    var WizardView = Modal.extend({
        className: 'wizard-modal modal'
    });
    WizardView.prototype.initialize = function (options) {
        Modal.prototype.initialize.apply(this, arguments);
        if (!_.isArray(options.content)) {
            throw new 'Content naj bo array';
        } else {
            for (var id in options.content) {
                var view = options.content[id];
                view.on('naprej', this.onNaprej, this);
                view.on('nazaj', this.onNazaj, this);
            }
            
            this.zacetek = options.zacetek || this.zacetek;
            this.konec = options.konec || this.konec;
            this.title = options.title || i18next.t('std.naslov');
        }
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
            this.skrijGumbe();
        }

        if (this.stevecView === 0) {
            content.$('.nazaj').addClass('hidden');
        }

        this.isRendered = true;

        return this;
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
            this.prikaziGumbe();
            content.$('.naprej').addClass('hidden');
        }
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
            this.skrijGumbe();
            content.$('.naprej').removeClass('hidden');
        }

        if (this.stevecView === 0) {
            content.$('.nazaj').addClass('hidden');
        } else {
            content.$('.nazaj').removeClass('hidden');
        }
    };
    /**
     * Prikaži gumbe Wizardviewja(Modala)
     * @returns {undefined}
     */
    WizardView.prototype.prikaziGumbe = function () {
        this.$('.ok').removeClass('hidden');
        this.$('.cancel').removeClass('hidden');
    };
    /**
     * Skrij gumbe Wizardviewja(Modala)
     * @returns {undefined}
     */
    WizardView.prototype.skrijGumbe = function () {
        this.$('.ok').addClass('hidden');
        this.$('.cancel').addClass('hidden');
    };
    return WizardView;
});
