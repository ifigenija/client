<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-md-6" data-fields="naziv,avtorskiHonorarji,avtorskiHonorarjiSamoz,avtorskePravice,materialni,tantieme"></div>
                <div class="col-sm-12 col-md-6" data-fields="zaproseno,drugiJavni,obiskDoma,obiskGost"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-md-6" data-fields="obiskZamejo,obiskInt,ponoviDoma,ponoviZamejo,ponoviGost,ponoviInt"></div>
                <div class="col-sm-12 col-md-6" data-fields="stZaposlenih,stHonorarnih,stHonorarnihIgr,stHonorarnihIgrTujJZ,stHonorarnihIgrSamoz,imaKoprodukcije"></div>
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