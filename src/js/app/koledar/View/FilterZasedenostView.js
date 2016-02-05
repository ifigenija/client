/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'radio',
    'app/Max/Model/LookupModel',
    '../../filter/View/FilterView'
], function (
        i18next,
        Radio,
        LookupModel,
        FilterView
        ) {

    var osebe = new LookupModel(null, {
        entity: 'oseba'
    });

    osebe.fetch({error: Radio.channel('error').request('handler', 'xhr')});

    var ZasedenostFilterView = FilterView.extend({
        vrsteFiltrovData: [{
                title: i18next.t('oseba.izbira'),
                id: 'oseba',
                icon: 'fa fa-user',
                stIzpisov: 3,
                mozni: osebe,
                label: i18next.t('std.oseba')
            }]
    });

    return ZasedenostFilterView;
});