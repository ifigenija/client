<form>
    <fieldset>
        <div class="row">
            <div class="col-sm-6">
                <div class="vnosno-polje">
                    <div class="naslov">
                        <label class="">{{t "avtorBesedila.oseba"}}</label>
                        <div class="help-block hidden">{{t "avtorBesedila.d.oseba"}}</div>
                        <div class="error-block"></div>
                    </div>
                    <div style="width: 100%; display: table;">
                        <div style="display: table-row">
                            <div class="izbor"  data-editors="oseba">  </div>
                            <div class="dodaj">
                                <a class="btn btn-default gumb dodaj-osebo" title="{{t "std.title.dodajOsebo"}}">
                                    <i class="fa fa-user-plus"> </i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-fields="tipAvtorja"></div>
            </div>
            <div class="col-sm-6" data-fields="zaporedna,aliVNaslovu"></div>
        </div>
    </fieldset>
</form>