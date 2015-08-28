<form>
    <div class="row">
        <div class="col-sm-6">
            <div data-fields="funkcija,oseba"></div>
            <div class="row">
                <div class="col-sm-9">
                    <div data-fields="pogodba"></div>
                </div>
                <div class="col-sm-3 vnosno-polje-gumb">
                    <a class="btn btn-default pogodba-dodaj">
                        {{#if imaPogodbo}}
                        {{t "std.uredi"}}
                        {{else}}
                        {{t "std.dodaj"}}
                        {{/if}}
                    </a>
                </div>
            </div>
            <div data-fields="zaposlitev"></div>
        </div>
        <div class="col-sm-6"data-fields="zacetek,konec,sifra,pomembna,privzeti,aktivna"></div>
    </div>
    <div class="row">
        <div class="col-sm-6 col-md-offset-3" data-fields="opomba"></div>
    </div>
</form>