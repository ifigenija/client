/* 
 * Licenca GPLv3
 */
require.config({
    baseUrl: 'js',
    paths: {
        'underscore': '../lib/underscore/underscore',
        'bootstrap': '../lib/bootstrap/dist/js/bootstrap.min',
        'jquery': '../lib/jquery/dist/jquery',
        'jquery.fileupload': '../lib/jquery-file-upload/js/jquery.fileupload',
        'jquery.ui.widget': '../lib/jquery-file-upload/js/vendor/jquery.ui.widget',
        'jquery.jsonrpc': '../lib/jquery-jsonrpcclient/jquery.jsonrpcclient',
        'backbone': '../lib/backbone/backbone',
        'text': '../lib/requirejs-text/text',
        'marionette': '../lib/marionette/lib/backbone.marionette',
        'backgrid': '../lib/backgrid/lib/backgrid',
        'backgrid-filter': '../lib/backgrid-filter/backgrid-filter',
        'backgrid-moment-cell': '../lib/backgrid-moment-cell/backgrid-moment-cell',
        'backgrid-select-all': '../lib/backgrid-select-all/backgrid-select-all',
        'pageable': '../lib/backbone.paginator/lib/backbone.paginator',
        'backbone-forms': '../lib/backbone-forms/distribution.amd/backbone-forms',
        'deep-model': '../lib/backbone-deep-model/distribution/deep-model',
        'col-resizable': '../lib/col-resizable/source/colResizable-1.5.source',
        'backbone-modal': 'app/Max/View/Modal',
        'moment': '../lib/moment/moment',
        'moment/locale': '../lib/moment/locale',
        'handlebars': '../lib/handlebars/handlebars.amd',
        'i18next-actual': '../lib/i18next/i18next.amd.withJQuery',
        'i18next': 'app/Max/i18next-wrapper',
        'app/bars': 'app/Max/handlebars-wrapper',
        'ckeditor': '../lib/ckeditor/ckeditor',
        'fullcalendar': '../lib/fullcalendar/dist/fullcalendar',
        'fc-schedule': '../lib/fullcalendar-scheduler/dist/scheduler.min',
        'radio': '../lib/backbone.radio/build/backbone.radio',
        'bootstrap-datepicker': '../lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
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
        "fullcalendar": {
            deps: ['css!../lib/fullcalendar/dist/fullcalendar.min']
        },
        "fc-schedule": {
            deps: ["fullcalendar", 'css!../lib/fullcalendar-scheduler/dist/scheduler.min']
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
    map: {
        '*': {
            'css': '../lib/require-css/css' // or whatever the path to require-css is
        }
    },
    noGlobal: true
});
