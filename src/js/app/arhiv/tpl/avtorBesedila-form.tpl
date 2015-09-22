<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="avtor-vnosno-polje">
                <div class="avtor-naslov">
                    <label class="">{{t "avtorBesedila.oseba"}}</label>
                    <div class="help-block hidden">{{t "avtorBesedila.d.oseba"}}</div>
                    <div class="error-block"></div>
                </div>
                <div class="row">
                    <div class="col-sm-10" data-editors="oseba"></div>
                    <div class="col-sm-2">
                        <a class="btn btn-default dodaj-osebo" title="{{t "std.title.vnesiOseba"}}">
                            <i class="fa fa-user-plus"> </i>
                        </a>
                    </div>
                </div>
            </div>
            <div data-fields="tipAvtorja"></div>
        </div>
        <div class="col-sm-6" data-fields="zaporedna,aliVNaslovu"></div>
    </div>
</form>