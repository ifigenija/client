define([
    'jquery',
    'text!../../fixtures/osebe.json',
    'text!../../fixtures/dogodki.json',
    'moment',
    'app/koledar/Model/Osebe',
    'app/koledar/Model/Dogodki'
], function (
        $,
        osebeFixture,
        dogodkiFixture,
        moment,
        Osebe,
        Dogodki
        ) {

    /**
     * TS = terminStoritve
     * @returns {undefined}
     */
    describe("Osebe", function () {
        beforeEach(function () {
            var fixture = JSON.parse(osebeFixture);
            this.models = fixture.data;

            var fixture = JSON.parse(dogodkiFixture);
            this.dogodki = new Dogodki(fixture.data);
        });
        afterEach(function () {
        });
        it('Inicializiraj collection brez podatkov', function () {
            var coll = new Osebe();
            expect(coll.length).to.equal(0);
        });

        it('Inicializiraj collection s podatki', function () {
            var coll = new Osebe(this.models);
            expect(coll.length).to.equal(21);
        });

        it('Inicializiraj model brez podatkov', function () {
            var Model = Osebe.prototype.model.extend();
            var model = new Model();
            expect(model.get('id')).to.be.undefined;
        });

        it('Inicializiraj model s podatki', function () {
            var Model = Osebe.prototype.model.extend();
            var model = new Model(this.models[0]);
            expect(model.get('id')).to.not.be.null;
        });

        /**
         * pretvarjanje coll TS v coll Osebe
         * @returns {undefined}
         */
        it('pretvori osebe v TS', function () {
            var dogodki = this.dogodki;
            var osebeColl = new Osebe(this.models);

            var modeli = osebeColl.toTS({
                dogodek: dogodki.first().get('id'),
                zacetek: moment(),
                konec: moment()
            });
            
            expect(modeli.length).to.equal(21);
        });
    });
});