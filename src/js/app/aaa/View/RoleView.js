
/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/Model/Dokument',
    './RelationView',
    'underscore',
    'app/seznami/View/SeznamView',
    'template!../tpl/perm-form.tpl',
    'template!../tpl/role.tpl',
    'formSchema!role',
    'i18next',
    'baseUrl'
], function (
        Dokument,
        RelationView,
        _,
        SeznamView,
        formTpl,
        roleTpl,
        schema,
        i18next,
        baseUrl
        ) {

    var RoleModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/role'
    });

    var RoleView = SeznamView.extend({
        url: baseUrl + '/rest/role',
        title: i18next.t('role.title'),
        schema: schema,
        formTemplate: formTpl,
        template: roleTpl,
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela',
            toolbarR: '.seznam-toolbar',
            permsR: '.seznam-perms',
            usersR: '.seznam-users',
            prilogeR: '.seznam-priloge'
        },
        dodaj: i18next.t('role.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('role.naziv'),
                name: 'name',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('role.builtIn'),
                name: 'builtIn',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('brisi')}
                ]
            }
        ]
    });

    RoleView.prototype.getTitle = function (model) {
        var text = i18next.t("role.nova");

        if (model.get('id')) {
            text = model.get('name') || i18next.t("xx.Dovoljenje");
        }
        return text;
    };

    RoleView.prototype.onDodaj = function () {
        var model = new RoleModel();
        this.onUredi(model);
    };

    /**
     * Kaj se zgodi, ko izberemo model v tabeli 
     * @param {type} model
     * @returns {undefined}
     */
    RoleView.prototype.onSelected = function (model) {

        SeznamView.prototype.onSelected.apply(this, arguments);
        if (model.get('id')) {
            this.renderVloge(model);
            this.renderUporabniki(model);
        }
    };
    
    RoleView.prototype.saveSuccess = function (model) {

        SeznamView.prototype.saveSuccess.apply(this, arguments);
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

        SeznamView.prototype.preklici.apply(this, arguments);
        this.usersR.empty();
        this.permsR.empty();
    };


    RoleView.prototype.renderVloge = function (model) {

        var rv = new RelationView({
            owner: 'role',
            ownerId: model.get('id'),
            relation: 'permissions',
            lookup: 'permission',
            title: i18next.t("permission.title")
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
            title: i18next.t("user.title")
        });
        this.usersR.show(rv);
    };


    return RoleView;
});