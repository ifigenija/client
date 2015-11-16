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
    'app/bars',
    'app/Max/Model/LookupModel'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        testTpl,
        Coll,
        baseUrl,
        DualListView,
        Handlebars,
        LookupModel
        ) {
    
    var tpl = Handlebars.compile('{{ident}}');
    
    var DualListItemView = Marionette.ItemView.extend({
        template: Handlebars.compile('{{label}}'),
        tagName: 'li',
        className: 'lovro-item list-group-item',
        triggers: {
            'click': 'select'
        }
    });
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

        var collSelected = new LookupModel(null, {
            entity: 'oseba'
        });
        var collSelect = new LookupModel(null, {
            entity: 'oseba'
        });
        var self = this;
        
        collSelect.fetch({
            success: function () {
                var view = new DualListView({
                    collIzbrani: collSelected,
                    collIzbira: collSelect,
                    //ItemView: DualListItemView,
                    //itemTemplate: tpl
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


