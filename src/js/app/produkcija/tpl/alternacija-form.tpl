<form>
    <div class="row">
        <div class="col-sm-6 col-bottom">
            <fieldset>
                <legend>
                    <span>{{t "alternacija.podatki"}}</span>
                </legend>
                <div class="prikazno-polje">
                    <span class="prikazno-polje-attribut">{{t "alternacija.oseba"}}: </span>
                    <div class="pull-right oseba prikazno-polje-vrednost">{{oseba.label}}</div>
                    <div class="clearfix"></div>
                </div>
                <div class="prikazno-polje">
                    <span class="prikazno-polje-attribut">{{t "alternacija.funkcija"}}: </span>
                    <div class="pull-right funkcija prikazno-polje-vrednost">{{funkcija.label}}</div>
                    <div class="clearfix"></div>
                </div>
                <div class="prikazno-polje">
                    <span class="prikazno-polje-attribut">{{t "alternacija.zacetek"}}: </span>
                    <div class="pull-right zacetek prikazno-polje-vrednost">{{u "date" zacetek}}</div>
                    <div class="clearfix"></div>
                </div>
                <div class="prikazno-polje">
                    <span class="prikazno-polje-attribut">{{t "alternacija.konec"}}: </span>
                    <div class="pull-right konec prikazno-polje-vrednost">{{u "date" konec}}</div>
                    <div class="clearfix"></div>
                </div>
            </fieldset>
        </div>
        <div class="col-sm-6">
            <fieldset>
                <legend>
                    <span>{{t "alternacija.dodatniPodatki"}}</span>
                </legend>
                <div class="alternacija-vnosno-polje">
                    <div class="alternacije-naslov">
                        <label class="">{{t "alternacija.pogodba"}}</label>
                        <div class="help-block hidden">{{t "alternacija.d.pogodba"}}</div>
                        <div class="error-block"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-9" data-editors="pogodba"></div>
                        <div class="col-sm-3">
                            <a class="btn btn-default pogodba-dodaj">
                                {{#if imaPogodbo}}
                                {{t "std.uredi"}}
                                {{else}}
                                {{t "std.dodaj"}}
                                {{/if}}
                            </a>
                        </div>
                    </div>
                </div> 
                <div data-fields="zaposlitev,sifra"></div>
            </fieldset>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6 col-md-offset-3" data-fields="opomba"></div>
    </div>
</form>