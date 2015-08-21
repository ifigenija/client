<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-md-6" data-fields="naziv,ponoviDoma,ponoviZamejo,ponoviGost,ponoviInt,avtorskiHonorarji"></div>
                <div class="col-sm-12 col-md-6" data-fields="tantieme,avtorskePravice,materialni,zaproseno,drugiJavni"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-md-6" data-fields="avtorskiHonorarjiSamoz,stZaposlenih,stHonorarnih,stHonorarnihIgr,stHonorarnihIgrTujJZ"></div>
                <div class="col-sm-12 col-md-6" data-fields="stHonorarnihIgrSamoz,obiskDoma,obiskGost,obiskZamejo,obiskInt,imaKoprodukcije"></div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-6 col-md-2">
            <dl class="prikazno-polje">
                <dt class="prikazno-polje-naslov">{{t "ep.lastnaSredstva"}}: </dt>
                <dd class="prikazno-polje-opis">
                    <h3 class="lastnaSredstva">{{u "formatNumber" lastnaSredstva}}</h3>
                </dd>
            </dl>
        </div>
        <div class="col-xs-6 col-md-2">
            <dl class="prikazno-polje">
                <dt class="prikazno-polje-naslov">{{t "ep.celotnaVrednost"}}: </dt>
                <dd class="prikazno-polje-opis">
                    <h3 class="celotnaVrednost">{{u "formatNumber" celotnaVrednost}}</h3>
                </dd>
            </dl>
        </div>
        <div class="col-xs-6 col-md-2">
            <dl class="prikazno-polje">
                <dt class="prikazno-polje-naslov">{{t "ep.nasDelez"}}: </dt>
                <dd class="prikazno-polje-opis">
                    <h3 class="nasDelez">{{u "formatNumber" nasDelez}}</h3>
                </dd>
            </dl>
        </div>
    </div>
</form>