/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            id: "arhiv",
            label: i18n.t("arhiv.nav.label"),
            icon: 'fa-archive',
            pages: [
//                {
//                    label: i18n.t("arhiv.nav.isci"),
//                    icon: "fa-user-plus",
//                    uri: "#arhiv/isci",
//                    permission: "Mapa-read"
//                },
//                {
//                    label: i18n.t("arhiv.nav.besedila"),
//                    uri: "#arhiv/besedila",
//                    permission: "Besedila-write"
//                },
//                {
//                    label: i18n.t("arhiv.nav.arhiviraj"),
//                    icon: "fa-user-plus",
//                    uri: "#arhiv/dodaj"
//                },
                {
                    label: i18n.t("arhiv.nav.manager"),
//                    icon: "fa-user-plus",
                    uri: "#fs/manager",
                    permission: "Mapa-read"
                },
                {
                    label: i18n.t("arhiv.nav.besedila"),
                    uri: "#arhiv/besedila",
                    permission: "Besedilo-read"
                },
                {
                    label: i18n.t("arhiv.nav.vrstaZapisa"),
                    icon: "",
                    uri: "#fs/vrstaZapisa",
                    permission: "VrstaZapisa-read"
                }
            ]
        }
    ];
});

