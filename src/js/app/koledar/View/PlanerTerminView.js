/* 
 * Licenca GPLv3
 */

define(['marionette',
    'backbone',
    'moment',
    'underscore',
    'jquery',
    'app/Max/Module/Form',
    'template!../tpl/planer-termin.tpl'
], function (Marionette,
        Backbone,
        moment,
        _,
        $,
        Form,
        tplTermin
        ) {

    var handleChangeTeden = function (e, form, datum) {
        form.getEditor('teden').setValue(datum.toISOString());
        setTimeout(function () {
            form.trigger("change");
        });
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    /**
     * 
     * @type @exp;Form@call;extend
     */
    var TerminView = Form.extend({
        template: tplTermin,
        events: {
            'click .nazaj-mesec': "nazajMesec",
            'click .naprej-mesec': "naprejMesec",
            'click .nazaj-teden': "nazajTeden",
            'click .naprej-teden': "naprejTeden"
        },
        schema: {
            teden: {type: 'DatePicker', validators: ['required'], editorAttrs: {class: 'form-control'}}
        },
        naprejMesec: function (e) {
            var v = moment(this.getValue('teden')).add(1, 'month');
            return handleChangeTeden(e, this, v);
        },
        nazajTeden: function (e) {
            var v = moment(this.getValue('teden')).subtract(1, 'week');
            return handleChangeTeden(e, this, v);
        },
        naprejTeden: function (e) {
            var v = moment(this.getValue('teden')).add(1, 'week');
            return handleChangeTeden(e, this, v);
        },
        nazajMesec: function (e) {
            var v = moment(this.getValue('teden')).subtract(1, 'month');
            return handleChangeTeden(e, this, v);
        }
    });

    return TerminView;
});