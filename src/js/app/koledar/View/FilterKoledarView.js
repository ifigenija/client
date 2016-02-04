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

    var prostori = new LookupModel(null, {
        entity: 'prostor'
    });

    var uprizoritve = new LookupModel(null, {
        entity: 'uprizoritev'
    });

    osebe.fetch({error: Radio.channel('error').request('handler', 'xhr')});
    prostori.fetch({error: Radio.channel('error').request('handler', 'xhr')});
    uprizoritve.fetch({error: Radio.channel('error').request('handler', 'xhr')});

    var FilterKoledarView = FilterView.extend({
        //template: filterTpl,
        vrsteFiltrovData: [{
                title: i18next.t('oseba.izbira'),
                id: 'oseba',
                icon: 'fa fa-user',
                stIzpisov: 3,
                mozni: osebe,
                label: i18next.t('std.oseba')
            },
            {
                title: i18next.t('prostor.izbira'),
                id: 'prostor',
                icon: 'fa fa-home',
                mozni: prostori,
                label: i18next.t('std.prostor')
            },
            {
                title: i18next.t('uprizoritev.izbira'),
                id: 'uprizoritev',
                icon: 'fa fa-play',
                mozni: uprizoritve,
                label: i18next.t('std.uprizoritev')
            }]
    });

    return FilterKoledarView;
});