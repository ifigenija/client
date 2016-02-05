/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'app/filter/View/DualListView',
    'app/Max/Model/LookupModel',
    'template!app/filter/tpl/dualListView.tpl'
], function (
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        DualListView,
        LookupModel,
        tpl
        ) {

    var IzbiraSodelujociView = Marionette.LayoutView.extend({
        template: Handlebars.compile('<div class="izbira-oseb"></div>'),
        regions: {
            izbiraR: '.izbira-oseb'
        }
    });
    IzbiraSodelujociView.prototype.initialize = function (options) {
        if (options && options.model) {
            this.model = options.model || this.model;
            
            if (typeof (options.izberiOsebe) !== 'undefined') {
                this.izberiOsebe = options.izberiOsebe;
            } else {
                this.izberiOsebe = true;
            }
        }

        this.on('change', this.onChange, this);
    };


    IzbiraSodelujociView.prototype.onRender = function () {
        var o = new LookupModel([], {
            entity: 'oseba'
        });
        
        if (this.izberiOsebe) {
            this.trigger('not:ready');
        } else {
            this.trigger('ready', this.model);
        }

        var self = this;
        this.sodelujoci = new Backbone.Collection();

        this.sodelujoci.on('change remove', function () {
            if (self.sodelujoci.length) {
                self.model.set('sodelujoci', self.sodelujoci.pluck('id'));
                self.trigger('ready', self.model);
            } else {
                if (self.izberiOsebe) {
                    self.trigger('not:ready');
                } else {
                    self.trigger('ready', self.model);
                }
            }
        }, this);

        o.fetch({
            success: function (collection) {
                var DLV = DualListView.extend({
                    template: tpl,
                    className: 'selectlist-view'
                });
                var view = new DLV({
                    izbrani: self.sodelujoci,
                    mozni: collection,
                    itemTemplate: Handlebars.compile('{{label}}'),
                    title: i18next.t('std.izbiraOseb')
                });

                self.izbiraR.show(view);
            }
        });
    };

    return IzbiraSodelujociView;
});