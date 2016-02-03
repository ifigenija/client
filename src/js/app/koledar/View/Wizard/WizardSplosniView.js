/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    '../../Model/Dogodki',
    './WizardView',
    './IzbiraProstoraView',
    './IzbiraSodelujociView',
    './VnosNaslovCasView',
    'options!dogodek.barve'
], function (
        Radio,
        i18next,
        Dogodki,
        WizardView,
        IzbiraProstoraView,
        IzbiraSodelujociView,
        VnosNaslovCasView,
        barve
        ) {

    var WizardSplosniView = WizardView.extend({
        views: [
            VnosNaslovCasView,
            IzbiraProstoraView,
            IzbiraSodelujociView
        ],
        callback: function (model) {
            var self = this;
            
            model.set('barva', barve.splosni.value);
            
            model.save({}, {
                success: function (model) {
                    Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                    var Dogodek = Dogodki.prototype.model.extend({});
                    self.trigger('save:success', new Dogodek(model.get('dogodek')));
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    });

    return WizardSplosniView;
});