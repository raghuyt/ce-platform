<td valign="top" align="center">
    <input type="checkbox" name="Checked" class="MemberCheckbox js-participant-checkbox" id="Checked-<%= ID %>" value="<%= ID %>" />
    <input type="hidden" class="ATTENDEEID" value="<%= ID %>" />
    <input type="hidden" class="PERSONID" value="<%= PERSONID %>" />
</td>
<td><img src="/images/no-photo/person_i.png">
    <% if(MDFLAG.toUpperCase() == "Y") { %><div style="position: relative;"><span class="badge badge-important" style="position: absolute; left: 30px; bottom: 0px;">MD</span></div><% } %>
</td>
<td valign="top" nowrap="nowrap">
    <% if(PERSONID > 0) { %>
        <a href="/people/edit/<%= PERSONID %>" class="PersonLink" id="PERSON|<%= PERSONID %>|<%= LASTNAME %>, <%= FIRSTNAME %>"><span class="js-attendee-name"><%= LASTNAME %>, <%= FIRSTNAME %></span></a>
    <% } else { %>
        <span class="js-attendee-name"><%= LASTNAME %>, <%= FIRSTNAME %></span>
    <% } %>
    <!--- <div class="attendee-status js-attendee-status" id="attendee-status-<%= ID %>"><%= NAME %></div> --->
</td>
<td class="js-status-date" id="StatusDate-<%= ID %>" valign="top">
    <% formattedCompleteDate = Date(COMPLETEDATE).split(" ") %>
    <% formattedRegisterDate = Date(REGISTERDATE).split(" ") %>
    <% formattedTermDate = Date(TERMDATE).split(" ") %>
    <%= NAME %>
    <% if(STATUSID == 1) { %>
        (<%= formattedCompleteDate[1] + " " + formattedCompleteDate[2] + ", " + formattedCompleteDate[3] %>)
    <% } else if(STATUSID == 3) { %>
        (<%= formattedRegisterDate[1] + " " + formattedRegisterDate[2] + ", " + formattedRegisterDate[3] %>)
    <% } else if(STATUSID == 4) { %>
        (<%= formattedTermDate[1] + " " + formattedTermDate[2] + ", " + formattedTermDate[3] %>)
    <% } %>
</td>
<td valign="top" class="user-actions-outer">
    <div class="btn-group user-actions action-menu pull-left">
        <a class="btn dropdown-toggle" data-toggle="dropdown">
            <i class="icon-cog"></i><span class="caret"></span>
        </a>
        <ul class="dropdown-menu" id="menuActions-<%= ID %>">
            <li><a href="javascript://" class="js-print-cme"><i/>CME Certificate</a></li>
            <li><a href="javascript://" class="js-print-cne"><i/>CNE Certificate</a></li>
            <li class="sendCertificate"><a href="javascript://"><i/>Send Certificate</a></li>
            <li class="assess"><a href="/activity_participants/attendeeDetails?ActivityID=<%= ACTIVITYID %>&PersonID=<%= PERSONID %>"><i/>Assessments</a></li>
            <!---<li class="pifform"><a href="/activity/attendeeCDC?ActivityID=<%= ACTIVITYID %>&PersonID=<%= PERSONID %>"><i/>PIF Form</a></li>--->
            <li class="credits"><a href="/activity/adjustCredits?ActivityID=<%= ACTIVITYID %>&PersonID=<%= PERSONID %>"><i/>Credits</a></li>
            <li class="togglemd"><a href="javascript://" class="js-toggle-md"><i/>Toggle MD</a></li>
            <li class="reset"><a href="javascript://" class="js-reset-user"><i/>Reset <%= FIRSTNAME %> <%= LASTNAME %></a></li>
            <li class="remove"><a href="javascript://" class="js-remove-user"><i/>Remove <%= FIRSTNAME %> <%= LASTNAME %></a></li>
        </ul>
    </div>
</td>
<td valign="top">
    <a href="javascript://" class="js-edit-attendee">Edit</a>
    <div class="js-edit-attendee-container"></div>
</td>