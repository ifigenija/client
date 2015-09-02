/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/telefonska-form.tpl',
    'formSchema!telefonska',
    'i18next',
    'radio'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next,
        Radio
        ) {

    var TelefonskaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'telefonske',
        formTitle: i18next.t('tel.title'),
        disabled: false,
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tel.vrsta'),
                name: 'vrsta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tel.stevilka'),
                name: 'stevilka',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tel.privzeta'),
                name: 'privzeta',
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
    
    TelefonskaView.prototype.initialize = function(options){
        this.disabled = options.disabled || this.disabled;
    };
    
    TelefonskaView.prototype.onDodaj = function () {
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

    return TelefonskaView;
});