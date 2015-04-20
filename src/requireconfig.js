/* 
 * Licenca GPLv3
 */
require.config({
    paths: {
        'application': 'app/application',
        'underscore': 'lib/underscore/underscore',
        'bootstrap': 'lib/bootstrap/dist/js/bootstrap.min',
        'bootstrap-datepicker': 'lib/bootstrap-datepicker/dist/js/bootstrap-datepicker',
        'jquery': 'lib/jquery/dist/jquery',
        'jquery.fileupload': 'lib/jquery-file-upload/js/jquery.fileupload',
        'jquery.jsonrpc': 'lib/jquery-jsonrpcclient/jquery.jsonrpcclient',
        'backbone': 'lib/backbone/backbone',
        'text': 'lib/requirejs-text/text',
        'marionette': 'lib/marionette/lib/backbone.marionette',
        'backgrid': 'lib/backgrid/lib/backgrid',
        'pageable': 'lib/backbone.paginator/lib/backbone.paginator',
        'backbone-forms': 'lib/backbone-forms/distribution.amd/backbone-forms',
        'deep-model': 'lib/backbone-deep-model/distribution/deep-model',
        'backbone-modal': 'lib/backbone-modal/backbone.marionette.modals',
        'moment': 'lib/moment/moment',
        'handlebars': 'lib/handlebars/handlebars.amd',
        'i18next-actual': 'lib/i18next/i18next.amd.withJQuery',
        'i18next': 'app/i18next-wrapper',
        'app/handlebars': 'app/handlebars-wrapper'
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
        'deep-model': ['backbone', 'underscore'],
        'backbone-modal': ['jquery', 'backbone'],
        'bootstrap': ['jquery'],
        'bootstrap-datepicker': ['jquery', 'bootstrap'],
        'jquery.jsonrpc': ['jquery']
    },
    noGlobal: true
});