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
    'template!../tpl/sodelujoci.tpl',
    '../../filter/View/DualListView'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Handlebars,
        Marionette,
        sodelujociTpl,
        DualListView
        ) {

    var ListItemView = Marionette.ItemView.extend({
        classname: 'sodelujoci-listviewitem',
        template: Handlebars.compile('<label>{{label}}</label>')
    });

    var ListView = Marionette.CollectionView.extend({
        className: 'sodelujoci-listview',
        childView: ListItemView
    });

    var SodelujociView = Marionette.LayoutView.extend({
        template: sodelujociTpl,
        regions: {
            listR: '.region-list'
        },
        triggers: {
            'click .sodelujoci-uredi': 'uredi',
            'click .sodelujoci-podrobno': 'podrobno'
        }
    });

    SodelujociView.prototype.initialize = function (options) {
        this.collection = options.collection || new Backbone.Collection();
    };

    SodelujociView.prototype.onRender = function () {
        this.renderList();
    };

    SodelujociView.prototype.onUredi = function () {
        console.log('uredi');
    };

    SodelujociView.prototype.onPodrobno = function () {
        console.log('podobno');
    };

    SodelujociView.prototype.renderList = function () {
        var listView = new ListView({
            collection: this.collection
        });

        this.listR.show(listView);
    };

    return SodelujociView;
});