
/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/Model/Dokument',
    './RelationView',
    'underscore',
    'app/seznami/View/SeznamView',
    'template!../tpl/perm-form.tpl',
    'template!../tpl/perm.tpl',
    'formSchema!permission',
    'i18next',
    'baseUrl'
], function (
        Dokument,
        RelationView,
        _,
        SeznamView,
        formTpl,
        permTpl,
        schema,
        i18next,
        baseUrl
        ) {

    var PermissionModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/permission'
    });

    var PermissionView = SeznamView.extend({
        url: baseUrl + '/rest/permission',
        title: i18next.t('permission.title'),
        schema: schema,
        formTemplate: formTpl,
        template: permTpl,
        odprtaForma: true,
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela',
            toolbarR: '.seznam-toolbar',
            rolesR: '.seznam-roles',
            prilogeR: '.seznam-priloge'
        },
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('permission.naziv'),
                name: 'name',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('permission.opis'),
                name: 'description',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('permission.builtIn'),
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

    PermissionView.prototype.getTitle = function (model) {
        var text = i18next.t("permission.nova");

        if (model.get('id')) {
            text = model.get('name') || i18next.t("xx.Dovoljenje");
        }
        return text;
    };

    PermissionView.prototype.onDodaj = function () {
        var model = new PermissionModel();
        this.onSelected(model);
    };

    /**
     * Kaj se zgodi, ko izberemo model v tabeli 
     * @param {type} model
     * @returns {undefined}
     */
    PermissionView.prototype.onSelected = function (model) {

        SeznamView.prototype.onSelected.apply(this, arguments);
        if (model.get('id')) {
            this.renderVloge(model);
        }
    };


    PermissionView.prototype.saveSuccess = function (model) {

        SeznamView.prototype.saveSuccess.apply(this, arguments);
        if (model.get('id')) {
            this.renderVloge(model);
        }
    };

    /**
     * Kaj se zgodi, ko prekličemo vnos/pogled
     * @param {type} model
     * @returns {undefined}
     */
    PermissionView.prototype.preklici = function (model) {

        SeznamView.prototype.preklici.apply(this, arguments);
        this.rolesR.empty();
    };

    PermissionView.prototype.renderVloge = function (model) {

        var rv = new RelationView({
            owner: 'permission',
            ownerId: model.get('id'),
            relation: 'roles',
            lookup: 'role',
            title: i18next.t("role.title")
        });
        this.rolesR.show(rv);
    };

    return PermissionView;
});