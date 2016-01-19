/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    '../../Model/Dogodki',
    './WizardView',
    './IzbiraCasView',
    './IzbiraProstoraView'
], function (
        Radio,
        i18next,
        Dogodki,
        WizardView,
        IzbiraCasView,
        IzbiraProstoraView
        ) {

    var WizardTehSploView = WizardView.extend({
        views: [
            IzbiraCasView,
            IzbiraProstoraView
        ],
        title: i18next.t('dogodek.dodajVajo'),
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