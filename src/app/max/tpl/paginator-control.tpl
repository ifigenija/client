<% if (size > 3) { %>
<a class="btn btn-small first hidden-xs-inline <%= state.currentPage <= 1 ? 'disabled' : '' %>" href="javascript:void(0)">
    <i class="fa fa-fast-backward"></i></a>
<% } %>
<a class="btn btn-small prev <%= state.currentPage <= 1 ? 'disabled' : '' %>" href="javascript:void(0)" >
    <i class="fa fa-backward"></i></a>
<% if (size > 1) { %>    
<input type="text" class="paginator-search form-control input-sm" name="pageNo" value="<%= state.currentPage %>"/> 
<% } %>
<% if (size > 2) { %>    
od <%= state.totalPages %></li>
<% } %>
<a class="btn btn-small next <%= state.currentPage >= state.totalPages ? 'disabled' : '' %>" href="javascript:void(0)">
    <i class="fa fa-forward"></i></a>
<% if (size > 3) { %>
<a class="last btn btn-small hidden-xs-inline <%= state.currentPage >= state.totalPages ? 'disabled' : '' %>" href="javascript:void(0)" >
    <i class="fa fa-fast-forward"></i></a>
<% } %>
<% if (size > 2) { %>    
<select class="btn btn-default btn-md per-page-count">
    <option value="5" <%= state.pageSize == 5 ? 'selected' : '' %>>5</option>
    <option value="10" <%= state.pageSize == 10 ? 'selected' : '' %>>10</option>
    <option value="15" <%= state.pageSize == 15 ? 'selected' : '' %>>15</option>
    <option value="20" <%= state.pageSize == 20 ? 'selected' : '' %>>20</option>
    <option value="25" <%= state.pageSize == 25 ? 'selected' : '' %>>25</option>
    <option value="50" <%= state.pageSize == 50 ? 'selected' : '' %>>50</option>
    <option value="100" <%= state.pageSize == 100 ? 'selected' : '' %>>100</option>
    <option value="<%= state.totalRecords %>" <%= state.totalRecords == 100 ? 'selected' : '' %>>Vse</option>
</select>
<% } %>