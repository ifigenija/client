define([
    'jquery',
    'baseUrl',
    'backbone',
    'marionette',
    'underscore',
    'text!../tpl/datoteka-detail.tpl',
    'app/util',
    'jquery.fileupload'
],
        function($, baseUrl, Backbone, Marionette, _, tpl, util) {

            var DatotekaDetail = Marionette.ItemView.extend({
                template: _.template(tpl),
                events: {
                    'click .brisi-datoteko': 'brisiDatoteko',
                    'click .uredi-datoteko': 'urediDatoteko',
                    'click .nova-verzija': 'showFileUpload',
                    'click .zapri-podrobnosti': 'close',
                    'click .shrani-datoteko': 'shraniDatoteko'
                },
                ui: {
                    btnBrisi: '.brisi-datoteko',
                    btnUredi: '.uredi-datoteko',
                    btnNovaVerzija: '.novaVerzija'
                },
                initialize: function(options) {

                    if (options.owningObject) {
                        this.owningObject = options.owningObject;
                    }
                    this.readOnly = options.readOnly || false;
                    this.pokaziZapri = options.showClose || false;
                    this.listenTo(this.model, 'change', this.render);
                    _.bindAll(this, 'startUpload', 'endUploading', 'uploadSuccess', 'uploadFail');
                },
                templateHelpers: {
                    filesize: util.filesize
                },
                showFileUpload: function() {
                    this.$('#upload').show();
                    this.$('.loading').hide();
                    var self = this;
                    this.$('.fileupload').fileupload({
                        url: baseUrl + '/fs/datoteka/' + this.model.id + '/nalozi',
                        dataType: 'json',
                        type: 'POST',
                        start: this.startUpload
                    }).prop('disabled', !$.support.fileInput)
                            .parent()
                            .addClass($.support.fileInput ? undefined : 'disabled');

                    this.$('.fileupload').on('fileuploadprogressall', this.progress);
                    this.$('.fileupload').on('fileuploadstart', this.startUpload);
                    this.$('.fileupload').on('fileuploaddone', this.uploadSuccess);
                    this.$('.fileupload').on('fileuploadfail', this.uploadFail);
                    this.$('.fileupload').on('fileuploadalways', this.endUploading);

                },
                onRender: function() {
                    var hash = this.model.get('hash');
                    var naziv = this.model.get('naziv');
                    if (this.readOnly) {
                        this.ui.btnBrisi.attr('disabled', 'disabled');
                        this.ui.btnUredi.attr('disabled', 'disabled');
                        this.ui.btnNovaVerzija.attr('disabled', 'disabled');
                    }
                    if (typeof naziv === 'string' && hash === null) {
                        this.showFileUpload();
                    }
                    if (this.pokaziZapri) {
                        this.$('.zapri-podrobnosti').css('display', 'block');
                    }
                },
                urediDatoteko: function(e) {
                    this.trigger('datoteka:uredi', this.model);
                    return false;
                },
                shraniDatoteko: function(e) {

                },
                startUpload: function(e, data) {
                    this.$('.loading').show();
                    this.$('.loading').addClass('fa fa-spinning');
                },
                endUploading: function(e, data) {
                    this.$('.loading').removeClass('fa fa-spinning');
                    this.$('.loading').hide();
                },
                uploadSuccess: function(e, data) {
                    this.model.fetch();
                    this.trigger('datoteka:uploaded', this.owningObject);
                },
                uploadFail: function(event, widget) {
                    var fm = window.App.FlashManager;
                    fm.fromXhr(this.model, widget.jqXHR);
                },
                brisiDatoteko: function(event) {
                    this.trigger('datoteka:brisi', this.model);

                }
            });


            return DatotekaDetail;
        });
