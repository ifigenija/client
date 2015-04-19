define([
    'backbone',
], function (Backbone) {

    var Element = Backbone.Model.extend({
        defaults: {
            id: null,
            element: null,
            label: '',
            uri: 'javascript:void(0)',
            icon: null
        }
    });

    var ElementCollection = Backbone.Collection.extend({
        model: Element
    });

    var ToolbarGroup = Backbone.Model.extend({
        initialize: function (models) {
            this.elements = new ElementCollection(models);
        }
    });

    var Toolbar = Backbone.Collection.extend({
        model: ToolbarGroup,
        getButton: function (id) {
            var found = [];
            this.each(function (group) {
                group.elements.each(function (but) {
                    if (but.id === id) {
                        found.push(but);
                    }
                });
            });

            return found[0];
        }
    });

    return {model: ToolbarGroup, collection: Toolbar, element: Element, elements: ElementCollection};
});