<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="zaposlitev-vnosno-polje">
                                <div class="zaposlitev-naslov">
                                    <label class="">{{t "zaposlitev.oseba"}}</label>
                                    <div class="help-block hidden">{{t "zaposlitev.d.oseba"}}</div>
                                    <div class="error-block"></div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-10" data-editors="oseba"></div>
                                    <div class="col-sm-2">
                                        <a class="btn btn-default oseba-nova" title="{{t "std.title.vnesiOseba"}}">
                                            <i class="fa fa-user-plus"> </i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12" data-fields="delovnoMesto"></div>
                        <div class="col-sm-12" data-fields="status"></div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6" data-fields="zacetek,konec"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="delovnaObveza,izmenskoDelo,individualnaPogodba"></div>
                <div class="col-sm-12 col-lg-6" data-fields="jeZaposlenVdrugemJz,jeNastopajoci,sifra"></div>
            </div>
        </div>
    </div>
</form>