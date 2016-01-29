/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    '../../Model/Dogodki',
    './WizardView',
    './IzbiraCasView',
    './VnosPodGosView',
//    './IzbiraDogodkovView'
], function (
        Radio,
        i18next,
        Dogodki,
        WizardView,
        IzbiraCasView,
        VnosPodGosView//,
//        IzbiraDogodkovView
        ) {

    var WizardGostovanjeView = WizardView.extend({
        views: [
            VnosPodGosView,
            IzbiraCasView,
//            IzbiraDogodkovView
        ],
        title: i18next.t('dogodek.dodajGostovanje'),
        callback: function (model) {
            var self = this;
            model.save({}, {
                success: function () {
                    Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                    var Dogodek = Dogodki.prototype.model.extend({});
                    self.trigger('save:success', new Dogodek(model.get('dogodek')));
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    });

    return WizardGostovanjeView;
});