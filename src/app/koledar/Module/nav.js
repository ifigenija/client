/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            label: i18n.t("koledar.nav.label"),
            icon: 'fa-calendar',
            pages: [
                {
                    label: i18n.t("koledar.nav.dodajDogodek"),
                    icon: "fa-user-plus",
                    uri: "#koledar/dodaj"
                },
                {
                    label: i18n.t("koledar.nav.dogodki"),
                    uri: "#koledar/dogodki"
                },
                {
                    label: i18n.t("koledar.nav.prostori"),
                    uri: "#koledar/prostori"
                },
                {
                    divider: true
                },
                {
                    label: i18n.t("koledar.nav.ljudje"),
                    uri: "#koledar/ljudje"
                },
                {
                    label: i18n.t("koledar.nav.zasedenost"),
                    uri: "#koledar/dodaj"
                },
            ]
        }
       
        
    ];
});

