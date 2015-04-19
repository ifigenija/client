<% if (typeof naziv != 'undefined') { %>
<dl class="dl-horizontal">
    <dt> Ime: </dt><dd><%= naziv %>&nbsp;</dd>
    <dt> Številka: </dt><dd><%= stevilka %>&nbsp;</dd>

    <div>
        <% if (hash) { %>
        <dt> Ime datoteke: </dt><dd> <%= filename %>&nbsp;</dd>
        <dt> Velikost: </dt><dd> <%= filesize(size) %>&nbsp;</dd>
        <dt> Tip: </dt><dd> <%= mimeType %>&nbsp;</dd>
        <% } %>
        <dt>&nbsp;</dt><dd>
            <form id="upload" style="display:none;">
                <input type="file" multiple="" class="fileupload" name="fileupload"/>
                <span class="loading"><i class="fa fa-spinner"></i></span>
            </form>
        </dd>

    </div>
</dl>
<% if (hash) { %>

<div class="form-actions">
    <div class="btn-group">
        <button class="btn uredi-datoteko"><i class="fa fa-edit"></i> Uredi</button>
        <a href="<%=url %>" class="btn"><i class="fa fa-download"></i> Prenesi</a>
        <button class="btn nova-verzija"><i class="fa fa-upload"></i> Nova vezija</button>
    </div>
</div>

<% } %>
<% } %>