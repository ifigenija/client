/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/postniNaslov-form.tpl',
    'formSchema!postniNaslov',
    'i18next',
    'radio'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next,
        Radio
        ) {

    var chPermission = Radio.channel('global');
    var dovoljeno = chPermission.request('isGranted', "PostniNaslov-write");

    var actionsWrite = [
        {event: 'uredi', title: i18next.t('std.uredi')},
        {event: 'brisi', title: i18next.t('std.brisi')}
    ];

    var actionsRead = [
        {event: 'uredi', title: i18next.t('std.uredi')}
    ];

    var actions;

    if (dovoljeno) {
        actions = actionsWrite;
    } else {
        actions = actionsRead;
    }

    var PostniNaslovView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'naslovi',
        formTitle: i18next.t('postniNaslov.title'),
        disabled: false,
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postniNaslov.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postniNaslov.ulica'),
                name: 'ulica',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postniNaslov.posta'),
                name: 'posta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postniNaslov.postaNaziv'),
                name: 'postaNaziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postniNaslov.drzava'),
                name: 'drzava.label',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: actions
            }
        ]
    });
    var chPermission = Radio.channel('global');
    var dovoljeno = chPermission.request('isGranted', "PostniNaslov-write");

    PostniNaslovView.prototype.prepareToolbar = function () {
        if (dovoljeno) {
            return  this.model ?
                    [[this.buttons.shrani, this.buttons.preklici, this.buttons.nasvet]] : [[this.buttons.dodaj]];
        } else {
            return this.model ?
                    [[this.buttons.preklici, this.buttons.nasvet]] : [[]];
        }
    };

    PostniNaslovView.prototype.onRenderForm = function () {
        if (!dovoljeno) {
            this.$('input').prop("disabled", true);
            this.$('select').prop("disabled", true);
        }
    };
    
    PostniNaslovView.prototype.initialize = function(options){
        this.disabled = options.disabled || this.disabled;
    };
    
    PostniNaslovView.prototype.onDodaj = function () {
        if (!this.disabled) {
            PostavkeView.prototype.onDodaj.apply(this, arguments);
        } else {
            Radio.channel('error').command('flash', {
                message: i18next.t("info.shraniEnotoPrograma"),
                code: '9000600',
                severity: 'info'
            });
        }
    };

    return PostniNaslovView;
});