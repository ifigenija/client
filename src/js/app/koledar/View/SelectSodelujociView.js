/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette
        ) {

    var OsebaView = Marionette.ItemView.extend({
        className: 'sodelujoci-oseba',
        template: '',
        triggers:{
            'click' : 'selected'
        }
    });
    
    var FunkcijaView = Marionette.CompositeView.extend({
        className: 'sodelujoci-funkcija',
        template: '',
        childView: OsebaView,
        onChildviewSelected: function(item){
            //dodaj attribute selected
            this.trigger('selected');
        }
    });

    var FunkcijeView = Marionette.CompositeView.extend({
        className: 'sodelujoci-funkcije',
        template: '',
        childView: FunkcijaView,
        onChildviewSelected: function(item){
            this.trigger('selected');
        }
    });
    
    var UprizoritevView = Marionette.CompositeView.extend({
        className: 'sodelujoci-uprizoritev',
        template: '',
        childView: FunkcijeView
    });
    
    var SelectSodelujociView = Marionette.CompositeView.extend({
        className: 'sodelujoci-upritve',
        template: '',
        childView: UprizoritevView
    });

    return SelectSodelujociView;
});