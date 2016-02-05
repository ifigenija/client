<form id="razmnozi-form">
    <div class="row">
        <div class="col-md-6">
            <fieldset>
                <legend>
                    <span>{{t "std.glavniPodatki"}}</span>
                </legend>
                <div id="zacetek-konec" data-fields="zacetek,konec"></div>
                
                <div data-fields="stevilo_ponovitev" id="stevilo-ponovitev" style="display: none"></div>
            </fieldset>
        </div>
        <div class="col-md-6">
            <fieldset>
                <legend>
                    <span>{{t "vaja.razmnozi.nacinVnosa"}}</span>
                </legend>
                
                <div class="btn-group" style="padding-bottom: 8px">
                <a class="btn btn-default btn-md btnTedenski disabled" id="btnTedenski" style="margin-right: 4px">Tedenski vnos</a>
                <a class="btn btn-default btn-md btnHitri" id="btnHitri">Hitri vnos</a>
                </div>
                    
                <div>
                    <div data-fields="upostevaj_praznike"></div>
                    <div data-fields="upostevaj_sobote" id="upostevaj-sobote" style="display: none"></div>
                    <div data-fields="upostevaj_nedelje" id="upostevaj-nedelje" style="display: none"></div>
                </div>
            </fieldset>    
            
        </div>
    </div>
                

 
    <div class="panel panel-default" id="tedenski">
    <div class="panel-heading">Tedenski vnos</div>
    <div class="panel-body">
    
    <table class="table">
      <thead>
      <tr>
      <th>{{t "vaja.razmnozi.terminDan"}}</th>
      <th>Od: [hh:mm]</th>
      <th>{{t "vaja.razmnozi.ponedeljek"}}</th>
      <th>{{t "vaja.razmnozi.torek"}}</th>
      <th>{{t "vaja.razmnozi.sreda"}}</th>
      <th>{{t "vaja.razmnozi.cetrtek"}}</th>
      <th>{{t "vaja.razmnozi.petek"}}</th>
      <th>{{t "vaja.razmnozi.sobota"}}</th>
      <th>{{t "vaja.razmnozi.nedelja"}}</th>
      </tr>      
      </thead>

       <tbody>        
   
        
      {{#each termini}}
      <tr> 
        <td>{{ime}}</td>
        <td><div data-editors="time_{{kratica}}"></div></td>
        {{#each ../dni}}
        <td>          
            <div data-editors="chk_{{../kratica}}_{{this}}"></div>
        </td>
        {{/each}}
      </tr>
      {{/each}}
    
      </tbody> 
    </table>
  </div>
<div data-fields="show_mode"></div>       
        
</form>
<style type="text/css">
    .koledar-razmnozi {
        width:56px;
        margin-right: 4px;
    }
</style>