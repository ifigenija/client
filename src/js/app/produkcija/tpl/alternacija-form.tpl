<form>
    <div class="row">
        <div class="col-sm-6">
            <fieldset>
                <legend>
                    <span>{{t "alternacija.podatki"}}</span>
                </legend>
                <div class="prikazno-polje">
                    <div class="pull-right oseba vrednost">{{oseba.label}}</div>
                    <div class="attribut">{{t "alternacija.oseba"}}: </div>
                </div>
                <div class="prikazno-polje">
                    <div class="pull-right funkcija vrednost">{{funkcija.label}}</div>
                    <div class="attribut">{{t "alternacija.funkcija"}}: </div>
                    
                </div>
                <div class="prikazno-polje">
                    <div class="pull-right zacetek vrednost">{{u "date" zacetek}}</div>
                    <div class="attribut">{{t "alternacija.zacetek"}}: </div>
                </div>
                <div class="prikazno-polje">
                    <div class="pull-right konec vrednost">{{u "date" konec}}</div>
                    <div class="attribut">{{t "alternacija.konec"}}: </div>                    
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