/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'template!../tpl/izbira-upr.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        tpl
        ) {
    var IzbriraUprizoritveView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            uprizoritevR: '.region-uprizoritev',
            vzporedniceR: '.region-vzporednice',
            osebeR: '.region-osebe'
        }
    });

    IzbriraUprizoritveView.prototype.render = function (options) {
        if (options && options.wizardModel) {
            this.wizardModel = options.wizarfModel || new Backbone.Model();
        }
    };

    IzbriraUprizoritveView.prototype.onRender = function (options) {
        this.renderUprizoritev();
        this.renderVzporednice();
        this.renderOsebe();
    };
    IzbriraUprizoritveView.prototype.renderUprizoritev = function () {
        this.uprizoritevR.show();
    };
    IzbriraUprizoritveView.prototype.renderVzporednice = function () {
        this.vzporedniceR.show();
    };
    IzbriraUprizoritveView.prototype.renderOsebe = function () {
        this.osebeR.show();
    };
    
    IzbriraUprizoritveView.prototype.onSelected = function () {
        this.osebeR.show();
    };
    IzbriraUprizoritveView.prototype.onChange = function () {
        this.osebeR.show();
    };

    return IzbriraUprizoritveView;
});