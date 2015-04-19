/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            label: i18n.t("aaa.nav.label"),
            icon: 'fa-key',
            pages: [
                {
                    label: i18n.t("aaa.nav.addUser"),
                    icon: "fa-user-plus",
                    uri: "#aaa/user/dodaj"
                },
                {
                    label: i18n.t("aaa.nav.users"),
                    icon: "fa-user-plus",
                    uri: "#aaa/user/dodaj"
                },
                {
                    label: i18n.t("aaa.nav.users"),
                    icon: "fa-users",
                    uri: "#aaa/user/dodaj"
                },
                {
                    label: i18n.t("aaa.nav.roles"),
                    uri: "#aaa/user/dodaj"
                }
            ]
        }
    ];
});

