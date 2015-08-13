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