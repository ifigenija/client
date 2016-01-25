/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    '../../Model/Dogodki',
    './WizardView',
    './IzbiraProstoraView',
    './IzbiraOstaliView',
    './VnosNaslovCasView'
], function (
        Radio,
        i18next,
        Dogodki,
        WizardView,
        IzbiraProstoraView,
        IzbiraOstaliView,
        VnosNaslovCasView
        ) {

    var WizardTehSploView = WizardView.extend({
        views: [
            VnosNaslovCasView,
            IzbiraProstoraView,
            IzbiraOstaliView
        ],
        callback: function (model) {
            var self = this;
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

    return WizardTehSploView;
});