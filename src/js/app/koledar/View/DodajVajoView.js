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
    './IzbiraUprizoritveView'
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
        IzbiraUprizoritveView
        ) {

    var DodajVajoView = WizardView.extend({
        defView: {
            views: [
                //IzbiraView,
                IzbiraCasView,
                IzbiraUprizoritveView,
                IzbiraProstoraView
            ],
            title: i18next.t('dogodek.dodajDogodek')
        }
    });

    return DodajVajoView;
});