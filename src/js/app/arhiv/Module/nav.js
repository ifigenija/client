/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            label: i18n.t("arhiv.nav.label"),
            icon: 'fa-archive',
            pages: [
                {
                    label: i18n.t("arhiv.nav.isci"),
                    icon: "fa-user-plus",
                    uri: "#arhiv/isci"
                },
                {
                    label: i18n.t("arhiv.nav.besedila"),
                    uri: "#arhiv/besedila"
                },
                {
                    label: i18n.t("arhiv.nav.arhiviraj"),
                    icon: "fa-user-plus",
                    uri: "#arhiv/dodaj"
                },
                {
                    label: i18n.t("arhiv.nav.manager"),
                    icon: "fa-user-plus",
                    uri: "#fs/manager"
                },
                {
                    label: i18n.t("arhiv.vrstaZapisa"),
                    icon: "",
                    uri: "#fs/vrstaZapisa"
                }
            ]
        }
    ];
});

