define([
    'underscore',
    'backgrid',
    'app/Tip/Model/IzbirneModel',
    'app/Dokument/View/PostavkeView',
    'text!../tpl/drzv-form.tpl'
], function (
        _,
        Backgrid,
        izbirne,
        PostavkeView,
        formTpl
        ) {

    var dec3Cell = Backgrid.NumberCell.extend({
        decimals: 4
    });

    var PostavkeDrzaveView = PostavkeView.extend({
        formTemplate: _.template(formTpl),
        formTitle: 'Drzave',
        detailName: 'drzave',
        gridMeta: [
            {
                cell: 'integer',
                headerCell: 'number',
                editable: false,
                label: 'Št.',
                name: 'pozicija',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: 'Šifra',
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: 'IsoNaziv',
                name: 'isonaziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: 'IsoNum',
                name: 'isoNum',
                sortable: true
            },
            {
                cell: dec3Cell,
                headerCell: 'string',
                editable: false,
                label: 'Naziv',
                name: 'naziv',
                sortable: true
            },
            {
                cell: dec3Cell,
                headerCell: 'string',
                editable: false,
                label: 'Sifra dolga',
                name: 'sifraDolg',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: 'Briši'},
                    {event: 'uredi', title: 'Uredi'},
                    {event: 'premakniGor', title: 'Gor'},
                    {event: 'premakniDol', title: 'Dol'}
                ]
            }
        ]
    });

    /**
     * Ko se forma nariše priklopimo dogodke za preračun in za nastavitve naziva in EM
     * 
     * @returns {undefined}
     */
    PostavkeDrzaveView.prototype.onRenderForm = function () {

        if (this.model) {
            this.form.on('material:change', this.nastaviNaziv, this);
            this.form.on('cena:change', this.preracunajZnesek, this);
            this.form.on('cenik:change', this.izbranCenik, this);
            this.form.on('vrednost:change', this.preracunajCeno, this);
            this.form.on('kolicina:change', this.preracunajZnesek, this);
            this.form.on('cenik:change', this.postaviCeno, this);
            this.izbranCenik();
            this.vklopNazivEm();
        }

    };

    /**
     *
     * Nastavi naziv po spremembi artikla    
     */
    PostavkeDrzaveView.prototype.nastaviNaziv = function (form, field) {

        var editorModel = form.fields.material.editor.model;
        if (editorModel) {
            form.setValue('naziv', editorModel.get('label'));
            form.setValue('em', editorModel.get('em'));
            form.setValue('cenik', null);
        }
        this.vklopNazivEm();
        this.izbranCenik();

    };



    /**
     *
     * Izključi / vključi  vnosna polja za artikel     
     */
    PostavkeDrzaveView.prototype.vklopNazivEm = function () {
        var locked = this.form.getValue('material') ? true : false;
        this.form.$('[name="naziv"]').attr('disabled', locked);
        this.form.$('[name="em"]').attr('disabled', locked);
    };

    /**
     *
     * Izključi / vključi  vnosna polja za ceno     
     */
    PostavkeDrzaveView.prototype.izbranCenik = function () {

        var locked = this.form.getValue('cenik') ? true : false;
        this.form.$('[name="cena"]').attr('disabled', locked);

        var cena = this.form.fields.cenik.editor.model;
        if (cena) {
            this.form.setValue('cena', cena.ident);
        }

    };



    PostavkeDrzaveView.prototype.preracunajZnesek = function (form, field) {

        var editorModel = form.fields.cenik.editor.model;
        var locked = editorModel.get('id') ? true : false;

        form.$('[name="naziv"]').attr('disabled', locked);
        form.$('[name="em"]').attr('disabled', locked);

    };


    PostavkeDrzaveView.prototype.preracunajZnesek = function (form, field) {


        var kolicina = form.getValue('kolicina');
        var cena = form.getValue('cena');
        var znesek = cena * kolicina;
        form.setValue('vrednost', znesek);

    };

    PostavkeDrzaveView.prototype.postaviCeno = function (form, field) {


        var cenik = form.getEditor('cenik');

        if (cenik.model) {
            form.setValue('cena', cenik.model.get('ident'));
        } else {
            form.setValue('cena', 0);
        }

    };

    PostavkeDrzaveView.prototype.preracunajCeno = function (form, field) {

        var kolicina = form.getValue('kolicina');
        var znesek = form.getValue('vrednost');

        if (kolicina !== 0) {
            var cena = znesek / kolicina;
            form.setValue('cena', cena);
        }

    };


    return PostavkeDrzaveView;
});