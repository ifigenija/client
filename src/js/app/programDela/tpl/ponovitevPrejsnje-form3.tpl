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
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-6 col-md-2">
            <dl>
                <dt>{{t "ep.lastnaSredstva"}}: </dt>
                <dd class="lastnaSredstva">{{u "formatNumber" lastnaSredstva}}</dd>
            </dl>
        </div>
        <div class="col-xs-6 col-md-2">
            <dl>
                <dt>{{t "ep.celotnaVrednost"}}: </dt>
                <dd class="celotnaVrednost">{{u "formatNumber" celotnaVrednost}}</dd>
            </dl>
        </div>
        <div class="col-xs-6 col-md-2">
            <dl>
                <dt>{{t "ep.nasDelez"}}: </dt>
                <dd class="nasDelez">{{u "formatNumber" nasDelez}}</dd>
            </dl>
        </div>
        <div class="col-xs-6 col-md-3">
            <dl>
                <dt>{{t "ep.datumZacStudija"}}: </dt>
                <dd>{{u "date" datumZacStudija}}</dd>
            </dl>
        </div>
        <div class="col-xs-6 col-md-3">
            <dl>
                <dt>{{t "ep.datumPremiere"}}: </dt>
                <dd>{{u "date" datumPremiere}}</dd>
            </dl>
        </div>
    </div>
</form>