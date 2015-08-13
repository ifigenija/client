<form>
    <div class="row">
        <div class="col-sm-6 col-md-3" data-fields="naziv,zvrst,stPredstav,stPredstavitev,stDelavnic"></div>
        <div class="col-sm-6 col-md-3" data-fields="stOkroglihMiz,stDrugiDogodki,stProdukcij,obiskDoma,casPriprave"></div>
        <div class="col-sm-6 col-md-3" data-fields="casIzvedbe,imaKoprodukcije,umetVodja,programskoTelo,stTujihSelektorjev,prizorisca"></div>
        <div class="col-sm-6 col-md-3" data-fields="stZaposlenih,stHonorarnih,nasDelez,zaproseno,drugiJavni"></div>
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
