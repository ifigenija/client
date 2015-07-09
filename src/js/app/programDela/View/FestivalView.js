/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'template!../tpl/festival-form.tpl',
    'formSchema!programFestival',
    'underscore'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        formTpl,
        schema,
        _
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
    var FestivalView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'festivali',
        formTitle: i18next.t('festival.title'),
        buttons: {
            dodaj: {
                id: 'doc-postavka-dodaj',
                label: i18next.t('std.dodaj'),
                element: 'button-trigger',
                trigger: 'dodaj'
            },
            shrani: {
                id: 'doc-postavka-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'docedit-preklici-postavko',
                label: i18next.t('std.preklici'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            izpolni: {
                id: 'doc-postavka-izpolni',
                label: 'Izpolni',
                element: 'button-trigger',
                trigger: 'izpolni'
            },
            nasvet: {
                id: 'doc-postavka-nasvet',
                label: '<i class="fa fa-info"></i>',
                element: 'button-trigger',
                trigger: 'nasvet'
            },
            prikaziVse: {
                id: 'doc-postavka-prikaziVse',
                label: 'Prikaži vse',
                element: 'button-trigger',
                trigger: 'prikaziVse'
            }
        },
        gridMeta: [
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('entiteta.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.celotnaVrednost'),
                name: 'celotnaVrednost',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.zaproseno'),
                name: 'zaproseno',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.lastnaSredstva'),
                name: 'lastnaSredstva',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.vlozekKoproducenta'),
                name: 'vlozekKoproducenta',
                total: 'sum',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'premakniGor', title: i18next.t('std.premakniGor')},
                    {event: 'premakniDol', title: i18next.t('std.premakniDol')}
                ]
            }
        ],
        triggers: {
            'click .podatki': 'podatki',
            'click .koprodukcija': 'koprodukcija',
            'click .sredstva': 'sredstva'
        }
    });
    /**
     * prikaz gumbov v toolbaru
     * @returns {Array}
     */
    FestivalView.prototype.prepareToolbar = function () {
        return  this.model ?
                [
                    [
                        this.buttons.shrani,
                        this.buttons.preklici,
                        this.buttons.prikaziVse,
                        this.buttons.izpolni,
                        this.buttons.nasvet
                    ]
                ] : [[this.buttons.dodaj]];

    };
    /**
     * klik prikaži vse
     * @returns {Array}
     */
    FestivalView.prototype.onPrikaziVse = function () {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-postavka-prikaziVse');

        var label = but.get('label');
        if (label === 'Prikaži vse') {
            but.set({
                label: 'Zapri vse'
            });
            this.$('.panel-collapse:not(".in")').collapse('show');

        } else {
            but.set({
                label: 'Prikaži vse'
            });
            this.$('.panel-collapse.in').collapse('hide');
        }
    };

    FestivalView.prototype.preimenujGumb = function () {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-postavka-prikaziVse');

        var label = but.get('label');
        if (label === 'Zapri vse') {
            but.set({
                label: 'Prikaži vse'
            });
        }
    };

    FestivalView.prototype.onPodatki = function () {
        this.$('#podatki').collapse('show');
        this.$('#koprodukcija').collapse('hide');
        this.$('#sredstva').collapse('hide');
        this.preimenujGumb();
    };

    FestivalView.prototype.onKoprodukcija = function () {
        this.$('#podatki').collapse('hide');
        this.$('#koprodukcija').collapse('show');
        this.$('#sredstva').collapse('hide');
        this.preimenujGumb();
    };

    FestivalView.prototype.onSredstva = function () {
        this.$('#podatki').collapse('hide');
        this.$('#koprodukcija').collapse('hide');
        this.$('#sredstva').collapse('show');
        this.preimenujGumb();
    };

    return FestivalView;
});