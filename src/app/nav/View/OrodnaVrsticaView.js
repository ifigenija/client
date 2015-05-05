/* 
 * Licenca GPLv3
 */
define([
    'backbone',
    'marionette',
    'app/bars',
    "./CrumbsView",
    'text!../tpl/orodnavrstica.tpl',
    'text!../tpl/uporabnik.tpl',
    'text!../tpl/obvestila.tpl'
    
], function (
        Backbone,
        Marionette,
        Handlebars,
        CrumbsView,
        orodnaVrsticaTpl,
        uporabnikTpl,
        obvestilaTpl
        ) {
    

    
    var UporabnikView = Marionette.ItemView.extend({
       template: Handlebars.compile(uporabnikTpl)
    });

    var OrodnaVrsticaView = Marionette.LayoutView.extend({
        initialize: function (options){
           
        },
        
        template: Handlebars.compile(orodnaVrsticaTpl),
        regions: {
            'uporabnikR': "#uporabnik",
            'obvestilaR': "#obvestila",
            'crumbsR': "#drobtine"
        },
        
        triggers : {
            'click #uporabnik' : 'bos:delal'
        },
        
  
        
        onShow: function(){
            var up = new UporabnikView({
                model: new Backbone.Model(this.options.user)
            });
            
            var cr = new CrumbsView({
                collection: this.options.crumbsColl
            });
            
            this.uporabnikR.show(up);
      
            this.crumbsR.show(cr);
            
        }
    });
    
    

    return OrodnaVrsticaView;
});

