/* 
 * Licenca GPLv3
 */
define(['i18next'], function (i18n) {

    return [
        {
            label: i18n.t("koledar.nav.label"),
            icon: 'fa-calendar',
            uri: '#koledar/navigacija',
            id: "koledar",
//            permission: "Koledar-read",
            pages: [
                {
                    label: i18n.t("koledar.nav.pregled"),
                    uri: '#koledar/pregled'
//                    permission: "Koledar-read"
                },
                {
                    label: i18n.t("koledar.nav.planer"),
                    uri: '#koledar/planer'
 //                   permission: ""
                },
                {
                    label: i18n.t("koledar.nav.zasedenost"),
                    uri: '#koledar/zasedenost'
 //                   permission: ""
                },
                {
                    label: i18n.t("koledar.nav.koledarPosameznik"),
                    uri: '#koledar/koledarPosameznik'
 //                   permission: ""
                }
            ]
        }
    ];
});

