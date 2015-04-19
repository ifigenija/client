define([
    'jquery',
    'underscore',
    'backgrid'
], function (
        $,
        _,
        Backgrid
        ) {

    var BackgridFooter = Backgrid.Footer.extend();

    BackgridFooter.prototype.render = function () {
        var showFooter = false;
        var tds = this.columns.map(function (column) {
            // ustvari celico za vsak column
            // class je zaenkrat hack ....
            var td = $('<th>')
                    .addClass('renderable')
                    .addClass('number-cell');

            if (column.get('total')) {
                showFooter = true;
                var formatter, decimals = 0;
                if (column.get('total') === 'sum') {
                    decimals = 2;
                }
                formatter = new Backgrid.NumberFormatter({
                    decimals: decimals,
                    decimalSeparator: ',',
                    orderSeparator: '.'
                });
                return td.html(formatter.fromRaw(this.getTotal(column)));
            } else {
                return td;
            }
        }, this);

        // če imamo vsaj en column s total, izrišemo footer
        if (showFooter) {
            this.$el.append($('<tr>').append(tds));
        }

        return this;
    };

    BackgridFooter.prototype.getTotal = function (column) {
        if (_.isFunction(column.get('total'))) {
            // total je funkcija
            return column.get('total')(column.get('name'));
        } else if (_.isString(column.get('total'))) {
            // total je string (ime metode v this)
            return this[column.get('total')].call(this, column.get('name'));
        }
        return 0;
    };

    BackgridFooter.prototype.sum = function (attribute) {
        var sum = 0;
        this.collection.map(function (model) {
            sum = sum + model.get(attribute);
        });
        return sum;
    };

    BackgridFooter.prototype.count = function () {
        return this.collection.length;
    };

    return BackgridFooter;
});