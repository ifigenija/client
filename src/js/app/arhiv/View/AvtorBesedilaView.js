/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/avtorBesedila-form.tpl',
    'formSchema!avtorBesedila',
    'i18next',
    'app/seznami/Model/Oseba',
    'app/seznami/View/OsebaModal',
    'backgrid'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next,
        OsebaModel,
        OsebaModal,
        Backgrid
        ) {

    var AvtorBesedilaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'avtorji',
        dodaj: i18next.t('dodaj'),
        formTitle: i18next.t('avtorBesedila.title'),
        triggers: {
            'click .dodaj-osebo': 'dodajOsebo'
        },
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('avtorBesedila.t.zaporedna'),
                name: 'zaporedna',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('avtorBesedila.oseba'),
                name: 'oseba.label',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('tipAvtorja')
                }),
                editable: false,
                label: i18next.t('avtorBesedila.tipAvtorja'),
                name: 'tipAvtorja',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('avtorBesedila.aliVNaslovu'),
                name: 'aliVNaslovu',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'premakniGor', title: i18next.t('std.premakniGor')},
                    {event: 'premakniDol', title: i18next.t('std.premakniDol')},
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });

    AvtorBesedilaView.prototype.onDodajOsebo = function () {
        var model = new OsebaModel.Model();
        
        var editor = this.form.fields.oseba.editor;

        var modal = OsebaModal({
            model: model,
            editor: editor,
            title: i18next.t('oseba.nova')
        });
    };

    return AvtorBesedilaView;
});