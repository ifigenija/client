/* 
 * Licenca GPLv3
 */
define([
    'backbone',
    'marionette',
    'underscore',
    'jquery',
    'radio',
    'app/Max/Model/LookupModel',
    '../../filter/View/FilterView',
    'template!../tpl/koledarFilter.tpl'
], function (
        Backbone,
        Marionette,
        _,
        $,
        Radio,
        LookupModel,
        FilterView,
        filterTpl
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

    var KoledarFilterView = FilterView.extend({
        //template: filterTpl,
        vrsteFiltrovData: [{
                title: 'Izbira oseb',
                id: 'oseba',
                icon: 'fa fa-user',
                stIzpisov: 3,
                mozni: osebe,
                label: 'oseba'
            },
            {
                title: 'Izbira prostorov',
                id: 'prostor',
                icon: 'fa fa-home',
                mozni: prostori,
                label: 'prostor'
            },
            {
                title: 'Izbira uprizoritev',
                id: 'uprizoritev',
                icon: 'fa fa-play',
                mozni: uprizoritve,
                label: 'Uprizoritev'
            }]
    });

    return KoledarFilterView;
});