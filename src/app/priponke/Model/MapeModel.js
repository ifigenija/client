define([
    'baseUrl',
    'backbone',
    'underscore',
    './Datoteka',
    './MapaAclModel'
], function(baseUrl, Backbone, _,  Datoteka, MapaAclModel) {


    var MapeCollection = Backbone.Collection.extend({
        initialize: function(models, options) {
            if (typeof options.parent === 'object') {
                this.parent = options.parent;
            } else {
                if (typeof options.parent === "string") {
                    this.parent = {id: options.parent};
                }
            }

        },
        url: function() {
            return baseUrl + '/fs/mapa' + (this.parent ? '/p/' + this.parent.id : '');
        },
        fetchByIds: function(ids) {
// Save a reference to the existing url
            var baseUrl = this.url;
            // Assign our batch url to the 'url' property and call the server
            this.url += '?ids=' + ids.join(',');
            this.fetch();
            // Restore the 'url' property
            this.url = baseUrl;
        },
        getChildrenIds: function() {
            var modelsId = this.map(function(model) {
                return model.getChildrenIds();
            }, this);
            return _.flatten(modelsId);
        }
    });
    var Mapa = Backbone.Model.extend({
        entity: 'Mapa',
        urlRoot: baseUrl + '/fs/mapa',
        defaults: {
            ime: '(Nova mapa)',
            javniDostop: 'R'
        },
        getChildrenIds: function() {
            if (!this.hasChildren()) {
                return [this.id];
            }
            var modelsId = this.children.map(function(child) {
                if (child.hasChildren()) {
                    return child.getChildrenIds();
                } else {
                    return child.id;
                }
            }, this);
            return _.flatten(modelsId);
        },
        initialize: function(options) {
//   this.entity = "Mapa";

        },
        hasChildren: function() {
            var chldColl, chld = this.get("podMape");
            if (this.children) {
                chldColl = this.children.size();
            } else {
                chldColl = 0;
            }

            if (typeof chld !== "undefined") {
                return (chld.length > 0) || (chldColl > 0);
            } else {
                return chldColl > 0;
            }

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
        /**
         * Poveže datoteko v mapo
         * @param {Datoteka} file
         * @param {object} options
         * @returns {undefined}
         */
        linkFile: function(file, options) {
            var seznam = this.get('datoteke');
            seznam = _.union(seznam, [file.id]);
            this.set('datoteke', seznam);
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
        /**
         * Kopira datoteko
         * @param {type} file
         * @param {type} options
         * @returns {undefined}
         */
        copyFile: function(file, options) {

            var url = this.urlRoot + '/' + this.id + '?copyFile=' + file.id;
            this.save({}, {
                error: function(xhr, xx, yy) {
                    if (options.error) {
                        options.error(xhr.responseJSON);
                    }
                },
                url: url,
                processData: true
            });
        },
        validate: function(attrs, options) {
            if (!attrs.ime) {
                return "Mapo je potrebno imenovati.";
            }
            if (attrs.javniDostop !== '' && attrs.javniDostop !== 'R' &&
                    attrs.javniDostop !== 'RW' &&
                    attrs.javniDostop !== 'RWA' &&
                    attrs.javniDostop !== 'RWAD') {
                return 'Vrednost za javni dostop ni veljavna';
            }
        }
    });
    return {model: Mapa, collection: MapeCollection};
});
