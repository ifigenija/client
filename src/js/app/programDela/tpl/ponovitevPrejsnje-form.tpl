<form>
    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-6 col-md-6">
                    <fieldset data-fields="uprizoritev,tipProgramskeEnote,ponoviDoma,ponoviKopr,ponoviZamejo,ponoviKoprZamejo,ponoviGost,ponoviKoprGost,sort">
                        <legend>
                            <span>{{t "ep.podatki"}}</span>
                        </legend>
                    </fieldset>
                </div>
                <div class="col-sm-6 col-md-6">
                    <fieldset class="fieldset-stroski">
                        <legend>
                            <span>{{t "ep.stroski"}}</span>
                        </legend>
                        <div data-fields="avtorskiHonorarji,tantieme,materialni"></div>
                        <div class="prikazno-polje">{{t "ep.nasDelez"}}: <div class="pull-right nasDelez vrednost">{{u "formatNumber" nasDelez}}</div></div>
                    </fieldset>
                    <div data-fields="avtorskiHonorarjiSamoz"></div>
                    <fieldset class="fieldset-viri">
                        <legend>
                            <span>{{t "ep.viri"}}</span>
                        </legend>
                        <div data-fields="vlozekGostitelja,drugiJavni,zaproseno"></div>
                        <div class="prikazno-polje clearfix">{{t "ep.drugiViri"}}: <div class="pull-right drugiViriVsota vrednost">{{u "formatNumber" drugiViriVsota}}</div></div>
                        <div class="prikazno-polje clearfix">{{t "ep.lastnaSredstva"}}: <div class="pull-right lastnaSredstva vrednost">{{u "formatNumber" lastnaSredstva}}</div></div>
                        <div class="prikazno-polje clearfix">{{t "ep.nasDelez"}}: <div class="pull-right nasDelez vrednost">{{u "formatNumber" nasDelez}}</div></div>
                    </fieldset>
                    <fieldset class="fieldset-vrednosti">
                        <legend>
                            <span>{{t "ep.vrednost"}}</span>
                        </legend>
                        <div data-fields="celotnaVrednostGostovSZ"></div>
                        <div class="prikazno-polje clearfix">{{t "ep.celotnaVrednostMat"}}: <div class="pull-right celotnaVrednostMat vrednost">{{u "formatNumber" celotnaVrednostMat}}</div></div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <span>{{t "ep.vrednostProjekta"}}</span>
                        </legend>
                        <div class="help-block hidden">{{t "ep.d.celotnaVrednost"}}</div>
                        <div class="prikazno-polje clearfix"><div class="pull-right celotnaVrednost vrednost">{{u "formatNumber" celotnaVrednost}}</div></div>
                    </fieldset>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="row">
                <div class="col-sm-12">
                    <fieldset data-fields="obiskDoma,obiskKopr,obiskZamejo,obiskKoprZamejo,obiskGost,obiskKoprGost">
                        <legend>
                            <span>{{t "ep.obiskovalci"}}</span>
                        </legend>
                    </fieldset>
                    <fieldset data-fields="stZaposUmet,stZaposDrug,stHonorarnihZun,stHonorarnihZunIgr,stHonorarnihZunIgrTujJZ,stHonorarnihZunSamoz">
                        <legend>
                            <span>{{t "ep.sodelavci"}}</span>
                        </legend>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</form>