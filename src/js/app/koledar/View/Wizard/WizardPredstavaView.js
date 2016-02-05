/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    '../../Model/Dogodki',
    './WizardView',
    './IzbiraCasDeltaCasView',
    './IzbiraProstoraView',
    './IzbiraUprizoritveView',
    'options!dogodek.barve'
], function (
        Radio,
        i18next,
        Dogodki,
        WizardView,
        IzbiraCasDeltaCasView,
        IzbiraProstoraView,
        IzbiraUprizoritveView,
        barve
        ) {

    var WizardPredstavaView = WizardView.extend({
        views: [
            IzbiraCasDeltaCasView,
            IzbiraUprizoritveView,
            IzbiraProstoraView
        ],
        title: i18next.t('dogodek.dodajPredstavo'),
        callback: function (model) {
            var self = this;
            
            model.set('barva', barve.predstavaDoma.value);
            
            model.save({}, {
                success: function () {
                    Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                    var Dogodek = Dogodki.prototype.model.extend({});
                    var dog = model.toJSON();
                    dog['uprizoritev'] = model.get('uprizoritev');
                    
                    self.trigger('save:success', new Dogodek(dog));
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    });

    return WizardPredstavaView;
});