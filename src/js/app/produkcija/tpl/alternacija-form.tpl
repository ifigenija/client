<form>
    <div class="row">
        <div class="col-sm-6">
            <fieldset class="fieldset-podatki">
                <legend>
                    <span>{{t "alternacija.podatki"}}</span>
                </legend>
                <div data-fields="oseba,funkcija"></div>
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
                <div data-fields="zaposlitev"></div>
            </fieldset>
        </div>
        <div class="col-sm-6">
            <fieldset class="fieldset-podatki">
                <legend>
                    <span>{{t "alternacija.dodatniPodatki"}}</span>
                </legend>
                <div data-fields="zacetek,konec,sifra,pomembna,privzeti"></div>
            </fieldset>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6 col-md-offset-3" data-fields="opomba"></div>
    </div>
</form>