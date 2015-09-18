<form>
    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-6 col-md-6">
                    <fieldset data-fields="uprizoritev,tipProgramskeEnote,kpe,sort">
                        <legend>
                            <span>{{t "ep.podatki"}}</span>
                        </legend>
                    </fieldset>
                    <fieldset class="fieldset-stroski">
                        <legend>
                            <span>{{t "ep.stroski"}}</span>
                        </legend>
                        <div data-fields="avtorskiHonorarji,tantieme,avtorskePravice,materialni"></div>
                        <div class="prikazno-polje">{{t "ep.nasDelez"}}: <div class="pull-right nasDelez vrednost">{{u "formatNumber" nasDelez}}</div></div>
                    </fieldset>
                    <div data-fields="avtorskiHonorarjiSamoz"></div>
                </div>
                <div class="col-sm-6 col-md-6">
                    <fieldset class="fieldset-viri">
                        <legend>
                            <span>{{t "ep.viri"}}</span>
                        </legend>
                        <div data-fields="drugiJavni,zaproseno"></div>
                        <div class="prikazno-polje clearfix">{{t "ep.drugiViri"}}: <div class="pull-right drugiViriVsota vrednost">{{u "formatNumber" drugiViriVsota}}</div></div>
                        <div class="prikazno-polje clearfix">{{t "ep.lastnaSredstva"}}: <div class="pull-right lastnaSredstva vrednost">{{u "formatNumber" lastnaSredstva}}</div></div>
                        <div class="prikazno-polje clearfix">{{t "ep.nasDelez"}}: <div class="pull-right nasDelez vrednost">{{u "formatNumber" nasDelez}}</div></div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <span>{{t "ep.vrednostProjekta"}}</span>
                        </legend>
                        <div class="prikazno-polje clearfix"><div class="pull-right celotnaVrednost vrednost">{{u "formatNumber" celotnaVrednost}}</div></div>
                    </fieldset>
                    <fieldset data-fields="priKoproducentu,obiskDoma,obiskKopr">
                        <legend>
                            <span>{{t "ep.obiskovalci"}}</span>
                        </legend>
                    </fieldset>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="row">
                <div class="col-sm-12">
                    <fieldset data-fields="stZaposUmet,stZaposDrug,stHonorarnih,stHonorarnihIgr,stHonorarnihIgrTujJZ,stHonorarnihIgrSamoz">
                        <legend>
                            <span>{{t "ep.sodelavci"}}</span>
                        </legend>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</form>