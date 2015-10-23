<form>
    <div class="row">
        <div class="col-sm-6">
            <fieldset class="fieldset-alternacija">
                <legend>
                    <span>{{t "std.glavniPodatki"}}</span>
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
                    <span>{{t "std.dodatniPodatki"}}</span>
                </legend>
                <div class="vnosno-polje">
                    <div class="naslov">
                        <label class="">{{t "avtorBesedila.oseba"}}</label>
                        <div class="help-block hidden">{{t "avtorBesedila.d.oseba"}}</div>
                        <div class="error-block"></div>
                    </div>
                    <div class="polje-z-gumbom">
                        <div class="izbor"  data-editors="pogodba"></div>
                        <a class="btn btn-default dodaj dodaj-pogodbo" title="{{t "std.title.dodajPogodbo"}}">
                            {{#if imaPogodbo}}
                            <i id="icon" class="fa fa-pencil-square-o"></i>
                            {{else}}
                            <i id="icon" class="fa fa-plus"></i>
                            {{/if}}
                        </a>
                    </div>
                </div>
                <div data-fields="zaposlitev,sifra"></div>
            </fieldset>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 col-md-offset-3" data-fields="opomba"></div>
    </div>
</form>