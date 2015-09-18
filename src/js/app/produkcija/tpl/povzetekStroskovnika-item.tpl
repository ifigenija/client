<form>
    <div class="row">
        <div class="col-sm-4">
            <fieldset class="fieldset-povzetek">
                <legend>
                    <span>{{t "stroskovnik.povzetek"}}</span>
                </legend>
                <div class="prikazno-polje clearfix">{{t "stroskovnik.stZaposlenih"}}: <div class="pull-right vrednost ime">{{u "formatNumber" ime}}</div></div>
                <div class="prikazno-polje clearfix">{{t "stroskovnik.stHonorarnih"}}: <div class="pull-right vrednost ime">{{u "formatNumber" ime}}</div></div>
                <div class="prikazno-polje clearfix">{{t "stroskovnik.VrednostDo"}}: <div class="pull-right vrednost ime">{{u "formatNumber" ime}}</div></div>
                <div class="prikazno-polje clearfix">{{t "stroskovnik.VrednostNa"}}: <div class="pull-right vrednost ime">{{u "formatNumber" ime}}</div></div>
            </fieldset>
        </div>
    </div>
</form>