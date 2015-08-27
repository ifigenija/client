/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/peSklopa-form.tpl',
    'formSchema!programskaEnotaSklopa',
    'radio'
], function (
        Backgrid,
        i18next,
        PostavkeView,
        formTpl,
        schema,
        Radio
        ) {
    
    var PESklopaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'programskeEnoteSklopa',
        formTitle: i18next.t('peSklopa.title'),
        disabled: false,
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('peSklopa.naslovPE'),
                name: 'naslovPE',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('peSklopa.avtorPE'),
                name: 'avtorPE',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('peSklopa.obsegPE'),
                name: 'obsegPE',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('peSklopa.mesecPE'),
                name: 'mesecPE',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('peSklopa.vrednostPE'),
                name: 'vrednostPE',
                total: 'sum',
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
    
    PESklopaView.prototype.onGridAction = function (model, action) {
        if (!this.disabled) {
            PostavkeView.prototype.onGridAction.apply(this, arguments);
        }
        else {
            Radio.channel('error').command('flash', {
                message: i18next.t("info.shraniEnotoPrograma"),
                code: '9000600',
                severity: 'info'
            });
        }
    };
    
    PESklopaView.prototype.onDodaj = function () {
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
    return PESklopaView;
});