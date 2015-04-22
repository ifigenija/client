/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/handlebars'
    
], function (Marionette, Handlebars) {
   
   var Crumb = Marionette.ItemView.extend({
       tagName: "li",
       template: Handlebars.compile("<span class=\"crumb-delimiter\"> > </span> <a href=\"{{ url }}\">{{label}} {{stevec}} </a>"),
       events: {           
           "click .crumb-delimiter": "vstopil"
       },
       
       vstopil: function () {
           
           this.model.set({"stevec":(this.model.get("stevec ") || 0) + 1 });
       }
       
   });
   
   var CrumbsView = Marionette.CollectionView.extend({
       tagName: "ul",
       className: "list-inline",
       childView: Crumb
   });
   
   
   return CrumbsView;
});
