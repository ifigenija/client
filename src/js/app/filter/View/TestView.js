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
    './ToggleListView',
    'app/bars',
    'app/Max/Model/LookupModel',
    '../Model/Collection'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        testTpl,
        Coll,
        baseUrl,
        DualListView,
        ToggleListView,
        Handlebars,
        LookupModel,
        Collection
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
        var $gumb = self.$('.test');

        collSelect.fetch({
            success: function () {
                var view = new DualListView({
                    collIzbrani: collSelected,
                    collIzbira: collSelect,
                    //ItemView: DualListItemView,
                    //itemTemplate: tpl,
                    $anchor: $gumb,
                    title: "izbira oseb"
                });

                view.on('close', function () {
                    console.log(collSelected.models);
                });

                self.testR.show(view);
            }
        });
    };
    TestView.prototype.onTestSelect = function (options) {

        var collSelected = new LookupModel(null, {
            entity: 'oseba'
        });

//        var collSelect = new LookupModel(null, {
//            entity: 'oseba'
//        });

        var collSelect = new Collection({
            entity: 'oseba'
        });

        var self = this;
        var $gumb = self.$('.testselect');

        collSelect.fetch({
            success: function () {
                var view = new ToggleListView({
                    collIzbira: collSelect,
                    collIzbrani: collSelected,
                    //ItemView: DualListItemView,
                    //itemTemplate: tpl,
                    $anchor: $gumb,
                    title: "izbira oseb"
                });

                view.on('close', function () {
                    console.log(collSelected.models);
                });

                self.selectR.show(view);
            }
        });
    };
    return TestView;
});


