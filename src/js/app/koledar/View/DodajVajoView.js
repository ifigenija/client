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
    './WizardVzporedniceView'
], function (
        Radio,
        i18next,
        moment,
        Marionette,
        _,
        $,
        WizardView,
        IzbiraView,
        IzbiraCasView,
        IzbiraProstoraView,
        VzporedniceView
        ) {

    var DodajVajoView = WizardView.extend({
        defView: {
            views: [
                IzbiraView,
                IzbiraCasView,
                VzporedniceView,
                IzbiraProstoraView
            ],
            title: i18next.t('dogodek.dodajDogodek')
        }
    });

    return DodajVajoView;
});