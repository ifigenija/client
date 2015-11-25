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
//        var self = this;
//        var $gumb = self.$('.test');
//        collSelect.fetch({
//            success: function () {
//                var view = new DualListView({
//                    izbrani: collSelected,
//                    mozni: collSelect,
//                    //ItemView: DualListItemView,
//                    //itemTemplate: tpl,
//                    $anchor: $gumb,
//                    title: "izbira oseb"
//                });
//                self.testR.show(view);
//            }
//        });
        var coll = new Backbone.Collection({
        });

        coll.add([{lovro: "dela"},
            {boris: "nedela"}]);

        console.log(coll.models);
    };
    TestView.prototype.onTestSelect = function (options) {

        var self = this;
        var $gumb = self.$('.testselect');
        collSelect.fetch({
            success: function () {
                var view = new ToggleListView({
                    mozni: collSelect,
                    izbrani: collSelected,
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
                collSelected.reset(collSelect.first(5));
                var view = new FilterView({
                    vrsteFiltrov: [{
                            title: 'Izbira oseb',
                            id: 'oseba',
                            icon: 'fa fa-user',
                            stIzpisov: 1,
                            mozni: [
                                {id:1, ident: "1", "label": "lovro"},
                                {id:2, ident: "2", "label": "simon"},
                                {id:3, ident: "3", "label": "aleš"}
                            ]
                        },
                        {
                            title: 'Izbira prostorov',
                            id: 'prostor',
                            icon: 'fa fa-home',
                            mozni: [
                                {id:1, ident: "1", "label": "lovro"},
                                {id:2, ident: "2", "label": "simon"},
                                {id:3, ident: "3", "label": "aleš"}
                            ],
                            SelectView: ToggleListView
                        }],
                    aktivneVrste: {
                        'oseba': [
                                {id:1, ident: "1", "label": "lovro"},
                                {id:2, ident: "2", "label": "simon"},
                                {id:3, ident: "3", "label": "aleš"}
                            ],
                        'prostor': [
                            {id:1, ident: "1", "label": "lovro"}
                        ]
                    }
                });
                self.filterR.show(view);
            }
        });
    };
    return TestView;
});


