/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'radio',
    'backbone',
    '../../filter/View/FilterView',
    'app/filter/View/ToggleListView'
], function (
        i18next,
        Radio,
        Backbone,
        FilterView,
        ToggleListView
        ) {
//v idju je vrednost razreda ker filter sestavi url z idji
    var modeli = [
        {
            ident: '0',
            label: 'Predstava',
            id: '100s'
        },
        {
            ident: '1',
            label: 'Vaja',
            id: '200s'
        },
        {
            ident: '2',
            label: 'Gostovanje',
            id: '300s'
        },
        {
            ident: '3',
            label: 'Splošni dogodek',
            id: '400s'
        },
        {
            ident: '5',
            label: 'Tehnični dogodek',
            id: '600s'
        }
    ];
    var osebe = new Backbone.Collection(modeli);

    var FilterPosameznikView = FilterView.extend({
        vrsteFiltrovData: [{
                title: i18next.t('dogodek.razred'),
                id: 'razred',
                icon: 'fa fa-cubes',
                stIzpisov: 2,
                mozni: osebe,
                label: i18next.t('std.razred'),
                SelectView: ToggleListView
            }]
    });

    return FilterPosameznikView;
});