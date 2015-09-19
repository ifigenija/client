define([
    'underscore',
    'baseUrl',
    'backbone'
], function(
        _,
        baseUrl,
        Backbone
        ) {

    var ReportModel = Backbone.Model.extend({});
    var ReportCollection = Backbone.Collection.extend({
        model: ReportModel
    });


    var Job = Backbone.Model.extend({
        url: function() {
            var url = baseUrl + '/work/job';
            if (!this.isNew()) {
                url = url + '/' + this.id;
            }
            return url;
        },
        initialize: function() {
            this.initReports();
            this.on("change:reports", this.refreshReports);
        },
        refreshReports: function() {
            if (this.hasChanged('reports')) {
                this.initReports();
            }
        },
        initReports: function() {
            this.set('reportCollection', new ReportCollection(this.get('reports')));
            this.get('reportCollection').each(function(report) {
                report.set('url', report.getDownloadUrl());
            });
        },
        /**
         * Izklopim alert flag na jobu
         */
        alertOff: function() {
            if (this.get('alert')) {
                this.set('alert', false);
                this.save();
            }
        }
    });

    return Backbone.Collection.extend({
        model: Job,
        mode: "server",
        url: function () {
            var url = baseUrl + '/rest/job';
            return url;
        },
        /**
         * Vrne število jobov, ki čakajo
         */
        getQueue: function () {
            return _.filter(this.models, function (job) {
                var status = job.get('status');
                return (status === 0 || status === 1);
            });
        },
        /**
         * Vrne število jobov, ki zahtevajo pozornost
         */
        getAlerts: function () {
            return this.where({
                alert: true
            });
        }

    });


});
