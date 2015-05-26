
/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/Model/Dokument',
    './RelationView',
    'underscore',
    'app/seznami/View/SeznamiView',
    'template!../tpl/perm-form.tpl',
    'template!../tpl/perm.tpl',
    'formSchema!permission',
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

    var PermissionModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/permission'
    });

    var PermissionView = SeznamiView.extend({
        url: baseUrl + '/rest/permission',
        title: i18next.t('admin.view.permission.title'),
        schema: schema,
        formTemplate: formTpl,
        template: permTpl,
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela',
            toolbarR: '.seznam-toolbar',
            naslovR: '.seznam-naslov',
            relationR: '.seznam-relation'
        },
        dodaj: i18next.t('admin.view.permission.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('admin.view.name'),
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

    PermissionView.prototype.getTitle = function (model) {
        var text = i18next.t("admin.view.permission.nova");

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

        SeznamiView.prototype.onSelected.apply(this, arguments);
        if (model.get('id')) {
            this.renderVloge(model);
        }
    };


    PermissionView.prototype.renderVloge = function (model) {

        var rv = new RelationView({
            owner: 'permission',
            ownerId: model.get('id'),
            relation: 'roles',
            lookup: 'role'
        });
        this.relationR.show(rv);
    };


    return PermissionView;
});