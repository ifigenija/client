/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'app/Max/View/Buttons',
    'app/JobManager/View/PrintDokumentButton'
], function (
        Radio,
        buttons,
        buttonPrint
        ) {
    Radio.channel('global').reply('buttons', function () {
        buttons['button-print'] = buttonPrint;
        return buttons;
    });
});

