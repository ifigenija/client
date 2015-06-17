define(['jquery',
    'app/seznami/View/PostaView',
    'app/seznami/Model/Posta',
    'app/Max/View/Buttons',
    'radio',
], function (
        $,
        View,
        Model,
        buttons,
        Radio
        ) {


    describe("Proženje eventov", function () {

        before(function () {
            Radio.channel('global').reply('buttons', function () {
                return buttons;
            });

            sinon.config = {
                useFakeServer: true
            };

            this.serverF = sinon.fakeServer.create();
            this.serverF.autoRespond = true;
        });

        after(function () {
            this.serverF.restore();
        });

        it("vrne pricakovano stevilo", function () {

            this.serverF.respondWith("GET", "/some/article/comments.json",
                    [200, {"Content-Type": "application/json"},
                        '[{ "id": 12, "comment": "Hey there" }]']);
            var view = new View();
            var selectSpy = sinon.spy();
            var model = new Model.Model();

            $('<div></div>').append(view.render().el);

            view.listenTo(view.collection, 'selectValue', selectSpy);

            view.collection.trigger('selectValue', model);

            expect(selectSpy).to.have.been.calledOnce;
        });
    });
});