/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'app/filter/View/DualListView',
    'app/Max/Model/LookupModel',
    'template!app/filter/tpl/dualListView.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        DualListView,
        LookupModel,
        tpl
        ) {

    var IzbiraOstaliView = Marionette.LayoutView.extend({
        template: Handlebars.compile('<div class="izbira-oseb"></div>'),
        regions: {
            izbiraR: '.izbira-oseb'
        }
    });
    IzbiraOstaliView.prototype.initialize = function (options) {
        if (options && options.model) {
            this.model = options.model || this.model;

//            this.ostali = this.model.get('ostali') || null;
        }

        this.on('change', this.onChange, this);
    };
    

    IzbiraOstaliView.prototype.onRender = function () {
        var o = new LookupModel([], {
            entity: 'oseba'
        });

        var self = this;
        this.ostali = new Backbone.Collection();

        this.ostali.on('change remove', function () {
            if(self.ostali.length){
                self.model.set('ostali', self.ostali.pluck('id'));
                self.trigger('ready', self.model);
            }else{
                self.trigger('not:ready');
            }
        }, this);

        o.fetch({
            success: function (collection) {
                var DLV = DualListView.extend({
                    template: tpl,
                    className: 'selectlist-view'
                });
                var view = new DLV({
                    izbrani: self.ostali,
                    mozni: collection,
                    itemTemplate: Handlebars.compile('{{label}}'),
                    title: i18next.t('std.izbiraOseb')
                });

                self.izbiraR.show(view);
            }
        });
    };

    return IzbiraOstaliView;
});