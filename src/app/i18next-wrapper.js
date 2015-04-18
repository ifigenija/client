/* 
 * Licenca GPLv3
 */
define(['require', 'i18next-actual'], function (require, i18next) {
    i18next.init({
        load: 'unspecific',
        getAsync: false,
        ns: {
            namespaces: ['app'],
            defaultNs: 'app'
        },
        resGetPath: 'locales/__lng__/__ns__.json'
    });
    
    return i18next;
});