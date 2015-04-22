/* 
 * Licenca GPLv3
 */

define([
    'marionette',
    'backbone',
    '../../max/Module/Form',
    'app/handlebars',
    'backgrid',
    'text!../tpl/uporabnik.tpl'

], function (
        Marionette,
        Backbone,
        Form,
        Handlebars,
        Backgrid,
        uporabnikTpl
        ) {

    var akcija = Marionette.ItemView.extend({
    });



    var Territory = Backbone.Model.extend({});

    var Territories = Backbone.Collection.extend({
        model: Territory,
        url: "examples/territories.json"
    });

    var territories = new Territories();

    var columns = [{
            name: "id", // The key of the model attribute
            label: "ID", // The name to display in the header
            editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
            // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
            cell: Backgrid.IntegerCell.extend({
                orderSeparator: ''
            })
        }, {
            name: "name",
            label: "Name",
            // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
            cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        }, {
            name: "pop",
            label: "Population",
            cell: "integer" // An integer cell is a number cell that displays humanized integers
        }, {
            name: "percentage",
            label: "% of World Population",
            cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
        }, {
            name: "date",
            label: "Date",
            cell: "date"
        }, {
            name: "url",
            label: "URL",
            cell: "uri" // Renders the value in an HTML anchor element
        }];

// Initialize a new Grid instance
    var grid = new Backgrid.Grid({
        columns: columns,
        collection: territories
    });

    var formTpl = '<form class="form-vertical">\n\
    <div data-fields="name,email,password,expires"></div>\
</form>';
    var UporabnikView = Marionette.LayoutView.extend({
        template: Handlebars.compile(uporabnikTpl),
        regions: {
            'up': "#uporabniski-podatki",
            'privit': "#privilegiji"
        },
        onShow: function () {


            var form = new Form({
                template: Handlebars.compile(formTpl),
                schema: {
                    name: {type: Form.editors.Text, editorAttrs: {}},
                    email: {type: Form.editors.Text, validators: ['required', 'email'], editorAttrs: {}},
                    password: {type: Form.editors.Password, editorAttrs: {}},
                    expires: {type: Form.editors.DatePicker, editorAttrs: {}}
                }
            });


            this.up.show(form);
            this.privit.show(grid);
        }
    });

    return UporabnikView;

});
