define(['jquery',
    'baseUrl',
    'app/seznami/View/PostaView',
    'app/seznami/Model/Posta',
    'app/Max/View/Buttons',
    'radio',
    'backbone'
], function (
        $,
        baseUrl,
        View,
        Model,
        buttons,
        Radio,
        Backbone
        ) {


    describe("Proženje eventov", function () {

        before(function () {
            Radio.channel('global').reply('buttons', function () {
                return buttons;
            });
        });

        it("vrne pricakovano stevilo", function () {
            var view = new View();
            var selectSpy = sinon.spy();
            var model = new Model.Model();

            $('<div></div>').append(view.render().el);

            view.listenTo(view.collection, 'selectValue', selectSpy);

            view.collection.trigger('selectValue', model);

            expect(selectSpy).to.have.been.calledOnce;
        });
    });
    describe("Model", function () {

        before(function () {
            var self = this;
            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;

            this.PostaModel = Backbone.Model.extend({
                urlRoot: baseUrl + '/rest/posta'
            });
            this.PostaCollection = Backbone.Collection.extend({
                model: self.PostaModel,
                url: baseUrl + '/rest/posta'
            });

            this.collection = new this.PostaCollection();
        });

        after(function () {
            this.server.restore();
        });

        it("bi naj bil prazen pred in po fetchu", function (done) {
            // Stash reference to save context.
            var collection = this.collection;

            // Return no models on GET.
            this.server.respondWith("GET", baseUrl + "/rest/posta", [
                200,
                {"Content-Type": "application/json"},
                "[]"
            ]);

            // Before fetch.
            expect(collection).to.be.ok;
            expect(collection).to.have.length(0);

            // After fetch.
            collection.listenTo(collection, "reset", function () {
                expect(collection).to.have.length(0);
                done();
            });

            collection.fetch({
                reset:true,
                success: function () {
                    collection.trigger("reset");
                },
                error: function () {
                    console.log("AAAAAAAAAA");
                }
            });
            this.server.respond();
        });
    });

});