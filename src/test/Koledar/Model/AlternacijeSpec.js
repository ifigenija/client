define([
    'jquery',
    'text!../../fixtures/alternacije.json',
    'text!../../fixtures/dogodki.json',
    'moment',
    'app/koledar/Model/Alternacije',
    'app/koledar/Model/Dogodki'
], function (
        $,
        alterFixture,
        dogodkiFixture,
        moment,
        Alternacije,
        Dogodki
        ) {

    /**
     * TS = terminStoritve
     * @returns {undefined}
     */
    describe("Alternacije", function () {
        beforeEach(function () {
            var fixture = JSON.parse(alterFixture);
            this.models = fixture.data;

            var fixture = JSON.parse(dogodkiFixture);
            this.dogodki = new Dogodki(fixture.data);
        });
        afterEach(function () {
        });
        it('Inicializiraj collection brez podatkov', function () {
            var coll = new Alternacije();
            expect(coll.length).to.equal(0);
        });

        it('Inicializiraj collection s podatki', function () {
            var coll = new Alternacije(this.models);
            expect(coll.length).to.equal(12);
        });

        it('Inicializiraj model brez podatkov', function () {
            var Model = Alternacije.prototype.model.extend();
            var model = new Model();
            expect(model.get('id')).to.be.undefined;
        });

        it('Inicializiraj model s podatki', function () {
            var Model = Alternacije.prototype.model.extend();
            var model = new Model(this.models[0]);
            expect(model.get('id')).to.not.be.null;
        });

        /**
         * pretvarjanje coll TS v coll Alternacije
         * @returns {undefined}
         */
        it('pretvori alternacije v TS', function () {
            var dogodki = this.dogodki;
            var alterColl = new Alternacije(this.models);

            var modeli = alterColl.toTS({
                dogodek: dogodki.first().get('id'),
                zacetek: moment(),
                konec: moment()
            });
            expect(modeli.length).to.equal(12);
        });
    });
});