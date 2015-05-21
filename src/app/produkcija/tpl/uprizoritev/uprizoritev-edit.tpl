<div class="page-header clearfix">
    <div class="region-doctoolbar pull-right"></div>
    <h2>{{ docNaslov }}</h2>
</div>


<div role="tabpanel">

    <!-- Nav tabs -->
    <div class="nav nav-tabs uprizoritev-tabs"></div>
    <!--<ul class="nav nav-tabs uprizoritev-tabs" role="tablist">
        <li role="presentation" class="tab-splosno active"><a href="javascript:void(0)">{{t 'seznami.view.splosno'}}</a></li>
        <li role="presentation" class="tab-umetniskeEkipe"><a href="javascript:void(0)" >{{t 'produkcija.view.uprizoritev.umetniskeEkipe'}}</a></li>
        <li role="presentation" class="tab-nastopajoci"><a href="javascript:void(0)" >{{t 'produkcija.view.uprizoritev.nastopajoci'}}</a></li>
        <li role="presentation" class="tab-ostaliSodelujoci"><a href="javascript:void(0)" >{{t 'produkcija.view.uprizoritev.ostaliSodelujoci'}}</a></li>
        <li role="presentation" class="tab-arhivalije"><a href="javascript:void(0)" >{{t 'produkcija.view.uprizoritev.arhivalije'}}</a></li>
    </ul>-->

    <!-- Tab panes -->
    <div class="tab-content uprizoritev-panels">
        <div role="tabpanel" class="tab-pane active pnl-splosno">
            <div class="region-toolbar pull-right"></div>
            <div class="clearfix"></div>
            <div class="region-form">
            </div>
        </div>
        <div role="tabpanel" class="tab-pane pnl-umetniskeEkipe region-umetniskeEkipe"></div>
        <div role="tabpanel" class="tab-pane pnl-nastopajoci region-nastopajoci"></div>
        <div role="tabpanel" class="tab-pane pnl-ostaliSodelujoci region-ostaliSodelujoci"></div>
        <div role="tabpanel" class="tab-pane pnl-arhivalije region-arhivalije"></div>
    </div>
</div>

