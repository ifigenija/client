<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="uprizoritev,gostitelj,ustanova,krajGostovanja,drzavaGostovanja"></div>
                <div class="col-sm-12 col-lg-6" data-fields="datumGostovanja,ponoviInt,obiskInt,avtorskiHonorarji,avtorskiHonorarjiSamoz"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="avtorskePravice,materialni,tantieme,zaproseno,vlozekGostitelja"></div>
                <div class="col-sm-12 col-lg-6" data-fields="transportniStroski,dnevPrvZad,drugiJavni,imaKoprodukcije"></div>
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