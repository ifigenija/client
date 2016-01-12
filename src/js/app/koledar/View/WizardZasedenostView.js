/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    'marionette',
    'underscore',
    'jquery',
    '../Model/Dogodki',
    './WizardView',
    './IzbiraCasView',
    './IzbiraOsebeView'
], function (
        Radio,
        i18next,
        Marionette,
        _,
        $,
        Dogodki,
        WizardView,
        IzbiraCasView,
        IzbiraOsebeView
        ) {

    var WizardZasedenostView = WizardView.extend({
        defWizard: {
            views: [
                IzbiraCasView,
                IzbiraOsebeView
            ],
            title: i18next.t('terminStoritve.dodajZasedenost'),
            callback: function (model) {
                model.set('planiranZacetek', model.get('planiranZacetek').toISOString());
                model.set('planiranKonec', model.get('planiranKonec').toISOString());
                model.set('zasedenost', true);
                
                model.save({}, {
                    success: function (model) {
                        Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            }
        }
    });

    return WizardZasedenostView;
});