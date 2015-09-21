/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'app/Max/View/Toolbar',
    'app/Dokument/View/SeznamView',
    'formSchema!stevilcenjekonfig',
    'formSchema!stevilcenjekonfig?filter=1',
    'i18next',
    'radio',
    'baseUrl'
], function (
        Backgrid,
        Toolbar,
        SeznamView,
        schema,
        filterSchema,
        i18next,
        Radio,
        baseUrl
        ) {

    var Stevilcenje = SeznamView.extend({
        url: baseUrl + '/rest/stevilcenjekonfig',
        title: i18next.t('stevilcenje.konfigTitle'),
        schema: schema,
        filterSchema: filterSchema,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenje.zaDokument'),
                name: 'dok',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('stevilcenje')
                }),
                editable: true,
                label: i18next.t('stevilcenje.stevilcenje'),
                name: 'stevilcenje',
                sortable: true
            }
        ]
    });

    Stevilcenje.prototype.initialize = function () {
        SeznamView.prototype.initialize.apply(this, arguments);
        var self = this;
        this.listenTo(this.collection, "backgrid:edited", function (model, schema, command) {
            if (!command.cancel()) {
                model.save({}, {
                    success: function (model) {
                        self.triggerMethod('save:success', model);
                        Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            }

        });
    };

    /**
     * Izris toolbara
     * @returns {undefined}
     */
    Stevilcenje.prototype.renderToolbar = function () {
        var tool = [[
                {
                    id: 'doc-trenutne',
                    label: i18next.t('stevilcenje.stanje'),
                    element: 'button-route',
                    uri: '#stevilcenje/stanje'
                }
            ]];

        var tb = new Toolbar({
            buttonGroups: tool,
            listener: this
        });

        this.toolbarR.show(tb);
    };



    Stevilcenje.prototype.onSelected = function () {
    };
    /**
     * Ob kliku dodaj
     * @returns {undefined}
     */
    Stevilcenje.prototype.onDodaj = function () {

    };

    return Stevilcenje;
});