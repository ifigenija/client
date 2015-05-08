/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/Dokument/View/FormView',
    'app/Max/View/PaginatedGrid',
    'app/Max/Module/Backgrid',
    'template!../tpl/tab-layout.tpl',
    'app/Max/Model/MaxPageableCollection',
    'template!../tpl/oseba-form.tpl',
    'formSchema!oseba'
], function (
        Marionette,
        FormView,
        PaginatedGrid,
        Backgrid,
        tabTpl,
        Coll,
        osebaTpl,
        osebaSchema
        ) {

    var TabView = Marionette.LayoutView.extend({
        template: tabTpl,
        model: null,
        schema: null,
        regions: {
            formTabR: '.tab-forma',
            gridTabR: '.tab-tabela'
        },
        triggers: {
            'click .nav-splosno': 'splosno',
            'click .nav-naslov': 'naslov',
            'click .nav-telefonska': 'telefonska',
            'click .nav-racun': 'racun'
        },
        
        initalize: function(options){
          console.log("constructor");
          this.model = options.model;
          this.schema = options.schema;
        },
        onSplosno: function () {
            console.log('splosno');
            this.$('.active').removeClass('active');
            this.$('.nav-splosno').addClass('active');

            var Fv = FormView.extend({
                formTitle: this.name + this.model.get('naziv'),
                buttons: {
                    shrani: {
                        id: 'doc-shrani',
                        label: 'Shrani',
                        element: 'button-trigger',
                        trigger: 'shrani',
                        disabled: true
                    },
                    preklici: {
                        id: 'doc-preklici',
                        label: 'Prekliči',
                        element: 'button-trigger',
                        trigger: 'preklici'
                    }
                },
                schema: osebaSchema.toFormSchema().schema,
                formTemplate: osebaTpl,
                
                onFormChange: function (form) {
                    var tb = this.getToolbarModel();
                    var but = tb.getButton('doc-shrani');
                    if (but.get('disabled')) {
                        but.set({
                            disabled: false
                        });
                    }
                }
            });

            var form = new Fv({
                model: this.model
            });
            this.formTabR.show(form);
        },
        onNaslov: function () {
            console.log('naslov');
            this.$('.active').removeClass('active');
            this.$('.nav-naslov').addClass('active');
        },
        onTelefonska: function () {
            console.log('telefonska');
            this.$('.active').removeClass('active');
            this.$('.nav-telefonska').addClass('active');
        },
        onRacun: function () {
            console.log('racun');
            this.$('.active').removeClass('active');
            this.$('.nav-racun').addClass('active');
        }
    });

    TabView.prototype.onRender = function () {
        console.log("risem");
    };

    return TabView;
});