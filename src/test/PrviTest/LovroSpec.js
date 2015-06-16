define(['jquery', 'app/Max/Module/Form'], function ($, Form) {

    describe("BDD example", function () {
        // Runs once before all tests start.
        before(function () {
            // Add a local function.
            this.hello = function () {
                return "Hello world!";
            };
        });

        // Runs once when all tests finish.
        after(function () {
            // Remove local function.
            this.hello = null;
        });

        it("should return expected string result", function () {
            // Chai BDD-style assertion.
            expect(this.hello()).to
                    .be.a("string").and
                    .equal("Hello world!");
        });

        it("calls spy wrapper on function", function () {
            var divide = function (a, b) {
                return a / b;
            },
                    divAndSpy = sinon.spy(divide);

            // Call wrapped function and verify result.
            expect(divAndSpy(4, 2)).to.equal(2);

            // Now, verify spy properties.
            sinon.assert.calledOnce(divAndSpy);
            sinon.assert.calledWith(divAndSpy, 4, 2);

            // Sinon.JS doesn't have assert for returned.
            expect(divAndSpy.returned(2)).to.be.true;
        });
    });

});