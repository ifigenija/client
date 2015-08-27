<form>
    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-6 col-md-6">
                    <fieldset data-fields="uprizoritev,gostitelj,ponoviInt,ponoviKoprInt,ustanova,krajGostovanja,drzavaGostovanja,datumGostovanja,imaKoprodukcije">
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
                        <div data-fields="avtorskiHonorarji,tantieme,materialni,transportniStroski,dnevPrvZad"></div>
                        <div class="prikazno-polje">{{t "ep.nasDelez"}}: <div class="pull-right nasDelez vrednost">{{u "formatNumber" nasDelez}}</div></div>
                    </fieldset>
                    <div data-fields="avtorskiHonorarjiSamoz"></div>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="row">
                <div class="col-sm-12">
                    <fieldset class="fieldset-viri">
                        <legend>
                            <span>{{t "ep.viri"}}</span>
                        </legend>
                        <div class="prikazno-polje">{{t "ep.nasDelez"}}: <div class="pull-right nasDelez vrednost">{{u "formatNumber" nasDelez}}</div></div>
                        <div data-fields="vlozekGostitelja,drugiJavni,zaproseno"></div>
                        <div class="prikazno-polje clearfix">{{t "ep.lastnaSredstva"}}: <div class="pull-right lastnaSredstva vrednost">{{u "formatNumber" lastnaSredstva}}</div></div>
                        <div class="prikazno-polje clearfix">{{t "ep.celotnaVrednost"}}: <div class="pull-right celotnaVrednost vrednost">{{u "formatNumber" celotnaVrednost}}</div></div>
                    </fieldset>
                    <fieldset data-fields="obiskInt,obiskKoprInt">
                        <legend>
                            <span>{{t "ep.obiskovalci"}}</span>
                        </legend>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</form>