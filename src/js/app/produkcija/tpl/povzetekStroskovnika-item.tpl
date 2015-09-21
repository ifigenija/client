<form>
    <div class="row">
        <div class="col-sm-6">
            <fieldset class="fieldset-podatki">
                <legend>
                    <span>{{t "stroskovnik.osnovniPodatki"}}</span>
                </legend>
                <div class="prikazno-polje clearfix">{{t "podUpr.naziv"}}: <div class="pull-right vrednost">{{stroski.naziv}}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.datumPremiere"}}: <div class="pull-right vrednost">{{u "date" stroski.datumPremiere}}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.datumZacStudija"}}: <div class="pull-right vrednost">{{u "date" stroski.datumZacStudija}}</div></div>
            </fieldset>
        </div>
        <div class="col-sm-6">
            <fieldset class="fieldset-povzetek">
                <legend>
                    <span>{{t "stroskovnik.zaposleni"}}</span>
                </legend>
                <div class="prikazno-polje clearfix">{{t "podUpr.stHonorarnih"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.stHonorarnih 0}}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.stHonorarnihIgr"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.stHonorarnihIgr 0}}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.stHonorarnihIgrSamoz"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.stHonorarnihIgrSamoz 0}}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.stHonorarnihIgrTujJZ"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.stHonorarnihIgrTujJZ 0}}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.stZaposUmet"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.stZaposUmet 0}}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.stZaposDrug"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.stZaposDrug 0}}</div></div>
            </fieldset>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <fieldset class="fieldset-vrednostDo">
                <legend>
                    <span>{{t "stroskovnik.vrednostDo"}}</span>
                </legend>
                <div class="prikazno-polje clearfix">{{t "podUpr.avtorskePravice"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.Do.avtorskePravice }}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.avtorskiHonorarji"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.Do.avtorskiHonorarji}}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.avtorskiHonorarjiSamoz"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.Do.avtorskiHonorarjiSamoz}}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.materialni"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.Do.materialni}}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.nasDelez"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.Do.nasDelez}}</div></div>
            </fieldset>
        </div>
        <div class="col-sm-6">
            <fieldset class="fieldset-vrednostNa">
                <legend>
                    <span>{{t "stroskovnik.vrednostNa"}}</span>
                </legend>
                <div class="prikazno-polje clearfix">{{t "podUpr.avtorskePravice"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.Na.avtorskePravice }}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.avtorskiHonorarji"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.Na.avtorskiHonorarji }}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.avtorskiHonorarjiSamoz"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.Na.avtorskiHonorarjiSamoz }}</div></div>
                <div class="prikazno-polje clearfix">{{t "podUpr.materialni"}}: <div class="pull-right vrednost">{{u "formatNumber" stroski.Na.materialni }}</div></div>
            </fieldset>
        </div>
    </div>
</div>
</form>