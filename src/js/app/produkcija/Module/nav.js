/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            label: i18n.t("produkcija.nav.label"),
            icon: 'fa-cubes',
            pages: [              
                {
                    label: i18n.t("produkcija.nav.uprizoritev"),
                    uri: "#pro/uprizoritev"
                },
                {
                    label: i18n.t("produkcija.nav.strosek"),
                    uri: "#pro/stroskovnik"
                },
                {
                    divider: true
                },
                {
                    label: i18n.t("produkcija.nav.zaposlitev"),
                    uri: "#pro/zaposlitev"
                },
                {
                    label: i18n.t("produkcija.nav.sezona"),
                    uri: "#pro/sezona"
                }
            ]
        }
    ];
});

