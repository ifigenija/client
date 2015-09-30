/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            label: i18n.t("seznami.nav.label"),
            icon: 'fa-list',
            id: "seznami",
            pages: [
                {
                    label: i18n.t("seznami.nav.oseba"),
                    uri: "#oseba",
                    permission: "Oseba-read"
                },
                {
                    label: i18n.t("seznami.nav.zaposlitev"),
                    uri: "#zaposlitev",
                    permission: "Zaposlitev-read"
                },
                {
                    label: i18n.t("seznami.nav.popa"),
                    uri: "#popa",
                    permission: "Popa-read"
                },
                {
                    label: i18n.t("seznami.nav.posta"),
                    uri: "#posta",
                    permission: "Posta-write"
                },
                {
                    label: i18n.t("seznami.nav.drzava"),
                    uri: "#drzava",
                    permission: "Drzava-write"
                },
//                {
//                    label: i18n.t("seznami.nav.tipFunkcije"),
//                    uri: "#tipFunkcije",
//                    permission: "TipFunkcije-write"
//                },
                {
                    label: i18n.t("seznami.nav.zvrstUprizoritve"),
                    uri: "#zvrstUprizoritve",
                    permission: "ZvrstUprizoritve-write"
                },
                {
                    label: i18n.t("seznami.nav.zvrstSurs"),
                    uri: "#zvrstSurs",
                    permission: "ZvrstSurs-write"
                },
                {
                    label: i18n.t("seznami.nav.abonma"),
                    uri: "#abonma",
                    permission: "Abonma-write"
                },
                {
                    label: i18n.t("seznami.nav.prostori"),
                    uri: "#prostor",
                    permission: "Prostor-write"

                },
                {
                    label: i18n.t("seznami.nav.vrsteStroska"),
                    uri: "#vrstaStroska",
                    permission: "VrstaStroska-write"

                }
            ]
        }
    ];
});

