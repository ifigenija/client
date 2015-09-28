/*
 * Licenca GPLv3
 */


define(['marionette', 'radio', 'moment', 'underscore', 'jquery',
    'app/Max/View/PaginatorControl',
    'app/Max/View/FilterView',
    'formSchema!dogodek/default?filter=!',
    'template!../tpl/basic-filter.tpl'

], function (Marionette, Radio, moment, _, $,
             PaginatorControl,
             FilterView,
             filterSchema,
             tpl
) {

    return Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            listR: '.region-list',
            formR: '.region-form',
            paginatorR: '.region-paginator'
        },
        initialize: function (options) {
            this.form = new FilterView({
                schema: _.omit(filterSchema.toFormSchema().schema, "zacetek", "konec"),
                buttons: [[
                    {
                        id: 'search',
                        element: 'button-trigger',
                        icon: 'fa fa-search',
                        label: 'Išči',
                        class: 'btn-primary',
                        trigger: 'sprozi:iskanje'
                    },
                    {
                        id: 'listi',
                        element: 'button-trigger',
                        icon: 'fa fa-print',
                        label: 'Delovni listi',
                        class: 'btn-primary',
                        trigger: 'delovni:listi'
                    }
                ]]
            });
            this.listenTo(this.form, 'filter', function (data) {
                this.triggerMethod('filter', data);
            });
        },
        onRender: function () {
            this.formR.show(this.form);

        }
    });
});