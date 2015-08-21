<form>
    <div class="row">
        <div class="col-sm-6">
            <div data-fields="sifra,funkcija,oseba"></div>
            <div class="row">
                <div class="col-sm-10">
                    <div data-fields="pogodba"></div>
                </div>
                <div class="col-sm-2">
                    <a class="pull-right btn btn-default pogodba-dodaj">
                        {{#if imaPogodbo}}
                        {{t "std.uredi"}}
                        {{else}}
                        {{t "std.dodaj"}}
                        {{/if}}
                    </a>
                </div>
            </div>
        </div>
        <div class="col-sm-6"data-fields="zacetek,konec,zaposlitev,pomembna,privzeti,aktivna"></div>
    </div>
    <div class="row">
        <div class="col-sm-6 col-md-offset-3" data-fields="opomba"></div>
    </div>
</form>