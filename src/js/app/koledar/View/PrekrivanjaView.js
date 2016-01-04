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

    var EmptyView = Marionette.ItemView.extend({
        template: Handlebars.compile('Prekrivanja ne obstajajo.')
    });

    var PrekrivanjaView = SelectVzporedniceView.extend({
        emptyView: EmptyView,
        className: 'panel panel-default prekrivanje-panel',
        initialize: function () {
            SelectVzporedniceView.prototype.initialize.apply(this, arguments);

            this.collection.each(function (uprizoritev) {
                uprizoritev.set('href', '#pro/uprizoritev/' + uprizoritev.get('id'));
            });
        }
    });

    PrekrivanjaView.prototype.onChildviewSelected = function (child) {
        window.open(child.model.get('href'));
    };

    return PrekrivanjaView;
});