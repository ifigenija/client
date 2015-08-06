<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="uprizoritev,tipProgramskeEnote,avtorskiHonorarji,tantieme"></div>
                <div class="col-sm-12 col-lg-6" data-fields="avtorskePravice,materialni,zaproseno"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="drugiJavni,obiskDoma,stZaposUmet,stZaposDrug"></div>
                <div class="col-sm-12 col-lg-6" data-fields="stHonorarnih,stHonorarnihIgr,stHonorarnihIgrTujJZ,stHonorarnihIgrSamoz"></div>
                <div class="col-sm-12 col-lg-6 col-lg-offset-6">
                    <dl class="pull-right">
                        <dt>{{t "ep.lastnaSredstva"}}: </dt>
                        <dd>{{u "formatNumber" lastnaSredstva}}</dd>
                        <dt>{{t "ep.celotnaVrednost"}}: </dt>
                        <dd>{{u "formatNumber" celotnaVrednost}}</dd>
                        <dt>{{t "ep.datumZacStudija"}}: </dt>
                        <dt>{{t "ep.nasDelez"}}: </dt>
                        <dd>{{u "formatNumber" nasDelez}}</dd>
                        <dd>{{u "formatNumber" datumZacStudija}}</dd>
                        <dt>{{t "ep.datumPremiere"}}: </dt>
                        <dd>{{u "formatNumber" datumPremiere}}</dd>                        
                    </dl>
                </div>
            </div>
        </div>
    </div>
</form>