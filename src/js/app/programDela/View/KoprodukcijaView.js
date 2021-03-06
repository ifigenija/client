/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/koprodukcija-form.tpl',
    'formSchema!produkcijaDelitev',
    'radio',
    'jquery',
    'jquery.jsonrpc'
], function (
        Backgrid,
        i18next,
        PostavkeView,
        formTpl,
        schema,
        Radio,
        $
        ) {

    var KoprodukcijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'koprodukcije',
        formTitle: i18next.t('prodel.title'),
        disabled: false,
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('prodel.koproducent'),
                name: 'naziv',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.delez'),
                name: 'delez',
                total: 'sum',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });

    KoprodukcijaView.prototype.onGridAction = function (model, action) {
        if (!this.disabled) {
            if (!model.get('maticniKop')) {
                PostavkeView.prototype.onGridAction.apply(this, arguments);
            } else {
                Radio.channel('error').command('flash', {
                    message: i18next.t("info.maticniJZ"),
                    code: '9000600',
                    severity: 'info'
                });
            }
        }
        else {
            Radio.channel('error').command('flash', {
                message: i18next.t("info.shraniEnotoPrograma"),
                code: '9000600',
                severity: 'info'
            });
        }
    };

    KoprodukcijaView.prototype.onDodaj = function () {
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

    return KoprodukcijaView;
});