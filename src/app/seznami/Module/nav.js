/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            label: i18n.t("seznami.nav.label"),
            icon: 'fa-list',
            pages: [                
                {
                    label: i18n.t("seznami.nav.oseba"),
                    uri: "#oseba"
                },                
                {
                    label: i18n.t("seznami.nav.popa"),
                    uri: "#popa"
                },
                {
                    label: i18n.t("seznami.nav.posta"),
                    uri: "#posta"
                },
                {
                    label: i18n.t("seznami.nav.drzava"),
                    uri: "#drzava"
                },
                {
                    label: i18n.t("seznami.nav.tipFunkcije"),
                    uri: "#tipFunkcije"
                },
                {
                    label: i18n.t("seznami.nav.tipUprizoritev"),
                    uri: "#tipUprizoritev"
                },
                {
                    label: i18n.t("seznami.nav.zvrstUprizoritve"),
                    uri: "#zvrstUprizoritve"
                }
            ]
        }
    ];
});

