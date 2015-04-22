/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/handlebars',
    "./CrumbsView",
    'text!../tpl/orodnavrstica.tpl',
    'text!../tpl/uporabnik.tpl',
    'text!../tpl/obvestila.tpl'
    
], function (
        Marionette,
        Handlebars,
        CrumbsView,
        orodnaVrsticaTpl,
        uporabnikTpl,
        obvestilaTpl
        ) {
    
    var ObvestilaView = Marionette.ItemView.extend({
       template: Handlebars.compile(obvestilaTpl),
       triggers : {
            'click' : 'ne'
        },
        
        onNe: function (){
            console.log("NE!!!");
        }
    });
    
    var UporabnikView = Marionette.ItemView.extend({
       template: Handlebars.compile(uporabnikTpl)
    });

    var OrodnaVrsticaView = Marionette.LayoutView.extend({
        initialize: function (options){
           
            this.listenTo(this.uporabnik , "bos:delal" , this.pd);
        },
        
        template: Handlebars.compile(orodnaVrsticaTpl),
        regions: {
            'uporabnik': "#uporabnik",
            'obvestila': "#obvestila",
            'crumbs': "#drobtine"
        },
        
        triggers : {
            'click #uporabnik' : 'bos:delal'
        },
        
        onBosDelal: function (){
            console.log("Bom DELAL!!!");
        },
        
        potrjeno: function(){
           console.log("potrjujem!!!");
        },
        
        onShow: function(){
            var up = new UporabnikView();
            var ob = new ObvestilaView();
            var cr = new CrumbsView({
                collection: this.options.crumbsColl
            });
            
            this.uporabnik.show(up);
            this.obvestila.show(ob);
            this.crumbs.show(cr);
            
            this.listenTo(ob, "ne" , this.potrjeno);
        }
    });
    
    

    return OrodnaVrsticaView;
});

