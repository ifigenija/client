/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            label: i18n.t("produkcija.nav.label"),
            icon: 'fa-cubes',
            role: "uprizoritev-read",
            id: "produkcija",
            pages: [              
                {
                    label: i18n.t("produkcija.nav.uprizoritev"),
                    uri: "#pro/uprizoritev",
                    permission: "Uprizoritev-read",
                },
                {
                    label: i18n.t("produkcija.nav.strosek"),
                    uri: "#pro/stroskovnik",
                    permission: "Strosek-read",
                },
                {
                    divider: true
                },
                {
                    label: i18n.t("produkcija.nav.zaposlitev"),
                    uri: "#pro/zaposlitev",
                    permission: "Zaposlitev-read"
                },
                {
                    label: i18n.t("produkcija.nav.sezona"),
                    uri: "#pro/sezona",
                    
                }
            ]
        }
    ];
});

