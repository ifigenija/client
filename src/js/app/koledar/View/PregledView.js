/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'marionette',
    'app/Max/View/Toolbar',
    './KoledarView',
    'template!../tpl/planiranje.tpl'
], function (
        i18next,
        Marionette,
        Toolbar,
        KoledarView,
        tpl
        ) {

    var PregledView = Marionette.LayoutView.extend({
        template: tpl,
        title: i18next.t('koledar.pregled'),
        regions: {
            toolbarR: '.planiranje-region-toolbar',
            contentR: '.planiranje-region-content',
            koledarR: '.planiranje-region-koledar'
        },
        buttons: {
            dodaj: {
                id: 'planiranje-dodaj',
                label: i18next.t('std.dodaj'),
                element: 'button-trigger',
                trigger: 'dodaj'
            },
            natisni: {
                id: 'planer-natisni',
                label: i18next.t('std.tiskanje'),
                element: 'button-trigger',
                trigger: 'natisni'
            }
        }
    });

    /**
     * Funkcija, ki je namenjena za to jo overridamo in
     * zgradimo seznam gimbov za toolbar
     *
     * @returns {Array}
     */
    PregledView.prototype.prepareToolbar = function () {
        return [Object.keys(this.buttons).map(function (key) {
                return this.buttons[key];
            }, this)];
    };

    PregledView.prototype.serializeData = function () {
        return{
            title: this.title
        };
    };

    PregledView.prototype.initialize = function (options) {
        this.template = options.template || this.template;
        this.title = options.title || this.title;
        this.buttons = options.buttons || this.buttons;
        this.collection = options.collection || this.collection;
        this.KoledarView = options.KoledarView || this.KoledarView || KoledarView;
    };

    PregledView.prototype.onRender = function () {
        this.renderKoledar();
        this.renderToolbar();
    };

    /**
     * Izris toolbara.
     * V primeru da želimo svoj toolbar
     * @returns {undefined}
     */
    PregledView.prototype.renderToolbar = function () {
        var groups = this.prepareToolbar();

        var toolbarView = new Toolbar({
            buttonGroups: groups,
            listener: this
        });

        this.toolbarR.show(toolbarView);
        return toolbarView;
    };

    /**
     * Funkcijo je potrebno overridat
     * @returns {undefined}
     */
    PregledView.prototype.renderKoledar = function () {
        var view = this.koledarView = new this.KoledarView({
            collection: this.collection
        });

        view.on('uredi:event', this.urediEvent, this);
        view.on('dodaj:event', this.dodajEvent, this);

        this.koledarR.show(view);
    };

    /**
     * Vhodni parameter model je razredDogodka
     * @param {type} model
     * @returns {undefined}
     */
    PregledView.prototype.onUredi = function (model) {
    };

    PregledView.prototype.onNatisni = function () {

    };

    return PregledView;
});
