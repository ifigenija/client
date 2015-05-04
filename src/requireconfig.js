/* 
 * Licenca GPLv3
 */
require.config({
            paths: {
            'application': 'app/application',
            'underscore': 'lib/underscore/underscore',
            'bootstrap': 'lib/bootstrap/dist/js/bootstrap.min',
            'jquery': 'lib/jquery/dist/jquery',
            'jquery.fileupload': 'lib/jquery-file-upload/js/jquery.fileupload',
            'jquery.ui.widget': 'lib/jquery-file-upload/js/vendor/jquery.ui.widget',
            'jquery.jsonrpc': 'lib/jquery-jsonrpcclient/jquery.jsonrpcclient',
            'backbone': 'lib/backbone/backbone',
            'text': 'lib/requirejs-text/text',
            'marionette': 'lib/marionette/lib/backbone.marionette',
            'backgrid': 'lib/backgrid/lib/backgrid',
            'backgrid-filter': 'lib/backgrid-filter/backgrid-filter',
            'backgrid-moment-cell': 'lib/backgrid-moment-cell/backgrid-moment-cell',
            'backgrid-select-all': 'lib/backgrid-select-all/backgrid-select-all',
            'pageable': 'lib/backbone.paginator/lib/backbone.paginator',
            'backbone-forms': 'lib/backbone-forms/distribution.amd/backbone-forms',
            'deep-model': 'lib/backbone-deep-model/distribution/deep-model',
            'backbone-modal': 'lib/backbone.bootstrap-modal/src/backbone.bootstrap-modal',
            'moment': 'lib/moment/moment',
            'handlebars': 'lib/handlebars/handlebars.amd',
            'i18next-actual': 'lib/i18next/i18next.amd.withJQuery',
            'i18next': 'app/i18next-wrapper',
            'app/bars': 'app/handlebars-wrapper',
            'ckeditor': 'lib/ckeditor/ckeditor', 
            'bootstrap-datepicker': 'lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min'
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
            'lib/bootstrap-datepicker': ['jquery', 'bootstrap'],
            'lib/dx.chartjs': ['jquery', 'lib/globalize.sl'],
            'lib/globalize.sl': ['lib/globalize'],
            'lib/globalize': {
                exports: 'Globalize'
            },
        },
    noGlobal: true
});
