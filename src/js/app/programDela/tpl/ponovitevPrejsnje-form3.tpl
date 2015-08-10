<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="uprizoritev,tipProgramskeEnote,avtorskiHonorarji,avtorskiHonorarjiSamoz,tantieme,avtorskePravice"></div>
                <div class="col-sm-12 col-lg-6" data-fields="materialni,zaproseno,drugiJavni,celotnaVrednostGostovSZ,vlozekGostitelja"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="obiskDoma,obiskGost,obiskZamejo,ponoviDoma,ponoviZamejo,ponoviGost"></div>
                <div class="col-sm-12 col-lg-6" data-fields="stZaposUmet,stZaposDrug,stHonorarnih,stHonorarnihIgr,stHonorarnihIgrTujJZ,stHonorarnihIgrSamoz"></div>
                <div class="col-sm-12 col-lg-6 col-lg-offset-6">
                    <dl class="pull-right">
                        <dt>{{t "ep.lastnaSredstva"}}: </dt>
                        <dd class="lastnaSredstva">{{u "formatNumber" lastnaSredstva}}</dd>
                        <dt>{{t "ep.celotnaVrednost"}}: </dt>
                        <dd class="celotnaVrednost">{{u "formatNumber" celotnaVrednost}}</dd>                        
                        <dt>{{t "ep.nasDelez"}}: </dt>
                        <dd class="nasDelez">{{u "formatNumber" nasDelez}}</dd>
                        <dt>{{t "ep.datumZacStudija"}}: </dt>
                        <dd>{{u "date" datumZacStudija}}</dd>
                        <dt>{{t "ep.datumPremiere"}}: </dt>
                        <dd>{{u "date" datumPremiere}}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</form>