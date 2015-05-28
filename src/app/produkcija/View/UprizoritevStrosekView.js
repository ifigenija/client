/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './UprizoritevStrosekEditView',
    '../Model/UprizoritevStrosek',
    'i18next',
    'baseUrl',
    'app/bars',
    'app/Max/Module/Form'
], function (
        SeznamiView,
        UprizoritevStrosekEditView,
        UprizoritevStrosek,
        i18next,
        baseUrl,
        Handlebars,
        Form
        ) {

    var UprizoritevStrosekView = SeznamiView.extend({
        url: baseUrl + '/rest/uprizoritev/vse',
        title: i18next.t('produkcija.strosek.title'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.uprizoritev.faza'),
                name: 'faza',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.uprizoritev.naslov'),
                name: 'naslov',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.uprizoritev.delovniNaslov'),
                name: 'delovniNaslov',
                sortable: true
            },
            {
                cell: 'date',
                editable: false,
                label: i18next.t('produkcija.uprizoritev.datumPremiere'),
                name: 'datumPremiere',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });

    UprizoritevStrosekView.prototype.getFormView = function (model) {
        if (model.get('id')) {
            var editModel = new UprizoritevStrosek.Model({id: model.get('id')});
            editModel.fetch();
        } else {
            editModel = model;
        }

        return new UprizoritevStrosekEditView({
            model: editModel
        });
    };

    UprizoritevStrosekView.prototype.onDodaj = function () {
        var model = new UprizoritevStrosek.Model();
        this.onSelected(model);
    };

    UprizoritevStrosekView.prototype.onRender = function () {        
        this.$('.seznam-naslov').text(this.title);
        this.renderToolbar();
        this.collection.fetch();
        
        var sch = {type: 'Toone', targetEntity: 'uprizoritev', editorAttrs: {class: 'form-control relation-select'}};

        this.formIzberi = new Form({
            template: Handlebars.compile('<form><div data-editors="id"></div></form>'),
            className: 'form-inline',
            schema: {
                id: sch
            }
        });
        
        this.formIzberi.on('change', this.formChange, this);

        this.lookupR.show(this.formIzberi);
    };
    
    UprizoritevStrosekView.prototype.formChage = function () {
        console.log("neDela");
    };

    return UprizoritevStrosekView;
});