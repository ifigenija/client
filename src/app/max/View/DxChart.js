define(['marionette', 'underscore'], function(Marionette, _) {

    var DxChart = Marionette.ItemView.extend({
        template: _.template(''),
        
        initialize: function(options) {
            this.options = options;
        },
        
        onRender: function() {
            var self = this;
            require(['jquery', 'lib/dx.chartjs'], function($) {
                $(self.el).dxChart(self.options);
            });
        }
    });

    var DxCircularGauge = Marionette.ItemView.extend({
        template: _.template(''),
        
        initialize: function(options) {
            this.options = options;
        },
        
        onRender: function() {
            var self = this;
            require(['jquery', 'lib/dx.chartjs'], function($) {
                $(self.el).dxCircularGauge(self.options);
            });
        }
    });


    return {chart: DxChart, circularGauge: DxCircularGauge} ;
});