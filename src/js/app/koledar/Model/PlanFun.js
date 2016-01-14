/* 
 * Planirane funkcije
 * Vrne vse planirane funkcije določene uprizoritve, ki nimajo aktivnih alternacij
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
    var PlanFun = MaxPageableCollection.extend({
        url: function () {
            return baseUrl + '/rest/funkcija/planirane';
        }
    });
    return PlanFun;
});