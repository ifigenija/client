/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    './WizardView',
    './IzbiraCasView',
    './IzbiraOsebeView'
], function (
        Radio,
        i18next,
        WizardView,
        IzbiraCasView,
        IzbiraOsebeView
        ) {

    var WizardZasedenostView = WizardView.extend({
        views: [
            IzbiraCasView,
            IzbiraOsebeView
        ],
        title: i18next.t('terminStoritve.dodajZasedenost'),
        callback: function (model) {
            //transformacija podatkov modela
            model.set('planiranZacetek', model.get('zacetek'));
            model.set('planiranKonec', model.get('konec'));
            model.set('zasedenost', true);

            var self = this;
            model.save({}, {
                success: function (model) {
                    Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                    self.trigger('save:success', model);
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    });

    return WizardZasedenostView;
});