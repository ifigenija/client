/* 
 * Planirane alternacije
 * Vrne vse aktivne alternacije določene uprizoritve funkcij, ki se planirajo
 * 
 * Licenca GPLv3
 */
define([
    'baseUrl',
    'backbone',
    'app/Max/Model/MaxPageableCollection'
], function (
        baseUrl,
        Backbone,
        MaxPageableCollection
        ) {
    var PlanAlter = MaxPageableCollection.extend({
        url: function () {
            return baseUrl + '/rest/alternacija/planirane';
        }
    });
    return PlanAlter;
});