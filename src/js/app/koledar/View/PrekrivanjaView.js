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

    var TestView = Marionette.ItemView.extend({
        template: Handlebars.compile('Prekrivanja ne obstajajo.')
    });
    
    var PrekrivanjaView = SelectVzporedniceView.extend({
        emptyView: TestView,
        className: 'prekrivanje-panel'
    });

    PrekrivanjaView.prototype.onChildviewSelected = function (child) {
        window.open('#pro/uprizoritev/' + child.model.get('id'));
    };

    PrekrivanjaView.prototype.childViewOptions = function (model, index) {
        var modeli = model.get('konfliktneFunkcije');
        var coll = new Backbone.Collection(modeli);
        return{
            collection: coll,
            template: Handlebars.compile('{{label}}<ul class="funkcije"></ul>')
        };
    };

    return PrekrivanjaView;
});