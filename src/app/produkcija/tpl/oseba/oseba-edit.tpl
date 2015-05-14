<div class="page-header clearfix">
    <div class="region-doctoolbar pull-right"></div>
    <h2>{{ docNaslov }}</h2>
</div>


<div role="tabpanel">

    <!-- Nav tabs -->
    <ul class="nav nav-tabs oseba-tabs" role="tablist">
        <li role="presentation" class="tab-splosno active"><a href="javascript:void(0)">{{t 'seznami.view.splosno'}}</a></li>
        <li role="presentation" class="tab-kontakti"><a href="javascript:void(0)" >{{t 'seznami.view.oseba.kontakti'}}</a></li>
        <li role="presentation" class="tab-trrji"><a href="javascript:void(0)" >{{t 'seznami.view.oseba.racuni'}}</a></li>
        <li role="presentation" class="tab-zaposlitve"><a href="javascript:void(0)" >{{t 'produkcija.view.zaposlitev.zaposlitve'}}</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content oseba-panels">
        <div role="tabpanel" class="tab-pane active pnl-splosno">
            <div class="region-toolbar pull-right"></div>
            <div class="clearfix"></div>
            <div class="region-form">
            </div>
        </div>
        <div role="tabpanel" class="tab-pane pnl-kontakti">
            <div class="row">
                <div class="region-naslovi col-md-6">
                </div>
                <div class="region-telefonske col-md-6">
                </div>
            </div>
        </div>
        <div role="tabpanel" class="tab-pane pnl-osebe region-osebe">
        </div>
        <div role="tabpanel" class="tab-pane pnl-trrji region-trrji">
        </div>
        <div role="tabpanel" class="tab-pane pnl-zaposlitve region-zaposlitve">
        </div>
    </div>
</div>

