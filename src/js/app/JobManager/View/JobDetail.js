define(['marionette',
    'backbone',
    'app/bars',
    'underscore',
    '../Model/JobModel',
    './Job',
    'template!../tpl/jobDetail.tpl',
    'template!../tpl/report.tpl'
], function (Marionette, Backbone, Handlebars, _, JobModel, Job, tplJobDetail, tplReport) {
    /**
     * Prikaz job reporta
     */
    var Report = Marionette.ItemView.extend({
        template: tplReport,
        events: {
            'click .btn-natisni': 'showPrint',
        }
    });
    /**
     * Seznam reportov
     */
    var ReportList = Marionette.CompositeView.extend({
        template: Handlebars.compile('<h4>Reporti</h4><div></div>'),
        childView: Report,
        childViewContainer: "div",
    });

    return Job.extend({
        template: tplJobDetail,
        viewLog: false,
        onRender: function () {
            /**
             * Prikaži reporte
             */
            if (this.model.get('reportCollection').length) {
                this.reportView = new ReportList({
                    el: this.$('.reportList'),
                    collection: this.model.get('reportCollection'),
                });
                this.reportView.render();
            }
            /**
             * Če na jobu obstaja, prikaži gumb za prikaz loga
             */
            if (this.model.get('log')) {
                this.$('.btn-log').show();
            }
            this.model.alertOff();
        },
        events: {
            'click .btn-log': 'showLog',
        },
        /**
         * Prikaz panela za pregled loga
         */
        showLog: function () {
            var panel = this.$('.panel-log');
            var btn = this.$('.btn-log');
            if (!this.viewLog) {
                panel.find('.panel-body').html(this.model.get('log').replace(/\n/g, '<br />'));
                panel.show();
                this.viewLog = true;
                btn.html('Skrij log');
            } else {
                panel.hide();
                this.viewLog = false;
                btn.html('Prikaži log');
            }

        },
    });
});
