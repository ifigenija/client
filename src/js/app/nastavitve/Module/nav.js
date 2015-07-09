/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            label: i18n.t("nastavitve.nav.label"),
            icon: 'fa-cog',
            pages: [
                {
                    label: i18n.t("nastavitve.nav.moznosti"),
                    uri: "#aaa/moznosti"
                },
                {
                    divider: true
                },
                {
                    label: i18n.t("admin.nav.addUser"),
                    icon: "fa-user-plus",
                    uri: "#aaa/user/dodaj"
                },
                {
                    label: i18n.t("admin.nav.users"),
                    icon: "fa-user-plus",
                    uri: "#aaa/users"
                },
                {
                    label: i18n.t("admin.nav.roles"),
                    uri: "#aaa/roles"
                },
                                {
                    label: i18n.t("admin.nav.permission"),
                    uri: "#aaa/permissions"
                }
                
            ]
        }
    ];
});

