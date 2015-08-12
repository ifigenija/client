/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'template!../tpl/gostujoca-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programGostujoca',
    'app/bars'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        formTpl,
        ZapisiLayout,
        schema,
        Handlebars
        ) {

    var GostujocaView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'gostujoci',
        formTitle: i18next.t('gostujoca.title'),
        gridMeta: [
            {
                headerCell: 'number',
                cell: 'integer',
                editable: false,
                label: i18next.t('ep.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ep.uprizoritev'),
                name: 'uprizoritev.label',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('ep.zaproseno'),
                name: 'zaproseno',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('ep.t.avtorskiHonorarji'),
                name: 'avtorskiHonorarji',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('ep.tantieme'),
                name: 'tantieme',
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
        ]
    });

    /**
     * Uprizoritev ima samo kot informacijo. Se ne prenašajo podatki
     * Zato smo overridali s prazno metodo
     * @returns {undefined}
     */
    GostujocaView.prototype.uprizoritevChange = function () {

    };

    GostujocaView.prototype.imaKoprodukcijeChange = function (form, editor) {
        var imaKop = editor.getValue();
        this.izrisKoprodukcije(imaKop);
    };

    GostujocaView.prototype.strosekOdkPred = function () {
        if (!this.form.commit()) {
            var model = this.model;
            var polja = this.form.fields;
            var nasDelez = model.get('nasDelez');

            if (model.get('strosekOdkPred') > nasDelez) {
                polja.strosekOdkPred.setError('Strošek odkupa predstave ne sme biti večji kot ' + nasDelez);
            } else {
                polja.strosekOdkPred.clearError();
            }
        }
    };

    GostujocaView.prototype.bindEvents = function () {

        var self = this;
        var vnosnaPolja = [
            'nasDelez',
            'drugiJavni',
            'zaproseno'
        ];

        vnosnaPolja.forEach(function (i) {
            self.form.on(i + ':change', self.prikaziPodatke, self);
        });

        this.form.on('zaproseno:change', this.zaprosenoChange, this);
        this.form.on('strosekOdkPred:change', this.strosekOdkPred, this);
        this.form.on('nasDelez:change', this.strosekOdkPred, this);

        if (this.model.get('imaKoprodukcije')) {
            this.imaKoprodukcijeChange(null, this.form.fields.imaKoprodukcije.editor);
        }

        this.form.on('imaKoprodukcije:change', this.imaKoprodukcijeChange, this);
    };
    
    GostujocaView.prototype.unBindEvents = function () {

        var self = this;
        var vnosnaPolja = [
            'nasDelez',
            'drugiJavni',
            'zaproseno'
        ];

        vnosnaPolja.forEach(function (i) {
            self.form.off(i + ':change', self.prikaziPodatke, self);
        });

        this.form.off('zaproseno:change', this.zaprosenoChange, this);
        this.form.off('strosekOdkPred:change', this.strosekOdkPred, this);
        this.form.off('nasDelez:change', this.strosekOdkPred, this);
        this.form.off('imaKoprodukcije:change', this.imaKoprodukcijeChange, this);
    };

    /**
     * prikažemo in preračunamo vse prikazne vrednosti
     * v nekaterih programskih enotah bo potrebno overridat(festival, gostujoča, razno)
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.prikaziPodatke = function () {
        if (!this.form.commit()) {
            var model = this.model;

            model.preracunajInfo(false);
            this.zaprosenoChange();

            var f = Handlebars.formatNumber;
            this.$('.nasDelez').html(f(model.get('nasDelez'), 2));
            this.$('.lastnaSredstva').html(f(model.get('lastnaSredstva'), 2));
            this.$('.celotnaVrednost').html(f(model.get('celotnaVrednost'), 2));
        }
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    GostujocaView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramGostujoca'
        });
        this.prilogeR.show(view);
    };

    return GostujocaView;
});