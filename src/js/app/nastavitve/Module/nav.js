/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            label: i18n.t("nastavitve.nav.label"),
            icon: 'fa-cog',
            permission: 'Options-write',
            id: "nastavitve",
            pages: [
//                {
//                    label: i18n.t("nastavitve.nav.moznosti"),
//                    uri: "#aaa/moznosti"
//                },
                                 {
                    label: i18n.t("stevilcenje.konfigmenu"),
                    uri: "#stevilcenje/konfig",
                    permission: 'Stevilcenje-write'
                },
                 {
                    label: i18n.t("stevilcenje.menu"),
                    uri: "#stevilcenje/seznam",
                    permission: 'Stevilcenje-write'
                },
                {
                    divider: true
                }, {
                    label: i18n.t("admin.nav.addUser"),
                    icon: "fa-user-plus",
                    uri: "#aaa/user/dodaj",
                    permission: 'Aaa-read'
//                    role: "administrator-dostopov"
                }, {
                    label: i18n.t("admin.nav.users"),
//                    icon: "fa-user-plus",
                    uri: "#aaa/users",
                    permission: 'Aaa-read'
//                    role: "administrator-dostopov"

                }, {
                    label: i18n.t("admin.nav.roles"),
                    uri: "#aaa/roles",
                    permission: 'Aaa-read'
//                    role: "administrator-dostopov"
                }, {
                    label: i18n.t("admin.nav.permission"),
                    uri: "#aaa/permissions",
                    permission: 'Aaa-read'
//                    role: "administrator-dostopov"
                }

            ]
        }
    ];
});

