/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone',
    'marionette',
    'template!../tpl/test.tpl',
    'app/Max/Model/MaxPageableCollection',
    'baseUrl',
    './DualListView'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        testTpl,
        Coll,
        baseUrl,
        DualListView
        ) {
    var TestView = Marionette.LayoutView.extend({
        template: testTpl,
        regions: {
            testR: '.region-test'
        },
        triggers: {
            'click .test': 'test'
        }
    });

    TestView.prototype.onTest = function (options) {
        var columns = [
//            {
//                cell: 'select-row',
//                headerCell: 'select-all',
//                name: ""
//            },
            {
                cell: 'string',
                editable: false,
                label: 'oseba.sifra',
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: 'oseba.priimek',
                name: 'priimek',
                sortable: true
            }
        ];
        var M = Backbone.Model.extend({
            urlRoot: baseUrl + '/rest/oseba'
        });
        var C = Coll.extend({
            model: M,
            url: baseUrl + '/rest/oseba',
            mode: 'client',
            state: {
                pageSize: 1000,
                currentPage: 1
            }
        });

        var collSelected = new C();
        var collSelect = new C();
        var self = this;

        collSelect.fetch({
            success: function () {
                var view = new DualListView({
                    collIzbrani: collSelected,
                    collIzbira: collSelect,
                    columns: columns
                });

                self.testR.show(view);
            }
        });
    };
    return TestView;
});


