/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/SeznamView',
    'template!../tpl/tipPopa-form.tpl',
    'formSchema!tipPopa?filter=1',
    'formSchema!tipPopa',
    '../Model/TipPopa',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        formTpl,
        filterSch,
        schema,
        TipPopa,
        i18next,
        baseUrl
        ) {

    var TipPopaView = SeznamView.extend({
        url: baseUrl + '/rest/tipPopa',
        title: i18next.t('tipPopa.title'),
        zapirajFormo: true,
        skrivajTabelo: true,
        filterSchema: filterSch,
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tipPopa.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tipPopa.ime'),
                name: 'ime',
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

    TipPopaView.prototype.getTitle = function (model) {
        var text = i18next.t("tipPopa.nova");

        if (model.get('id')) {
            text = model.get('ime') || "naziv";
        }
        return text;
    };

    TipPopaView.prototype.onDodaj = function () {
        var model = new TipPopa.Model();
        this.onUredi(model);
    };

    return TipPopaView;
});