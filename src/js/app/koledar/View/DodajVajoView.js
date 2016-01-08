/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    'moment',
    'marionette',
    'underscore',
    'jquery',
    './WizardView',
    './IzbiraRazredDogodkaView',
    './IzbiraDatumView',
    './IzbiraProstoraView',
    './VzporedniceView'
], function (
        Radio,
        i18next,
        moment,
        Marionette,
        _,
        $,
        WizardView,
        IzbiraView,
        IzbiraDatumView,
        IzbiraProstoraView,
        VzporedniceView
        ) {

    var DodajVajoView = WizardView.extend({
        defView: {
            views: [
                IzbiraView,
                IzbiraProstoraView,
                VzporedniceView,
                IzbiraDatumView
            ],
            title: i18next.t('dogodek.dodajDogodek')
        }
    });

    return DodajVajoView;
});