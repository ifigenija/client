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
                    label: i18n.t("produkcija.nav.oseba"),
                    uri: "#pro/oseba"
                }
            ]
        }
    ];
});

