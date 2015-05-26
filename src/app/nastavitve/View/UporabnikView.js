/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/uporabnik-form.tpl',
    'template!../tpl/perm.tpl',
    './RelationView',
    '../Model/Uporabnik',
    'formSchema!user',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        formTpl,
        permTpl,
        RelationView,
        Uporabnik,
        schema,
        i18next,
        baseUrl
        ) {

    var UporabnikView = SeznamiView.extend({
        url: baseUrl + '/rest/user',
        formTemplate: formTpl,
        template: permTpl,
        schema: schema,
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela',
            toolbarR: '.seznam-toolbar',
            naslovR: '.seznam-naslov',
            relationR: '.seznam-relation'
        },
        title: i18next.t('seznami.view.uporabnik.title'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.naziv'),
                name: 'name',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.ePosta'),
                name: 'email',
                sortable: false
            },
            {
                cell: 'date',
                editable: false,
                label: i18next.t('seznami.view.uporabnik.veljavnost'),
                name: 'expires',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.uporabnik.privzetaStran'),
                name: 'defaultRoute',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.uporabnik.privzetaStran'),
                name: 'defaultRoute',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.view.uredi')},
                ]
            }
        ],
        onDodaj: function () {
            var model = new Uporabnik.Model();
            this.onSelected(model);
        }
    });


    /**
     * Kaj se zgodi, ko izberemo model v tabeli 
     * @param {type} model
     * @returns {undefined}
     */
    UporabnikView.prototype.onSelected = function (model) {

        SeznamiView.prototype.onSelected.apply(this, arguments);
        if (model.get('id')) {
            this.renderVloge(model);
        }
    };


    UporabnikView.prototype.renderVloge = function (model) {

        var rv = new RelationView({
            owner: 'user',
            ownerId: model.get('id'),
            relation: 'roles',
            lookup: 'role'
        });
        this.relationR.show(rv);
    };


    return UporabnikView;
});