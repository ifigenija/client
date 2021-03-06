/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'underscore',
    'moment',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        _,
        moment
        ) {

    /**
     * If polja idjev sestavimo del urlja
     * @param {type} array
     * @param {type} prefix
     * @returns {String}
     */
    var getPartOfUrl = function (array, prefix, prvi) {
        var string = '';

        for (var k in array) {
            if (k === '0') {
                if (!prvi) {
                    string += '&';
                }
                string += prefix + '[]=' + array[k];
            } else {
                string += '&' + prefix + '[]=' + array[k];
            }
        }
        return string;
    };

    var Dogodek = Backbone.DeepModel.extend({
        view: 'default',
        urlRoot: function () {
            var url = baseUrl + '/rest/' + this.view;
            var razred = this.get('razred');
            if (razred) {
                url += '?';
                switch (razred) {
                    case '100s':
                        url += getPartOfUrl(this.get('alternacije'), 'alternacija', true);
                        var niz = getPartOfUrl(this.get('dezurni'), 'dezurni', false);
                        var niz = getPartOfUrl(this.get('gosti'), 'gost', false);
                        url += niz ? '&' + niz : '';
                        break;
                    case '200s':
                        url += getPartOfUrl(this.get('alternacije'), 'alternacija', true);
                        var niz = getPartOfUrl(this.get('gosti'), 'gost', false);
                        url += niz ? '&' + niz : '';
                        break;
                    case '300s':
                        url += getPartOfUrl(this.get('dogodki'), 'dogodek', true);
                        url += getPartOfUrl(this.get('sodelujoci'), 'sodelujoc', false);
                        break;
                    case '400s':
                        url += getPartOfUrl(this.get('sodelujoci'), 'sodelujoc', true);
                        break;
                    case '600s':
                        url += getPartOfUrl(this.get('sodelujoci'), 'sodelujoc', true);
                        break;
                }

                if (this.get('delZac')) {
                    url += '&deltaZac=' + this.get('delZac');
                }
                if (this.get('delZacTeh')) {
                    url += '&deltaZacTeh=' + this.get('delZacTeh');
                }
                if (this.get('delKon')) {
                    url += '&deltaKon=' + this.get('delKon');
                }
                if (this.get('delKonTeh')) {
                    url += '&deltaKonTeh=' + this.get('delKonTeh');
                }
            }

            return url;
        },
        getEventObject: function (eObj) {
            if (!eObj) {
                eObj = _.clone(this.attributes);
            } else {
                for (var k in  this.attributes) {
                    eObj[k] = this.get(k);
                }
            }
            eObj.start = moment(this.get('zacetek'));
            eObj.end = moment(this.get('konec'));
            return eObj;
        },
        initialize: function (attr) {
            this.view = attr.view || this.view;
        }
    });

    return Dogodek;

});


