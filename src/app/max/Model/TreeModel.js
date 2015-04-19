define([
    'baseUrl',
    'backbone',
    'underscore'
], function(baseUrl, Backbone, _) {



    var TreeNode = Backbone.Model.extend({
        getChildrenIds: function() {
            if (!this.hasChildren()) {                return [this.id];}
            var modelsId = this.children.map(function(child) {
                if (child.hasChildren()) {
                    return child.getChildrenIds();
                } else {
                    return child.id;
                }
            }, this);
            return _.flatten(modelsId);
        },
        hasChildren: function() {
            return !this.get('isLeaf');
        },
        getLabel: function() {
            return this.get('naziv') || 'getLabel';
        },
        move: function(destination, options) {
            if (!options) {
                options = {};
            }
            var self = this;
            this.set('parent', destination.id);
            this.collection.sync('update', this, {
                success: function(model) {
                    if (typeof options.success === 'function') {
                        options.success();
                    }
                },
                error: function(xhr) {
                    if (typeof options.error === 'function') {
                        options.error(xhr.responseJSON);
                    }
                }
            });
        },
        validate: function(attrs, options) {

        },
        expand: function(options) {
            if (!this.get('isLeaf')) {
                if (!this.children) {
                    var chld;
                    chld = new this.collectionType({}, {
                        parent: this,
                        model: this.collectionType.prototype.model
                    });
                    this.set('children', chld);
                }
            }
        }
    });

    var TreeNodeCollection = Backbone.Collection.extend({
        model: TreeNode,
        constructor: function(models, options) {
            if (typeof options.parent === 'object') {
                this.parent = options.parent;
            } else {
                if (typeof options.parent === "string") {
                    this.parent = {id: options.parent};
                }
            }
            Backbone.Collection.prototype.constructor.apply(this, Array.prototype.slice.apply(arguments));
            this.treeUrl = options.treeUrl || this.treeUrl;

        },
        url: function() {
            return baseUrl + this.treeUrl + (this.parent ? '/p/' + this.parent.id : '');
        },
        fetchByIds: function(ids) {
            this.fetch({url: this.url += '?ids=' + ids.join(',')});
        },
        getChildrenIds: function() {
            var modelsId = this.map(function(model) {
                return model.getChildrenIds();
            }, this);
            return _.flatten(modelsId);
        },
    });
    TreeNode.prototype.collectionType = TreeNodeCollection;
    return {model: TreeNode, collection: TreeNodeCollection};
});
