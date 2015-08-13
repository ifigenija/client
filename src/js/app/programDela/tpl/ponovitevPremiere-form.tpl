<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="uprizoritev,tipProgramskeEnote,avtorskiHonorarji,avtorskiHonorarjiSamoz,materialni"></div>
                <div class="col-sm-12 col-lg-6" data-fields="tantieme,zaproseno,avtorskePravice,drugiJavni"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="celotnaVrednostGostovSZ,vlozekGostitelja,stHonorarnih,obiskDoma,obiskGost"></div>
                <div class="col-sm-12 col-lg-6" data-fields="obiskZamejo,ponoviDoma,ponoviZamejo,ponoviGost"></div>
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