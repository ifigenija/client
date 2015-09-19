/**
 * Jobmanager module, ki je stalno prisoten v aplikaciji.
 * Preverjanje sprememb dosežemo s App.JobManager.startPolling()
 *
 * @param {type} _
 * @param {type} $
 * @param {type} Backbone
 * @param {type} Marionette
 * @param {type} App
 * @param {type} JobModel
 * @param {type} JobManager
 * @param {type} BootstrapModal
 * @returns {undefined}
 */
define([
    'radio',
    'marionette',
    'app/bars',
    '../Model/JobModel',
    '../View/JobManager',
    '../View/JobDetail',
    'backbone-modal'
], function (
    Radio,
    Marionette,
    Handlebars,
    JobModel,
    JobManager,
    JobDetail,
    Modal) {

    var moduleInit = function (mod, MyApp, Backbone, Marionette, $, _) {

        var sessionTasks = new JobModel();
        var timer = 'off';
        var interval = 8000;
        var lastRefresh = null;
        var stanje = {novi: 0, vrsta: 0};

        mod.addInitializer(function (options) {
            mod.collection = new JobModel();
            var ch = Radio.channel('jobs');
            ch.comply('show:manager', mod.showJobManager, mod);
            ch.comply('start:polling', mod.startPolling, mod);
            ch.comply('stop:polling', mod.stopPolling, mod);
            ch.comply('new:job:queue', mod.newJobQueue, mod);
            ch.reply('new:job:view', mod.newJobView, mod);

            new Marionette.AppRouter({
                controller: mod,
                appRoutes: {
                    'JobManager': 'showJobManager'
                }
            });
            mod.refresh();
        });

        /**
         * Prikaži job manager
         */
        mod.getObvestilaView = function () {
            var V = Marionette.ItemView.extend({
                tagName: 'span',
                className: 'job-status-button label label-default',
                template: Handlebars.compile('{{#if counter}} {{alerts}}/{{queue}}/{{counter}} {{/if}}'),
                triggers:{
                    'click' : 'click'
                },
                initialize: function () {
                    this.listenTo(mod.collection, 'all', this.render);
                },
                onRender: function (){
                    this.$el.attr('title', "Števec opravil: z alarmom/čakajoča/vsa");
                },
                onClick: function () {
                    mod.showJobManager();
                },
                serializeData: function () {
                    return {
                        counter: mod.collection.length,
                        queue: mod.collection.getQueue().length,
                        alerts: mod.collection.getAlerts().length
                    }
                }
            });
            return new V();
        };
        /**
         * Prikaži job manager
         */
        mod.showJobManager = function () {

            var jobMgr = new JobManager({
                collection: mod.collection
            });

            var modal = new Modal({
                title: 'Opravila',
                content: jobMgr,
                className: 'modal modal-large',
                allowCancel: true,
                showFooter: false,
            });
            modal.open();
            mod.poll();
        };

        /**
         * Se izvaja ob vsakem fetchu collectiona Preveri in prikaže število na novo
         * izvedenih jobov ter glede na čakajoče upravlja timer osveževanja
         */
        mod.refresh = _.throttle(function () {
            mod.collection.fetch({
                data: {activeJobs: 1},
                success: mod.processRefresh
            });
        }, 15000);

        /**
         * Vljuči timer za periodično povpraševanje
         * @param {int} period - interval v miisekundah
         */
        mod.startPolling = function (period) {
            timer = 'on';
            period = period || 0;
            interval = Math.max(period, 15000);
            mod.poll();
        };
        mod.stopPolling = function (interval) {
            timer = 'off';
        };

        /**
         * Povprašamo po spremembah na stanja jobov na serverju.
         * če je timer vljučen, potem se poll periodično ponavlja.
         */
        mod.poll = _.throttle(function () {
            sessionTasks.fetch({
                data: {since: new Date().getTime() - lastRefresh},
                success: mod.processPollResult
            });
            if (timer === 'on') {
                window.setTimeout(mod.poll, interval);
            }
        }, 8000);
        /**
         *  Postavimo stanje ob polnem refreshu jobov

         */
        mod.processRefresh = function () {
            stanje.novi = mod.collection.getAlerts().length;
            stanje.vrsta = mod.collection.getQueue().length;
            lastRefresh = new Date().getTime();
            if (stanje.vrsta > 0) {
                mod.startPolling(15000);
            }
        };
        /**
         * Preverimo, če se je spremenilo stanje čakajočih in končanih jobov.
         * Ob spremembi flash message

         */
        mod.notifyChange = function (coll) {

            coll = coll || mod.collection;
            var novo = {
                vrsta: coll.getQueue().length,
                novi: coll.getAlerts().length
            };
            if (novo.vrsta !== stanje.vrsta || novo.novi !== stanje.novi) {
                stanje = novo;
                Radio.channel('error').command('flash', {
                    message: 'Nova opravila - Končana: ' + stanje.novi + ' Čakajoča: ' + stanje.vrsta,
                    severity: 'info'
                });
            }
        };

        /**
         * Doda podatke o jobu v collection
         *
         * @param {object} job
         * @returns {undefined}
         */
        mod.newJobQueue = function (job, poll) {

            mod.collection.add(job);
            if (poll) {
                this.startPolling();
            }
        };

        /**
         * Naredi novi job view, ki ga lahko uporabimo
         * v print dialogu ali kje drugje za pregled rezultatov job-a
         *
         * @param {object} jobAttributes
         * @returns {JobDetail}
         * @param {boolean} poll
         */
        mod.newJobView = function (jobAttributes, poll) {

            var job = mod.collection.add(jobAttributes);
            if (poll) {
                this.startPolling();
            }
            return new JobDetail({
                model: job
            });
        };
        /**
         * Preveri rezultate in osveži trenutno kolekcijo jobov.
         * @param {Backbone.Collection} coll
         */
        mod.processPollResult = function (coll) {

            coll.each(function (job) {
                var model = mod.collection.findWhere({id: job.id});
                if (model) {
                    model.set(job.attributes);
                } else {
                    job.collection = mod.collection;
                    mod.collection.add(job);
                }
            });

            lastRefresh = new Date().getTime();
            mod.notifyChange();

            if (stanje.vrsta === 0) {
                mod.stopPolling();
            }
        };

    };

    return moduleInit;
});
