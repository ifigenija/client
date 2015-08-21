<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="uprizoritev,tipProgramskeEnote,ponoviDoma,ponoviZamejo,ponoviGost"></div>
                <div class="col-sm-12 col-lg-6">
                    <fieldset class="fieldset-stroski">
                        <legend>{{t "ep.stroski"}}</legend>
                        <div data-fields="avtorskiHonorarji,tantieme,avtorskePravice,materialni,celotnaVrednostGostovSZ"></div>
                        <div class="prikazno-polje">{{t "ep.nasDelez"}}: <div class="pull-right nasDelez">{{u "formatNumber" nasDelez}}</div></div>
                    </fieldset>
                    <div data-fields="avtorskiHonorarjiSamoz"></div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <fieldset class="fieldset-viri">
                        <legend>{{t "ep.viri"}}</legend>
                        <div class="prikazno-polje">{{t "ep.nasDelez"}}: <div class="pull-right nasDelez">{{u "formatNumber" nasDelez}}</div></div>
                        <div data-fields="vlozekGostitelja,drugiJavni,zaproseno"></div>
                        <div class="prikazno-polje">{{t "ep.lastnaSredstva"}}: <div class="pull-right lastnaSredstva">{{u "formatNumber" lastnaSredstva}}</div></div>
                    </fieldset>
                    <div class="prikazno-polje">{{t "ep.celotnaVrednost"}}: <div class="pull-right celotnaVrednost">{{u "formatNumber" celotnaVrednost}}</div></div>
                </div>
                <div class="col-sm-12 col-lg-6" data-fields="stZaposUmet,stZaposDrug,stHonorarnih,stHonorarnihIgr,stHonorarnihIgrTujJZ,stHonorarnihIgrSamoz,obiskDoma,obiskGost,obiskZamejo"></div>
            </div>
        </div>
    </div>
</form>