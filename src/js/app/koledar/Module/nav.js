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
            permission: "Koledar-read",
            pages: [
                {
                    label: i18n.t("koledar.nav.planiranje"),
                    uri: '#koledar/planiranje',
                    permission: "Koledar-read"
                },
                {
                    label: i18n.t("Test"),
                    uri: "#koledar/test",
                    permission: "Koledar-read"
                }
            ]
        }
    ];
});

