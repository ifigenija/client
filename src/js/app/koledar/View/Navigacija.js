/* 
 * Licenca GPLv3
 */


define(['backbone', 'marionette', 'i18next', "app/bars"], function (Backbone, Marionette, i18next, Handlebars) {


    var navi = new Backbone.Collection([
        {
            id: 'dogodki',
            label: i18next.t('koledar.dogodki'),
            icon: "fa fa-calendar",
            uri: '#koledar/pregled'
        },
        {
            id: 'prostori',
            label: i18next.t('koledar.prostori'),
            icon: "fa fa-file",
            uri: "#koledar/prostori"
        },
        {
            id: 'ljudje',
            label: i18next.t('koledar.ljudje'),
            icon: "fa fa-user",
            uri: '#koledar/ljudje'
        },
        {
            id: 'konflikti',
            label: i18next.t('koledar.konflikti'),
            icon: "fa fa-file",
            uri: '#koledar/konflikti'
        }

    ]);


    var KoledarNavItem = Marionette.ItemView.extend({
        tagName: 'li',
        template: Handlebars.compile('<a href="{{uri}}"><i class="{{icon}}"></i> {{label}}</a> ')
    });


    var KoledarNav = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'koledar-navigacija',
        childView: KoledarNavItem,
        initialize: function (options) {
            if (!this.collection) {
                this.collection = navi;
            }
        }
    });
    
    return KoledarNav;
});