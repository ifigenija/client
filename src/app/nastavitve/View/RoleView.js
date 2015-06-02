
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
        title: i18next.t('admin.role.title'),
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
        dodaj: i18next.t('admin.role.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.name'),
                name: 'name',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.description'),
                name: 'description',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('entiteta.builtin'),
                name: 'builtIn',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('admin.brisi')}
                ]
            }
        ]
    });

    RoleView.prototype.getTitle = function (model) {
        var text = i18next.t("admin.role.nova");

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
        if (model.get('id')) {
            this.renderVloge(model);
            this.renderUporabniki(model);
        }
    };
    
    RoleView.prototype.saveSuccess = function (model) {

        SeznamiView.prototype.saveSuccess.apply(this, arguments);
        if (model.get('id')) {
            this.renderVloge(model);
            this.renderUporabniki(model);
        }
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
            lookup: 'permission',
            title: i18next.t("admin.permission.title")
        });
        this.permsR.show(rv);
    };



    RoleView.prototype.renderUporabniki = function (model) {

        var rv = new RelationView({
            owner: 'role',
            ownerId: model.get('id'),
            relation: 'users',
            lookup: 'user',
            type: 'lookup',
            title: i18next.t("admin.user.title")
        });
        this.usersR.show(rv);
    };


    return RoleView;
});