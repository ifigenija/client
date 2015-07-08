<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <div class="panel panel-default panel-form glava-panel paginated-grid">
        <div class="panel-heading" role="tab" id="headingOne">
            <div class="clearfix">
                <h4 class="glava-title" data-toggle="collapse" data-parent="#accordion" href="#podatki" aria-expanded="true" aria-controls="podatki">
                    {{t "festival.oFestivalu"}}
                </h4>

            </div>
        </div>
        <div id="podatki" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6 col-md-3" data-fields="naziv,zvrst,stPredstav"></div>
                        <div class="col-sm-6 col-md-3" data-fields="stPredavanj,stPredstavitev,stDelavnic"></div>
                        <div class="col-sm-6 col-md-3" data-fields="stDrugiDogodki,stProdukcij,obiskDoma"></div>
                        <div class="col-sm-6 col-md-3" data-fields="casPriprave,casIzvedbe,prizorisca"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-md-offset-3" data-fields="opredelitevDrugiDogodki"></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="panel panel-default panel-form glava-panel paginated-grid">
        <div class="panel-heading">
            <div class="clearfix">
                <h4 class="glava-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#koprodukcija" aria-expanded="false" aria-controls="koprodukcija">
                    {{t "festival.koprodukcija"}}
                </h4>

            </div>
        </div>
        <div id="koprodukcija" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div class="panel-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6" data-fields="umetVodja,programskoTelo,soorganizatorji"></div>
                        <div class="col-sm-6" data-fields="stTujihSelektorjev,stZaposlenih,stHonorarnih"></div>
                    </div>
            </div>
            </form>
        </div>
    </div>
    <div class="panel panel-default panel-form glava-panel paginated-grid">
        <div class="panel-heading">
            <div class="clearfix">
                <h4 class="glava-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#finance" aria-expanded="false" aria-controls="finance">
                    {{t "festival.finance"}}
                </h4>

            </div>
        </div>
        <div id="finance" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            <div class="panel-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6" data-fields="zaproseno,celotnaVrednost,nasDelez"></div>
                        <div class="col-sm-6" data-fields="lastnaSredstva,vlozekKoproducenta,drugiJavni"></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>