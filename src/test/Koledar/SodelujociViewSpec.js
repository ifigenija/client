/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'jquery',
    'text!./fixtures/terminiStoritve.json',
    'app/koledar/View/SodelujociView'
], function (
        Backbone,
        $,
        collFixture,
        SodelujociView
        ) {

    describe("Seznam sodelujočih view", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        /**
         * ali se vse regije zapolnijo
         * @returns {undefined}
         */
        it('je renderirano', function () {
        });

        it('renderUredi', function () {
        });
        
        /**
         * pretvorimo collection(coll) oseb v collection terminovstoritev(TS)
         * @returns {undefined}
         */
        it('pretvori osebe v TS', function () {
        });
        
        /**
         * pretvorimo coll alternacij v coll TS
         * @returns {undefined}
         */
        it('pretvori alternacije v TS', function () {
        });
        
        /**
         * pretvarjanje coll TS v coll Alternacije
         * @returns {undefined}
         */
        it('pretvori TS v alternacije', function () {
        });
        
        /**
         * pretvarjanje coll TS v Coll oseb
         * @returns {undefined}
         */
        it('pretvori TS v osebe', function () {
        });
    });
});