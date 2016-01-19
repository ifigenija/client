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
                }
            ]
        }
    ];
});

