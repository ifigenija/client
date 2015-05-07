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
        name: 'lovro',
        shema: null,
        formTemplate: null,
        
        regions: {
            formTabR: '.tab-forma',
            gridTabR: '.tab-tabela'
        }
    });

    TabView.prototype.onRender = function () {
                
    };

    return TabView;
});