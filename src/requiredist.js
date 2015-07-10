/* 
 * Licenca GPLv3
 */
require.config({
    baseUrl: 'dist/js',
    paths: {
        'backbone-modal': 'app/Max/View/Modal',
        'i18next': 'app/Max/i18next-wrapper',
        'app/bars': 'app/Max/handlebars-wrapper',
        'ckeditor': '../../lib/ckeditor/ckeditor',
        'formSchema': 'app/Max/Loader/formSchema',
        'formMeta': 'app/Max/Loader/formMeta',
        'template': 'app/Max/Loader/template'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        backgrid: {
            deps: ['jquery', 'backbone', 'underscore'],
            exports: 'Backgrid'
        },
        ckeditor: {
            exports: 'CKEDITOR'
        },
        "backgrid-filter": {
            deps: ["backbone", "backgrid"]
        },
        'backgrid-moment-cell': {
            deps: ["backbone", "backgrid"]
        },
        'backgrid-select-all': {
            deps: ["backbone", "backgrid"]
        },
        'deep-model': ['backbone', 'underscore'],
        'backbone-modal': ['jquery', 'backbone'],
        'bootstrap': ['jquery'],
        'jquery.jsonrpc': ['jquery'],
        'bootstrap-datepicker': ['jquery', 'bootstrap']
    },
    noGlobal: true
});
