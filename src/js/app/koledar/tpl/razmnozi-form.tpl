<form>
    <div class="row">
        <div class="col-md-6">
            <fieldset>
                <legend>
                    <span>{{t "std.glavniPodatki"}}</span>
                </legend>
                <div data-fields="zacetek,konec"></div>
                
                <div id="stevilo" class="hide" data-fields="stevilo"></div>
            </fieldset>
        </div>
        <div class="col-md-6">
            <fieldset>
                <legend>
                    <span>{{t "vaja.razmnozi.nacinVnosa"}}</span>
                </legend>
                
                <div class="btn-group">
                <button class="btn btn-default btn-md">Tedenski vnos</button>

                <button class="btn btn-default btn-md">Hitri vnos</button>
                </div>
                    
                <div>
                    <div data-fields="upostevaj_praznike"></div>
                    <div data-fields="upostevaj_sobote"></div>
                    <div data-fields="upostevaj_nedelje"></div>
                </div>
            </fieldset>    
            
        </div>
    </div>
    <div id="tedenski" class="row panel panel-default zapisi-panel">

        <div class="panel-heading"> 
            
        <div class="col-md-3">{{t "vaja.razmnozi.terminDan"}}</div>
        
        <div class="col-md-1">{{t "vaja.razmnozi.ponedeljek"}}</div>
        <div class="col-md-1">{{t "vaja.razmnozi.torek"}}</div>
        <div class="col-md-1">{{t "vaja.razmnozi.sreda"}}</div>
        <div class="col-md-1">{{t "vaja.razmnozi.cetrtek"}}</div>
        <div class="col-md-1">{{t "vaja.razmnozi.petek"}}</div>
        <div class="col-md-1">{{t "vaja.razmnozi.sobota"}}</div>
        <div class="col-md-1">{{t "vaja.razmnozi.nedelja"}}</div>

        </div>
        
    </div>          
    {{#each termini}}
    <div class="row">
        <div class="col-md-3">
            {{ime}}
        </div>
        {{#each ../dni}}
        <div class="col-md-1">
            
            <div data-editors="chk_{{../kratica}}_{{this}}"></div>
        </div>
        {{/each}}
    </div>
    {{/each}}
    

</form>
