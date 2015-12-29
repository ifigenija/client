/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'underscore',
    'marionette',
    './SelectVzporedniceView'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        SelectVzporedniceView
        ) {

    var tpl = '<a href="{{href}}" target="_blank">{{besedilo.label}}</a>';

    var EmptyView = Marionette.ItemView.extend({
        template: Handlebars.compile('<div>Prekrivanje ne obstaja.</div>')
    });
    
    var PrekrivanjaView = SelectVzporedniceView.extend({
        emptyView: EmptyView
    });

    PrekrivanjaView.prototype.onChildviewSelected = function () {
    };

    PrekrivanjaView.prototype.childViewOptions = function (model, index) {
        var modeli = model.get('konfliktneFunkcije');
        var coll = new Backbone.Collection(modeli);
        return{
            collection: coll,
            template: Handlebars.compile('<a href="{{href}}" target="_blank">{{besedilo.label}}</a><ul class="funkcije"></ul>')
        };
    };

    return PrekrivanjaView;
});