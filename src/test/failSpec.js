define(['jquery'
], function (
        $
        ) {

    describe("A test suite", function () {
        beforeEach(function () {
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