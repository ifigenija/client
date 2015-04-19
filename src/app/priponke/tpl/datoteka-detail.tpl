<% if (typeof naziv != 'undefined') { %>
<dl class="dl-horizontal">
    <dt> Ime: </dt><dd><%= naziv %>&nbsp;</dd>
    <dt> Številka: </dt><dd><%= stevilka %>&nbsp;</dd>

    <div>
        <% if (typeof hash != 'undefined') { %>
        <dt> Ime datoteke: </dt><dd> <%= filename %>&nbsp;</dd>
        <dt> Velikost: </dt><dd> <%= filesize(size) %>&nbsp;</dd>
        <dt> Tip: </dt><dd> <%= mimeType %>&nbsp;</dd>
        <% } %>
        <dt>&nbsp;</dt><dd>
            <form id="upload" style="display:none;">
                <div class="form-group">
                    <input type="file" multiple="" class="fileupload form-control" name="fileupload"/>

                </div>
            </form>
        </dd>

    </div>
</dl>
<% if (typeof hash != 'undefined') { %>

<div class="form-actions">
    <div class="btn-group">
        <button class=" btn btn-default uredi-datoteko"><i class="fa fa-edit"></i> Uredi</button>
        <a href="<%=url %>" class="btn btn-default"><i class="fa fa-download"></i> Prenesi</a>
        <button class=" btn btn-default nova-verzija"><i class="fa fa-upload"></i> Nova vezija</button>
        <button class=" btn btn-default brisi-datoteko"><i class="fa fa-trash-o"></i> Briši</button>
    </div>
</div>

<% } %>
<% } %>