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
    './FilterView',
    'app/bars',
    'app/Max/Model/LookupModel',
    'baseUrl',
    '../Model/AktivnaVrstaCollection',
    '../Model/VrstaCollection'
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
        FilterView,
        Handlebars,
        LookupModel,
        baseUrl,
        AktivnaVrsta,
        Vrsta
        ) {

    var tpl = Handlebars.compile('{{ime}}');
    var DualListItemView = Marionette.ItemView.extend({
        template: Handlebars.compile('{{ime}}'),
        tagName: 'li',
        className: 'lovro-item list-group-item',
        triggers: {
            'click': 'select'
        }
    });
    var collSelected = new LookupModel(null, {
        entity: 'oseba'
    });
    var collSelect = new LookupModel(null, {
        entity: 'oseba'
    });
    var TestView = Marionette.LayoutView.extend({
        template: testTpl,
        regions: {
            testR: '.region-test',
            selectR: '.region-testselect',
            filterR: '.region-testfilter'
        },
        triggers: {
            'click .test': 'test',
            'click .testselect': 'testSelect',
            'click .testfilter': 'testFilter'
        }
    });
    TestView.prototype.onTest = function (options) {
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
                self.testR.show(view);
            }
        });
    };
    TestView.prototype.onTestSelect = function (options) {

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
                self.selectR.show(view);
            }
        });
    };
    TestView.prototype.onTestFilter = function () {
        var self = this;

        collSelect.fetch({
            success: function () {
                //vrste
                var vColl = new Vrsta();
                vColl.add([{
                        collIzbrani: new Backbone.Collection(),
                        collMozni: collSelect,
                        icon: 'fa fa-user'
                    }, {
                        collIzbrani: new Backbone.Collection(),
                        collMozni: collSelect,
                        icon: 'fa fa-home',
                        SelectView: ToggleListView
                    }]);
                //aktivnevrste
                collSelected.reset(collSelect.first(5));
                var avColl = new AktivnaVrsta();
                avColl.add([{
                        collIzbrani: collSelected,
                        modelMozni: vColl.models[0]
                    }, {
                        collIzbrani: new Backbone.Collection(),
                        modelMozni: vColl.models[1]
                    }]);
                var view = new FilterView({
                    collection: avColl,
                    //vrsteFiltrov: vColl
                    vrsteFiltrov: [{
                            title: 'Izbira oseb',
                            vrsta: 'oseba',
                            collIzbrani: new Backbone.Collection(),
                            collMozni: collSelect,
                            icon: 'fa fa-user'
                        },
                        {
                            title: 'Izbira prostorov',
                            vrsta: 'prostor',
                            collIzbrani: new Backbone.Collection(),
                            collMozni: collSelect,
                            icon: 'fa fa-home',
                            SelectView: ToggleListView
                        }]
                });
                self.filterR.show(view);
            }
        });
    };
    return TestView;
});


