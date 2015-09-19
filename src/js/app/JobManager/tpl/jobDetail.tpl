<h3 style="margin-top: 0;">{{ name }}</h3>
<dl class="dl-horizontal dl-job">
    <dt>
        {{t "jobs.jobName" }}
    </dt>
    <dd>
        {{ taskMeta.name }}
    </dd>
    <dt>
        {{t "jobs.status"}}
    </dt>
    <dd>
        <span class="label label-{{ statusJoba.class }}">{{ statusJoba.name }}</span>
    </dd>
    <dt>
        {{t "jobs.plniranCasIzvedbe"}}
    </dt>
    <dd>
        {{u  "kdaj" casIzvedbe }}
    </dd>
    {{#if izveden }}
    <dt>
        {{t "jobs.izveden"}}
    </dt>
    <dd>
        {{u "timestamp" izveden }}
    </dd>
    {{/if}}
    <dt>
        {{t "jobs.ustvaril"}}
    </dt>
    <dd>
        {{ user.username }} {{u "kdaj" datum}}
    </dd>

    <br />
    <div class="reportList"></div>

    <br />
    <div class="panel panel-default panel-log" style="display: none">
        <div class="panel-body"></div>
    </div>
    <button class="btn btn-default btn-sm btn-log" style="display: none">
        {{t "jobs.showLog"}}
    </button>
</dl>
