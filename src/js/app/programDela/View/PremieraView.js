/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'template!../tpl/premiera-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programPremiera',
    'app/programDela/Model/TipProgramskeEnote',
    'template!../tpl/premiera-prenesi.tpl',
    'marionette',
    'underscore'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        formTpl,
        ZapisiLayout,
        schema,
        TipProEnoModel,
        prenesiTpl,
        Marionette,
        _
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
    var PremieraView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'premiere',
        formTitle: i18next.t('premiera.title'),
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
                label: i18next.t('ep.uprizoritev'),
                name: 'uprizoritev.label',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('tipProgramskeEnote')
                }),
                editable: false,
                label: i18next.t('ep.t.tipProgramskeEnote'),
                name: 'tipProgramskeEnote',
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
                label: i18next.t('ep.t.avtorskiHonorarji'),
                name: 'avtorskiHonorarji',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
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
     * Metoda omogoče ali onemogoči gumb
     * Kot parametre prejme ime gumba in ali naj gumb omogoči ali onemogoči
     * @returns {undefined}
     */
    PremieraView.prototype.toggleGumb = function (gumb, jeOnemogocen) {
        var tb = this.getToolbarModel();
        var but = tb.getButton(gumb);
        if (but) {
            but.set({
                disabled: jeOnemogocen
            });
        }
    };

    /**
     * Obesimo se na uprizoritev change event, ki ga proži forma
     * omogočimo ali onemogočimo gumb prenesi
     * @returns {undefined}
     */
    PremieraView.prototype.uprizoritevChange = function () {
        var podatek = this.form.fields.uprizoritev.editor.getValue('uprizoritev');
        if (podatek) {
            this.toggleGumb('doc-postavka-prenesi', false);
        }

        var toggleEnabled = function (form, editor) {
            var podatek = editor.getValue('uprizoritev');
            if (!podatek) {
                this.toggleGumb('doc-postavka-prenesi', true);
            }
            else {
                this.toggleGumb('doc-postavka-prenesi', false);
            }
        };

        this.form.off('uprizoritev:change', toggleEnabled, this);
        this.form.on('uprizoritev:change', toggleEnabled, this);
    };

    /**
     * funkcija poskrbi da se koprodukcije izrišejo samo če so koprodukcije označene
     * @returns {undefined}
     */
    PremieraView.prototype.tipProEnoChange = function () {
        var self = this;
        var toggleKoprodukcija = function (form, editor) {
            var model = new TipProEnoModel({id: editor.getValue('tipProgramskeEnote')});

            var izrisKoprodukcije = function () {
                if (model.get('koprodukcija')) {
                    self.renderKoprodukcije();
                } else {
                    self.koprodukcijeR.empty();
                }
            };

            model.fetch({success: izrisKoprodukcije});
        };

        if (this.model.get('tipProgramskeEnote')) {
            toggleKoprodukcija(null, this.form.fields.tipProgramskeEnote.editor);
        }

        this.form.off('tipProgramskeEnote:change', toggleKoprodukcija, this);
        this.form.on('tipProgramskeEnote:change', toggleKoprodukcija, this);
    };

    /**
     * 
     * @returns {undefined}
     */
    PremieraView.prototype.zaprosenoChange = function () {

        var funkcija = function () {
            if (!this.form.commit()) {
                this.model.preracunaj();
                var polja = this.form.fields;

                if (this.model.get('vsota') < polja.zaproseno.getValue()) {
                    polja.zaproseno.setError('Zaprošeno ne sme biti več kot ' + this.model.get('vsota'));
                } else {
                    polja.zaproseno.clearError();
                }
            }
        };

        this.form.off('zaproseno:change', funkcija, this);
        this.form.on('zaproseno:change', funkcija, this);
    };

    PremieraView.prototype.preveriDelez = function () {
        var polja = this.form.fields;

        var tan = polja.tantieme.editor.getValue();
        var avtPra = polja.avtorskePravice.editor.getValue();
        var avtHon = polja.avtorskiHonorarji.editor.getValue();
        var mat = polja.materialni.editor.getValue();

        if (!this.form.commit()) {
            this.model.set('nasDelez', tan + avtPra + avtHon + mat);
            //this.renderForm();
        }
    };

    /**
     * Ko se forma nariše priklopimo dogodke za preračun in za nastavitve naziva in EM
     * 
     * @returns {undefined}
     */
    PremieraView.prototype.onRenderForm = function () {
        EnotaProgramaView.prototype.onRenderForm.apply(this, arguments);

        if (this.model) {

            this.form.off('avtorskiHonorarji:focus', this.preveriDelez, this);
            this.form.off('tantieme:change', this.preveriDelez, this);
            this.form.off('avtorskePravice:change', this.preveriDelez, this);
            this.form.off('nasDelez:change', this.preveriDelez, this);

            this.form.on('avtorskiHonorarji:focus', this.preveriDelez, this);
            this.form.on('tantieme:change', this.preveriDelez, this);
            this.form.on('avtorskePravice:change', this.preveriDelez, this);
            this.form.on('nasDelez:change', this.preveriDelez, this);

            this.uprizoritevChange();
            this.tipProEnoChange();
            this.zaprosenoChange();
        }
    };

    /**
     * metoda je overridana iz enotePrograma
     * @returns {PostavkeView@call;extend.prototype.getPrenesiView.View}
     */
    PremieraView.prototype.prenesi = function (modal) {
        var rpc = modal.options.content.model.get('rpc');
        var view = modal.options.content;
        var model = this.model;

        if (view.$('.nasDelez').is(':checked')) {
            model.set('nasDelez', rpc.Do.nasDelez);
        }
        if (view.$('.avtorskiHonorarji').is(':checked')) {
            model.set('avtorskiHonorarji', rpc.Do.avtorskiHonorarji);
        }
        if (view.$('.tantieme').is(':checked')) {
            model.set('tantieme', rpc.Do.tantieme);
        }
        if (view.$('.materialni').is(':checked')) {
            model.set('materialni', rpc.Do.materialni);
        }
        if (view.$('.avtorskePravice').is(':checked')) {
            model.set('tantieme', rpc.Do.tantieme);
        }
        if (view.$('.stHonorarnih').is(':checked')) {
            model.set('stHonorarnih', rpc.stHonorarnih);
        }
        if (view.$('.stHonorarnihIgr').is(':checked')) {
            model.set('stHonorarnihIgr', rpc.stHonorarnihIgr);
        }
        if (view.$('.stHonorarnihIgrTujJZ').is(':checked')) {
            model.set('stHonorarnihIgrTujJZ', rpc.stHonorarnihIgrTujJZ);
        }
        if (view.$('.stHonorarnihIgrSamoz').is(':checked')) {
            model.set('stHonorarnihIgrSamoz', rpc.stHonorarnihIgrSamoz);
        }
        if (view.$('.stZaposUmet').is(':checked')) {
            model.set('stZaposUmet', rpc.stZaposUmet);
        }
        if (view.$('.datumZacStudija').is(':checked')) {
            model.set('datumZacStudija', rpc.datumZacStudija);
        }
        if (view.$('.datumPremiere').is(':checked')) {
            model.set('datumPremiere', rpc.datumPremiere);
        }

        this.renderForm();
        this.triggerMethod('form:change', this.form);
    };

    /**
     * overridana metoda iz enoteprograma
     * @returns {EnotaProgramaView@call;extend.prototype.getIzracunajView.View}
     */
    PremieraView.prototype.getPrenesiView = function () {
        var self = this;
        var View = Marionette.ItemView.extend({
            tagName: 'table',
            className: 'table table-striped table-condensed',
            template: prenesiTpl,
            serializeData: function () {
                return _.extend(this.model.attributes, {rpc: self.podatkiRPC});
            }
        });

        return View;
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    PremieraView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramPremiera'
        });
        this.prilogeR.show(view);
    };

    return PremieraView;
});