/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'template!../tpl/festival-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programFestival',
    'underscore'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        formTpl,
        ZapisiLayout,
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
            nasvet: {
                id: 'doc-postavka-nasvet',
                icon: 'fa fa-info',
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
                label: i18next.t('ep.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ep.naziv'),
                name: 'naziv',
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

    /**
     * Ko kliknemo na Prikaži vse/Zapri vse
     * Odpre/zapre vse panele
     * @returns {undefined}
     */
    FestivalView.prototype.prikaziGumb = function () {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-postavka-prikaziVse');

        var label = but.get('label');
        if (label === 'Zapri vse') {
            but.set({
                label: 'Prikaži vse'
            });
        }
    };

    /**
     * Ob kliku na na panel/tab osnovni podatki
     * @returns {undefined}
     */
    FestivalView.prototype.onPodatki = function () {
        this.$('#podatki').collapse('show');
        this.$('#koprodukcija').collapse('hide');
        this.$('#sredstva').collapse('hide');
        this.prikaziGumb();
    };

    /**
     * Ob kliku na na panel/tab koprodukcijski podatki
     * @returns {undefined}
     */
    FestivalView.prototype.onKoprodukcija = function () {
        this.$('#podatki').collapse('hide');
        this.$('#koprodukcija').collapse('show');
        this.$('#sredstva').collapse('hide');
        this.prikaziGumb();
    };

    /**
     * Ob kliku na na panel/tab sredstva
     * @returns {undefined}
     */
    FestivalView.prototype.onSredstva = function () {
        this.$('#podatki').collapse('hide');
        this.$('#koprodukcija').collapse('hide');
        this.$('#sredstva').collapse('show');
        this.prikaziGumb();
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    FestivalView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramFestival'
        });
        this.prilogeR.show(view);
    };

    return FestivalView;
});