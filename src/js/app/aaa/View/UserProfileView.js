/* 
 * Licenca GPLv3
 */


/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'template!../tpl/user-profile.tpl'
], function (
        Marionette,
        userTpl
        ) {

    var UserProfile = Marionette.ItemView.extend({
        template: userTpl
    });

    return UserProfile;

});