<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="uprizoritev,tipProgramskeEnote,avtorskiHonorarji,avtorskiHonorarjiSamoz"></div>
                <div class="col-sm-12 col-lg-6" data-fields="tantieme,avtorskePravice,materialni,zaproseno"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="drugiJavni,obiskDoma,stZaposUmet,stZaposDrug"></div>
                <div class="col-sm-12 col-lg-6" data-fields="stHonorarnih,stHonorarnihIgr,stHonorarnihIgrTujJZ,stHonorarnihIgrSamoz"></div>
                <div class="col-sm-12 col-lg-6 col-lg-offset-6">
                    <dl class="pull-right">
                        <dt>{{t "ep.lastnaSredstva"}}: </dt>
                        <dd class="lastnaSredstva">{{u "formatNumber" lastnaSredstva}}</dd>
                        <dt>{{t "ep.celotnaVrednost"}}: </dt>
                        <dd class="celotnaVrednost">{{u "formatNumber" celotnaVrednost}}</dd>                        
                        <dt>{{t "ep.nasDelez"}}: </dt>
                        <dd class="nasDelez">{{u "formatNumber" nasDelez}}</dd>
                        <dt>{{t "ep.datumZacStudija"}}: </dt>
                        <dd>{{u "formatNumber" datumZacStudija}}</dd>
                        <dt>{{t "ep.datumPremiere"}}: </dt>
                        <dd>{{u "formatNumber" datumPremiere}}</dd>                        
                    </dl>
                </div>
            </div>
        </div>
    </div>
</form>