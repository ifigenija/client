define([
    'jquery',
    'app/koledar/View/SelectVzporedniceView',
    'text!./fixtures/vzporednice.json'
], function (
        $,
        SelectVzporedniceView,
        vzporedniceFixture
        ) {

    describe("SelectVzporedniceView", function () {
        beforeEach(function () {
            var vzporednice = JSON.parse(vzporedniceFixture);
            
            this.view = new SelectVzporedniceView({
                collection: vzporednice
            });
        });
        afterEach(function () {
        });
        it('should fail', function () {
            expect(true).to.be.false;
        });
        it('should succed', function () {
            expect(true).to.be.true;
        });
    });
});