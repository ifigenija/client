/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    'marionette',
    'underscore',
    'jquery',
    './WizardView',
    './IzbiraCasView',
    './IzbiraProstoraView',
    './IzbiraUprizoritveView'
], function (
        Radio,
        i18next,
        Marionette,
        _,
        $,
        WizardView,
        IzbiraCasView,
        IzbiraProstoraView,
        IzbiraUprizoritveView
        ) {

    var WizardVajaView = WizardView.extend({
        defWizard: {
            views: [
                IzbiraCasView,
                IzbiraUprizoritveView,
                IzbiraProstoraView
            ],
            title: i18next.t('dogodek.dodajDogodek'),
            callback: function (model) {
                var self = this;
                model.save({}, {
                    success: function () {
                        Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                        self.trigger('save:success', model);
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            }
        }
    });

    return WizardVajaView;
});