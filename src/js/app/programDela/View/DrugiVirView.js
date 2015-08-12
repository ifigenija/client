/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/drugiVir-form.tpl',
    'formSchema!DrugiVir',
    'radio'
], function (
        Backgrid,
        i18next,
        PostavkeView,
        formTpl,
        schema,
        Radio
        ) {
    
    var DrugiVirView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'drugiViri',
        formTitle: i18next.t('drugiVir.title'),
        disabled: false,
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('drugiVir.opis'),
                name: 'opis',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('drugiVir.znesek'),
                name: 'znesek',
                total: 'sum',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('drugiVir.mednarodni'),
                name: 'mednarodni',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')}
                ]
            }
        ]
    });

    DrugiVirView.prototype.onGridAction = function (model, action) {
        if (!this.disabled) {
            this.triggerMethod(action, model);
        }
        else {
            Radio.channel('error').command('flash', {
                message: i18next.t("info.shraniEnotoPrograma"),
                code: '9000600',
                severity: 'info'
            });
        }
    };
    
    DrugiVirView.prototype.onDodaj = function () {
        if (!this.disabled) {
            PostavkeView.prototype.onDodaj.apply(this, arguments);
        } else {
            Radio.channel('error').command('flash', {
                message: i18next.t("info.shraniEnotoPrograma"),
                code: '9000600',
                severity: 'info'
            });
        }
    };

    return DrugiVirView;
});