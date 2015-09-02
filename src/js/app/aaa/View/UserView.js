/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/user-form.tpl',
    'template!../tpl/user.tpl',
    './RelationView',
    'formSchema!user',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid',
    'app/Dokument/Model/Dokument'
], function (
        SeznamView,
        formTpl,
        userTpl,
        RelationView,
        schema,
        i18next,
        baseUrl,
        Backgrid,
        Dokument
        ) {
    
    var UserModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/user'
    });

    var UserView = SeznamView.extend({
        url: baseUrl + '/rest/user',
        formTemplate: formTpl,
        template: userTpl,
        schema: schema,
        odprtaForma: true,
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela',
            toolbarR: '.seznam-toolbar',
            rolesR: '.seznam-roles',
            prilogeR: '.seznam-priloge'
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
                headerCell: 'number',
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
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });

    UserView.prototype.onDodaj = function () {
        var model = new UserModel();
        this.onSelected(model);
    };

    UserView.prototype.getTitle = function (model) {
        var text = i18next.t("user.nova");

        if (model.get('id')) {
            text = model.get('name') || i18next.t("xx.Dovoljenje");
        }
        return text;
    };
    
    UserView.prototype.onRenderForm = function () {
        this.formView.form.on('password:change', this.onPasswordChange, this);
    };

    UserView.prototype.onPasswordChange = function (form, editor) {
        var text = editor.getValue();
        var geslo = form.fields.password;
        
        if(text.length > 0 && text.length < 8){
            geslo.setError(i18next.t("napaka.gesloKratko"));
        }else if(text.length >= 8){
            geslo.clearError();
            var maliText = text.toLowerCase();
            var velikiText = text.toUpperCase();
            
            var pogoji = 0;
            if(text !== maliText){
                pogoji++;
            }
            if(text !== velikiText){
                pogoji++;
            }
            if(text.match(/\d/)){
                pogoji++;
            }
            if(text.match(/\W/)){
                pogoji++;
            }
            
            if(pogoji < 3){
                geslo.setError(i18next.t("napaka.gesloSibko"));
            }else{
                geslo.clearError();
            }
        }else{
            geslo.clearError();
        }
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