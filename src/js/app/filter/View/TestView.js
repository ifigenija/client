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
    './DualListView',
    'app/bars'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        testTpl,
        Coll,
        baseUrl,
        DualListView,
        Handlebars
        ) {
    var TestView = Marionette.LayoutView.extend({
        template: testTpl,
        regions: {
            testR: '.region-test',
            selectR: '.region-testselect'
        },
        triggers: {
            'click .test': 'test',
            'click .testselect': 'testSelect'
        }
    });

    TestView.prototype.onTest = function (options) {
        var columns = [
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
        var gumb = self.$('.test');
        
        collSelect.fetch({
            success: function () {
                var view = new DualListView({
                    collIzbrani: collSelected,
                    collIzbira: collSelect
//                    top: gumb.position().top + gumb.parent().height(),
//                    left: gumb.position().left
                });

                self.testR.show(view);
            }
        });
    };
    TestView.prototype.onTestSelect = function (options) {
        var View = Marionette.LayoutView.extend({
            template: Handlebars.compile('<div>Nekaj</div')
        });

        var view = new View();

        this.selectR.show(view);
    };
    return TestView;
});


