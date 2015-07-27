/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/user-form.tpl',
    'template!../tpl/user.tpl',
    './RelationView',
    '../Model/User',
    'formSchema!user',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid'
], function (
        SeznamView,
        formTpl,
        permTpl,
        RelationView,
        User,
        schema,
        i18next,
        baseUrl,
        Backgrid
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

    var UserView = SeznamView.extend({
        url: baseUrl + '/rest/user',
        formTemplate: formTpl,
        template: permTpl,
        schema: schema,
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela',
            toolbarR: '.seznam-toolbar',
            rolesR: '.seznam-roles'
        },
        title: i18next.t('user.title'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('user.name'),
                name: 'name',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('user.email'),
                name: 'email',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'date',
                editable: false,
                label: i18next.t('user.expires'),
                name: 'expires',
                sortable: false
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('user.enabled'),
                name: 'enabled',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });

    UserView.prototype.onDodaj = function () {
        var model = new User.Model();
        this.onSelected(model);
    };

    UserView.prototype.getTitle = function (model) {
        var text = i18next.t("user.nova");

        if (model.get('id')) {
            text = model.get('name') || i18next.t("xx.Dovoljenje");
        }
        return text;
    };


    /**
     * Kaj se zgodi, ko izberemo model v tabeli 
     * @param {type} model
     * @returns {undefined}
     */
    UserView.prototype.onSelected = function (model) {

        SeznamView.prototype.onSelected.apply(this, arguments);
        if (model.get('id')) {
            this.renderVloge(model);
        }
    };

    UserView.prototype.saveSuccess = function (model) {

        SeznamView.prototype.saveSuccess.apply(this, arguments);
        if (model.get('id')) {
            this.renderVloge(model);
        }
    };

    UserView.prototype.preklici = function (model) {

        SeznamView.prototype.preklici.apply(this, arguments);
        this.rolesR.empty();
    };



    UserView.prototype.renderVloge = function (model) {

        var rv = new RelationView({
            owner: 'user',
            ownerId: model.get('id'),
            relation: 'roles',
            lookup: 'role',
            title: i18next.t("role.title")
        });
        this.rolesR.show(rv);
    };


    return UserView;
});