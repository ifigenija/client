<form>
    <div class="row">
        <div class="col-sm-6 col-md-3" data-fields="naziv,zvrst,stPredstav,stPredstavitev,stDelavnic"></div>
        <div class="col-sm-6 col-md-3" data-fields="stOkroglihMiz,stDrugiDogodki,stProdukcij,obiskDoma,casPriprave"></div>
        <div class="col-sm-6 col-md-3" data-fields="casIzvedbe,imaKoprodukcije,umetVodja,programskoTelo,stTujihSelektorjev,prizorisca"></div>
        <div class="col-sm-6 col-md-3" data-fields="stZaposlenih,stHonorarnih,nasDelez,zaproseno,drugiJavni"></div>
    </div>
    <div class="row">
        <div class="col-xs-6 col-md-2">
            <dl class="prikazno-polje">
                <dt class="prikazno-polje-naslov">{{t "ep.lastnaSredstva"}}: </dt>
                <dd class="prikazno-polje-opis lastnaSredstva">
                    <h3>{{u "formatNumber" lastnaSredstva}}</h3>
                </dd>
            </dl>
        </div>
        <div class="col-xs-6 col-md-2">
            <dl class="prikazno-polje">
                <dt class="prikazno-polje-naslov">{{t "ep.celotnaVrednost"}}: </dt>
                <dd class="prikazno-polje-opis celotnaVrednost">
                    <h3>{{u "formatNumber" celotnaVrednost}}</h3>
                </dd>
            </dl>
        </div>
        <div class="col-xs-6 col-md-2">
            <dl class="prikazno-polje">
                <dt class="prikazno-polje-naslov">{{t "ep.nasDelez"}}: </dt>
                <dd class="prikazno-polje-opis nasDelez">
                    <h3>{{u "formatNumber" nasDelez}}</h3>
                </dd>
            </dl>
        </div>
        <div class="col-xs-6 col-md-3">
            <dl class="prikazno-polje">
                <dt class="prikazno-polje-naslov">{{t "ep.datumZacStudija"}}: </dt>
                <dd class="prikazno-polje-opis">
                    <h3>{{u "date" datumZacStudija}}</h3>
                </dd>
            </dl>
        </div>
        <div class="col-xs-6 col-md-3">
            <dl class="prikazno-polje">
                <dt class="prikazno-polje-naslov">{{t "ep.datumPremiere"}}: </dt>
                <dd class="prikazno-polje-opis">
                    <h3>{{u "date" datumPremiere}}</h3>
                </dd>
            </dl>
        </div>
    </div>
</form>
