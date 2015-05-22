/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './UmetniskaEkipaEditView',
    '../../Model/Funkcija',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        UmetniskaEkipaEditView,
        UmetniskaEkipa,
        i18next,
        baseUrl
        ) {

    var FunkcijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: '',
        detailName: '',
        dodaj: i18next.t('produkcija.view.funkcija.dodaj'),
        formTitle: i18next.t('produkcija.view.funkcija.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.funkcija.podrocje'),
                name: 'podrocje',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.funkcija.naziv'),
                name: 'naziv',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.funkcija.velikost'),
                name: 'velikost',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.funkcija.pomembna'),
                name: 'pomembna',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.view.uredi')}
                ]
            }
        ]
    });

    UmetniskaEkipaView.prototype.getFormView = function (model) {
        return this.ObstojecVnos(model);
    };
    UmetniskaEkipaView.prototype.onDodaj = function () {
        var model = new UmetniskaEkipa.Model();
        var view = new UmetniskaEkipaEditView({model: model});
        this.listenTo(view, "save:success", this.dodajVcollection);
        this.formR.show(view);
    };

    UmetniskaEkipaView.prototype.ObstojecVnos = function (model) {
        var editModel = new UmetniskaEkipa.Model({id: model.get('id')});
        editModel.fetch();

        return new UmetniskaEkipaEditView(
                {
                    model: editModel,
                    pogled: this.options.pogled
                });
    };

    UmetniskaEkipaView.prototype.dodajVcollection = function (model) {
        this.collection.fetch();
        return this.ObstojecVnos(model);
    };

    return UmetniskaEkipaView;
});
