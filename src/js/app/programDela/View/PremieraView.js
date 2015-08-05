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
    'app/programDela/View/IzracunajView',
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
        IzracunajView,
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
     * Ko se forma nariše priklopimo dogodke za preračun in za nastavitve naziva in EM
     * 
     * @returns {undefined}
     */
    PremieraView.prototype.onRenderForm = function () {
        EnotaProgramaView.prototype.onRenderForm.apply(this, arguments);

        if (this.model) {
            
            this.form.off('avtorskiHonorarji:change', this.preveriDelez, this);
            this.form.off('tantieme:change', this.preveriDelez, this);
            this.form.off('avtorskePravice:change', this.preveriDelez, this);
            this.form.off('nasDelez:change', this.preveriDelez, this);
            
            this.form.on('avtorskiHonorarji:change', this.preveriDelez, this);
            this.form.on('tantieme:change', this.preveriDelez, this);
            this.form.on('avtorskePravice:change', this.preveriDelez, this);
            this.form.on('nasDelez:change', this.preveriDelez, this);
        }
    };
    
    PremieraView.prototype.preveriDelez = function () {
        var polja = this.form.fields;
        
        var tan = polja.tantieme.editor.getValue();
        var avtPra = polja.avtorskePravice.editor.getValue();
        var avtHon = polja.avtorskiHonorarji.editor.getValue();
        var nasDel = polja.nasDelez.editor.getValue();
        
        if (tan + avtPra + avtHon > nasDel) {
            polja.nasDelez.setError('Naš Delež mora biti večji ali enak vsoti avtorski honorarjev, avtorskih pravic an Tantiem');
        } else {
            polja.nasDelez.clearError();
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
            model.set('stHonorarnihIgr', rpc.stHonorarnihIgr);
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