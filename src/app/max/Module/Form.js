/**
 * Include this template file after backbone-forms.amd.js to override the default templates
 *
 * 'data-*' attributes control where elements are placed
 */
define([
    'marionette',
    'underscore',
    'backbone-forms',
    'moment',
    'app/Max/Editor/LookupSelectEditor',
    'app/Max/Editor/ToOneEditor',
    'app/Max/Editor/DatePicker',
    'app/Max/Editor/Daterange',
    'app/Max/Editor/Cena',
    'app/Max/Editor/Hidden',
    'app/Max/Editor/NumberEditor',
    'app/Max/Editor/Text',
    'app/Max/Editor/TextArea'
], function (
        Marionette,
        _,
        F,
        moment,
        LookupSelectEditor,
        TooneEditor,
        DatePicker,
        Daterange,
        Cena,
        Hidden,
        NumberEditor,
        Text,
        TextArea
        ) {
    
    
    
    var Form = F;
   
   

    /**
     * Bootstrap templates for Backbone Forms
     */
    Form.template = _.template('<form class=""><div data-fieldsets></div></form>');


    Form.Fieldset.template = _.template('<fieldset data-fields> \
   <% if (legend && legend !== "undefined") { %> \
     <legend> <%= legend %> </legend>\
   <% } %> \
    </fieldset>');


    Form.Field.template = _.template('\
    <div class="form-group field-<%= key %>" <% if (!editorAttrs.prependIcon) { %>  data-editor <% } %>>\
      <label for="<%= editorId %>"><%= title %></label>\
      <% if (editorAttrs.prependIcon) { %>\
         <div class="input-group" data-editor>\
         <span class="input-group-addon"><i class="<%= editorAttrs.prependIcon %>"></i></span>\
         </div>\
      <% }%> \
      <div class="col-xs-12">\
        <div class="pull-right hidden help-block"><%= help %></div>\
        <div class="error-block pull-right" data-error></div>\
      </div>\
    </div>\
  ');
    Form.Field.errorClassName = 'has-error';


    Form.NestedField.template = _.template('\
    <div class="field-<%= key %>">\
      <div title="<%= title %>" class="input-xlarge">\
        <span data-editor></span>\
        <div class="help-inline" data-error></div>\
      </div>\
      <div class="help-block"><%= help %></div>\
    </div>\
  ');


    if (Form.editors.List) {

        Form.editors.List.template = _.template('\
      <div class="bbf-list">\
        <ul class="unstyled clearfix" data-items></ul>\
        <button type="button" class="btn bbf-add" data-action="add">Add</button>\
      </div>\
    ');


        Form.editors.List.Item.template = _.template('\
      <li class="clearfix">\
        <div class="pull-left" data-editor></div>\
        <button type="button" class="btn bbf-del" data-action="remove">&times;</button>\
      </li>\
    ');


        Form.editors.List.Object.template = Form.editors.List.NestedModel.template = _.template('\
      <div class="bbf-list-modal"><%= summary %></div>\
    ');

    }
    
    Form.validators.minNumber = function (options) {
        options = _.extend({
            type: 'minNumber',
            message: 'Vrednost mora biti večja ali enaka ' + options.value
        }, options);
        
        return function (value) {
            if (value < options.value) {
                return options;
            }
        };
    };
    
    Form.validators.maxNumber = function (options) {
        options = _.extend({
            type: 'minNumber',
            message: 'Vrednost mora biti manjša ali enaka ' + options.value
        }, options);
        
        return function (value) {
            if (value < options.value) {
                return options;
            }
        };
    };



    Form.validators.greaterThanZero = function (options) {
        options = _.extend({
            type: 'greaterThanZero',
            message: 'Vrenost mora biti večja od nič'
        }, options);

        return function required(value) {
            options.value = value;

            var err = {
                type: options.type,
                message: _.isFunction(options.message) ? options.message(options) : options.message
            };

            if (isNaN(Number(value)) || Number(value) <= 0) {
                return err;
            }
        };
    };

    var checkDate = function (datum) {
        if (!datum) {
            return true;
        }
        if (!(datum instanceof Date)) {
            datum = Date.parse(datum);
            if (!datum) {
                return false;
            }
        }
        datum = moment(datum);
        var year = datum.year();
        if (year < 1980 || year > 2123) {
            return false;
        }
        return true;
    };
    Form.validators.validDate = function (options) {
        options = _.extend({type: 'validDate',
            message: 'Datum ni veljaven'
        }, options);

        return function valid(value) {
            if (!checkDate(value, options)) {
                return options;
            }
        };
    };

    Form.validators.validDateRange = function (options) {
        options = _.extend({
            type: 'validDateRange',
            message: 'Razpon datumov ni veljaven'
        }, options);

        return function (value) {
            var ok = true;
            _.each(value, function (datum) {
                if (!checkDate(datum)) {
                    ok = false;
                }
            });
            if (moment(value.end) - moment(value.start) < 0) {
                ok = false;
            }
            if (!ok) {
                return options;
            }
        };

    };
    
    Form.validators.validNumber = function (options) {
        options = _.extend({
            type: 'validNumber',
            message: 'Ni veljavno število. Preveri tisočice in decimalke'
        }, options);
        
        return function (value) {
            if (isNaN(value)) {
                return options;
            }
        };
    };

    Form.editors.LookupSelect = LookupSelectEditor;
    Form.editors.Toone = TooneEditor;

    Form.editors.DatePicker = DatePicker;
    Form.editors.Daterange = Daterange;

    Form.editors.Hidden = Hidden;
    Form.editors.Number = NumberEditor;
    Form.editors.Text = Text;
    Form.editors.TextArea = TextArea;
    Form.editors.Cena = Cena;
    return Form;


});
