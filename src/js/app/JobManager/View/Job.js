define([
        'marionette',
        'underscore',
        '../Model/JobModel',
        'text!../tpl/job.tpl'],
    function (
        Marionette,
        _,
        Job,
        tpl) {
        return Marionette.ItemView.extend({
            template: _.template(tpl),
            triggers: {
                "click div.panel": "clickjob",
                "mouseenter div.panel-status": "showJobHide",
                "mouseleave div.panel-status": "hideJobHide",
                "click span.panel-status-hide": "hideJob",
            },
            onShowJobHide: function () {
                var status = this.model.get("status");
                if (status === 2 || status === 3) {
                    this.$("span.panel-status-hide").show();
                    this.$("span.panel-status-label").hide();
                }
            },
            onHideJobHide: function () {
                this.$("span.panel-status-label").show();
                this.$("span.panel-status-hide").hide();
            },

            serializeData: function () {
                var statusJoba = (function (status) {
                    switch (status) {
                        case 0:
                            return {
                                name: 'Čaka',
                                'class': 'warning',
                                icon: 'dashboard'
                            };
                        case 1:
                            return {
                                name: 'Izvajanje',
                                'class': 'info',
                                icon: 'forward'
                            };
                        case 2:
                            return {
                                name: 'Končan',
                                'class': 'success',
                                icon: 'ok'
                            };
                        case 3:
                            return {
                                name: 'Napaka',
                                'class': 'danger',
                                icon: 'exclamation-sign'
                            };
                    }
                })(this.model.get('status'));

                return _.extend(this.model.attributes, {
                    statusJoba: statusJoba,
                    showGlow: this.model.get('alert') ? 'glowing-border' : ''
                });
            }
        });
    });
