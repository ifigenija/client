
/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/Model/Dokument',
    './RelationView',
    'underscore',
    'app/seznami/View/SeznamiView',
    'template!../tpl/perm-form.tpl',
    'template!../tpl/role.tpl',
    'formSchema!role',
    'i18next',
    'baseUrl'
], function (
        Dokument,
        RelationView,
        _,
        SeznamiView,
        formTpl,
        permTpl,
        schema,
        i18next,
        baseUrl
        ) {

    var RoleModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/role'
    });

    var RoleView = SeznamiView.extend({
        url: baseUrl + '/rest/role',
        title: i18next.t('admin.view.role.title'),
        schema: schema,
        formTemplate: formTpl,
        template: permTpl,
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela',
            toolbarR: '.seznam-toolbar',
            naslovR: '.seznam-naslov',
            permsR: '.seznam-perms',
            usersR: '.seznam-users'
        },
        dodaj: i18next.t('admin.view.role.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('admin.view.role.name'),
                name: 'name',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('admin.view.description'),
                name: 'description',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('admin.view.builtin'),
                name: 'builtIn',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('admin.view.brisi')}
                ]
            }
        ]
    });

    RoleView.prototype.getTitle = function (model) {
        var text = i18next.t("admin.view.role.nova");

        if (model.get('id')) {
            text = model.get('name') || i18next.t("xx.Dovoljenje");
        }
        return text;
    };

    RoleView.prototype.onDodaj = function () {
        var model = new RoleModel();
        this.onSelected(model);
    };

    /**
     * Kaj se zgodi, ko izberemo model v tabeli 
     * @param {type} model
     * @returns {undefined}
     */
    RoleView.prototype.onSelected = function (model) {

        SeznamiView.prototype.onSelected.apply(this, arguments);
        //if (model.get('id')) {
            this.renderVloge(model);
            this.renderUporabniki(model);
        //}
    };
    
    /**
     * Kaj se zgodi, ko prekličemo vnos/pogled
     * @param {type} model
     * @returns {undefined}
     */
    RoleView.prototype.preklici = function (model) {

        SeznamiView.prototype.preklici.apply(this, arguments);
        this.usersR.empty();
        this.permsR.empty();
    };


    RoleView.prototype.renderVloge = function (model) {

        var rv = new RelationView({
            owner: 'role',
            ownerId: model.get('id'),
            relation: 'permissions',
            lookup: 'permission'
        });
        this.permsR.show(rv);
    };



    RoleView.prototype.renderUporabniki = function (model) {

        var rv = new RelationView({
            owner: 'role',
            ownerId: model.get('id'),
            relation: 'users',
            lookup: 'user'
        });
        this.usersR.show(rv);
    };


    return RoleView;
});