define([
    'jquery',
    'marionette',
    'underscore',
    'app/Max/View/Toolbar',
    'template!../tpl/jobmanager.tpl',
    './JobList',
    './JobDetail'
], function (
    $,
    Marionette,
    _,
    Toolbar,
    template,
    JobList,
    JobDetail) {
    return Marionette.LayoutView.extend({
        template: template,
        regions: {
            toolbarR: ".region-toolbar",
            listR: ".joblist",
            detailR: ".jobdetail"
        },
        onRender: function () {
            /**
             * Prikaži seznam jobov
             */
            this.renderList();
        },
        renderList: function () {
            var jobList = new JobList({
                collection: this.collection
            });
            jobList.on('clickjob', this.showJobDetail, this);
            this.listR.show(jobList);

        },
        /**
         * Prikaži podroben pogled posameznega joba
         */
        showJobDetail: function (model) {
            this.listR.empty();
            var jobDetail = new JobDetail({
                model: model
            });
            var tb = new Toolbar({
                buttonGroups: [[
                    {
                        id: "nazaj",
                        icon: "fa fa-arrow-left",
                        title: "Nazaj",
                        label: "Nazaj",
                        trigger: "go:back"
                    }
                ]],
                listener: this
            });
            this.detailR.show(jobDetail);
            this.toolbarR.show(tb);
        },
        /**
         * Vrni se na pogled seznama jobov
         */
        onGoBack: function () {
            this.toolbarR.empty();
            this.detailR.empty();
            this.renderList();

        }
    });
});