/**
 * Ovoj okrog handlebars v katerem nastavimo template helperje 
 * 
 * Licenca GPLv3
 */
define(['handlebars', 'i18next'], function (Handlebars, i18n) {

    Handlebars.default.registerHelper('t', function (i18n_key) {
        var result = i18n.t(i18n_key);

        return new Handlebars.default.SafeString(result);
    });

    Handlebars.default.registerHelper('tr', function (context, options) {
        var opts = i18n.functions.extend(options.hash, context);
        if (options.fn)
            opts.defaultValue = options.fn(context);

        var result = i18n.t(opts.key, opts);

        return new Handlebars.default.SafeString(result);
    });

return Handlebars.default;
})

