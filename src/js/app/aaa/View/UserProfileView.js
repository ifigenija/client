/* 
 * Licenca GPLv3
 */


/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/Max/Module/Form',
    'app/aaa/checkauth',
    'i18next',
    'template!../tpl/user-profile.tpl'
], function (
        Marionette,
        Form,
        auth,
        i18Next,
        userTpl
        ) {


    var UserProfile = Marionette.ItemView.extend({
        template: userTpl,
        triggers: {
            "keyup #oldPassword": "old:changed",
            "keyup #newPass2": "new:changed",
            "keyup #newPass1": "new:changed",
            "submit form.changePass": "do:change"
        },
        onNewChanged: function () {
            var pogoj = 0;
            if (auth.passPolicy(this.$('#newPass1').val())) {
                pogoj++;
            }
            this.errComplex(pogoj === 1);
            if (this.$('#newPass1').val() === this.$('#newPass2').val()) {
                pogoj++;
                this.errEqual(true);
            } else {
                this.errEqual();
            }
            
            this.onOldChanged() && pogoj++;

            this.$("button").attr("disabled", pogoj !== 3);

        },
        onOldChanged: function () {
            var pogoj = 0;
            if (auth.passPolicy(this.$('#oldPassword').val())) {
               pogoj++;
            }
            this.errOld(pogoj === 1);
            return pogoj;
        },
        onDoChange: function () {
            var self = this;
            var success = function () {
                this.$('input').val('');                
            };
            this.options.changePassFun(this.$('#oldPassword').val(), this.$('#newPass1').val(), success);
            
        },
        errComplex: function (clear) {
            this.$(".not-complex").text(clear ? "" : i18Next.t("login.passNotComplex"));
        },
        errEqual: function (clear) {
            this.$(".not-equal").text(clear ? "" : i18Next.t("login.passNotEqual"));
        },
        errOld: function (clear) {
            this.$(".old-not-complex").text(clear ? "" : i18Next.t("login.passNotComplex"));
        }
    });
    return UserProfile;
});