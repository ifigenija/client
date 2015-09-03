/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'app/Max/View/Toolbar',
    'app/Dokument/View/SeznamView',
    'formSchema!stevilcenjestanje?filter=1',
    'i18next',
    'radio',
    'baseUrl'
], function (
        Backgrid,
        Toolbar,
        SeznamView,
        filterSchema,
        i18next,
        Radio,
        baseUrl
        ) {

    var Stevilcenje = SeznamView.extend({
        url: baseUrl + '/rest/stevilcenjestanje',
        title: i18next.t('stevilcenje.stanje'),
        schema: [],
        filterSchema: filterSchema,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenje.stevilcenje'),
                name: 'stevnaziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('stevilcenjeKonfig.zaDokument'),
                name: 'objekt',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'integer',
                editable: true,
                label: i18next.t('stevilcenje.leto'),
                name: 'leto',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'integer',
                editable: true,
                label: i18next.t('stevilcenje.stevilka'),
                name: 'stevilka',
                sortable: true
            },
        ]
    });

    Stevilcenje.prototype.initialize = function () {
        SeznamView.prototype.initialize.apply(this, arguments);
        this.listenTo(this.collection, "backgrid:edited", function (model, schema, command) {
            if (!command.cancel()) {
                if (model.changedAttributes() || _.isObject(schema.get('optionValues'))) {
                    model.save({}, {
                        error: Radio.channel('error').request('handler', 'xhr')
                    });
                }
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
                    label: i18next.t('stevilcenjeKonfig.konfigmenu'),
                    element: 'button-route',
                    uri: '#stevilcenje/konfig'
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