<form>
    <div class="row">
        <div class="col-sm-6 col-lg-8">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="funkcija"></div>
                <div class="col-sm-12 col-lg-6" data-fields="status"></div>
            </div>
        </div>
        <div class="col-sm-6 col-lg-4">
            <div class="kontaktna-vnosno-polje">
                <div class="kontaktna-naslov">
                    <label class="">{{t "kontaktna.oseba"}}</label>
                    <div class="help-block hidden">{{t "kontaktna.d.oseba"}}</div>
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
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 col-md-offset-3" data-fields="opis"></div>
    </div>
</form>