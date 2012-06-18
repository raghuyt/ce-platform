<cfparam name="Attributes.Title" default="">
<cfparam name="Attributes.ActivityID" default="0">
<cfparam name="Attributes.ActivityType" default="1">
<cfparam name="Attributes.StartDate" default="">
<cfparam name="Attributes.StartTime" default="">
<cfparam name="Attributes.EndDate" default="">
<cfparam name="Attributes.EndTime" default="">
<cfparam name="Attributes.Description" default="">
<cfparam name="Attributes.Location" default="">
<cfparam name="Attributes.Address1" default="">
<cfparam name="Attributes.Address2" default="">
<cfparam name="Attributes.City" default="">
<cfparam name="Attributes.State" default="">
<cfparam name="Attributes.Province" default="">
<cfparam name="Attributes.Country" default="230">
<cfparam name="Attributes.PostalCode" default="">
<cfparam name="Attributes.Sessions" default="1">
<cfparam name="Attributes.SessionType" default="S">
<cfparam name="Attributes.Sponsor" default="">
<cfparam name="Attributes.Sponsorship" default="D">
<cfparam name="Attributes.ExternalID" default="">
<cfparam name="Attributes.ReleaseDate" default="#DateFormat(Now(),"MM/DD/YYYY")#">
<cfparam name="Attributes.UpdatedBy" default="">

<cfset qLiveGroupings = Application.Com.GroupingGateway.getByAttributes(ActivityTypeID=1)>
<cfset qEMGroupings = Application.Com.GroupingGateway.getByAttributes(ActivityTypeID=2)>
<cfset sessionTypes = [
			{ name="Stand-alone",key="S" },
			{ name="Multi-session",key="M" }
		] />
<cfinclude template="/lib/savejs.cfm" />
<script>

<cfoutput>
var LiveOptions = <cfloop query="qLiveGroupings">"<option value=\"#qLiveGroupings.GroupingID#\">#qLiveGroupings.Name#</option>"<cfif qLiveGroupings.RecordCount NEQ qLiveGroupings.CurrentRow> + </cfif></cfloop>;
var EMOptions = <cfloop query="qEMGroupings">"<option value=\"#qEMGroupings.GroupingID#\">#qEMGroupings.Name#</option>"<cfif qEMGroupings.RecordCount NEQ qEMGroupings.CurrentRow> + </cfif></cfloop>;
var nActivityType = #Attributes.ActivityTypeID#;
var nGrouping = #Attributes.GroupingID#;
var sSessionType = "#Attributes.SessionType#";
</cfoutput>
function updateStateProvince(countryId) {
	if(countryId  == 230) {
		$(".stateField").show();
		$(".provinceField").hide();
	} else {
		$(".stateField").hide().css({ display:'none' });
		$(".provinceField").show();
	}
}

function setSessionType(sSessionType) {
	if(sSessionType == "M") {
			$(".Sessions").fadeIn();
			$(".SingleSession").fadeOut();
		} else {
			$(".Sessions").fadeOut();
			$(".SingleSession").fadeIn();
		}
}

function setActivityType(nActivity) {
	
	if(nActivity == 1) {
		$("#Grouping").html(LiveOptions);
		$("#Groupings").fadeIn();
		$(".Location").fadeIn();
	} else if(nActivity == 2) {
		$("#Groupings").fadeIn();
		$("#Grouping").html(EMOptions);
	} else {
		$("#Groupings").fadeOut();
		$("#Grouping").html("");
		$(".Location").fadeOut();
	}
	updateStateProvince($("#Country").val());
}
$(document).ready(function(){
	updateStateProvince($("#Country").val());
	
	$("#Country").on("change", this, function() {
		updateStateProvince($(this).val());
	});
	
	var $startDate = $("#StartDate").datepicker({ 
		showButtonPanel: true,
		changeMonth: true,
		changeYear: true,
		onSelect: function() {
			Unsaved();
			AddChange($("label[for='" + this.id + "']").html(),$(this).val());
		}
	});
	
	var $endDate = $("#EndDate").datepicker({ 
		showButtonPanel: true,
		changeMonth: true,
		changeYear: true,
		onSelect: function() {
			Unsaved();
			AddChange($("label[for='" + this.id + "']").html(),$(this).val());
		}
	});
	
	$(".js-datepicker").on("click",function(e) {
		var $this = $(this);
		var $inputId = $this.prev().attr('id');
		$('#' + $inputId).datepicker("show");
	
		e.preventDefault();
	});
	
	/*$("#Title").autocomplete(sRootPath + '/ajax_adm_activity/autocomplete&returnformat=plain');
	$("#Sponsor").autocomplete(sRootPath + '/ajax_adm_activity/jointlyautocomplete&returnformat=plain');
	*/
	$("#ActivityType").on("change", this, function() {
		setActivityType($(this).val());
	});
	
	$("#SessionType").on(function() {
		setSessionType($(this).val());
	});
	
	<cfif Attributes.ActivityType NEQ "">
	$("#ActivityType").val(nActivityType);
	setActivityType($("#ActivityType").val());
		<cfif Attributes.GroupingID NEQ "">
	$("#Grouping").val(nGrouping);
		</cfif>
	</cfif>
	
	<cfif Attributes.SessionType NEQ "">
		$("#SessionType").val(sSessionType);
		setSessionType($("#SessionType").val());
	</cfif>
	
	/* CHECK IF SPONSORSHIP IS JOINTLY OR DIRECTLY START */
	if($("#SponsorshipJ").attr("checked")) {
		$(".js-sponsorship-J").addClass("active");
		$(".js-sponsorship-J").siblings().removeClass("active");
		$("#JointlyTextFld").removeClass("hide");
		$("#SponsorshipJ").attr("checked",true);
		$("#SponsorshipD").attr("checked",false);
	}
	
	if($("#SponsorshipD").attr("checked")) {
		$(".js-sponsorship-D").addClass("active");
		$(".js-sponsorship-D").siblings().removeClass("active");
		$("#JointlyTextFld").addClass("hide");
		$("#SponsorshipD").attr("checked",true);
		$("#SponsorshipJ").attr("checked",false);
	}
	
	$(".js-sponsorship-toggle").on("click", function(e) {
		var $btnValue = $(this).text();
		if($btnValue == 'Directly') {
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			$("#JointlyTextFld").addClass("hide");
			$("#SponsorshipD").attr("checked",true);
			$("#SponsorshipJ").attr("checked",false);
			
		} else if ( $btnValue == 'Jointly') {
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			$("#JointlyTextFld").removeClass("hide");
			$("#SponsorshipJ").attr("checked",true);
			$("#SponsorshipD").attr("checked",false);
		}
		
		e.preventDefault();
	});
	/* CHECK IF SPONSORSHIP IS JOINTLY OR DIRECTLY END */
});
</script>
<cfquery name="qModified" datasource="#Application.Settings.DSN#">
	SELECT     
		A.CreatedBy AS CreatedByID, 
		LEFT(P1.firstname, 1) + '. ' + P1.lastname AS CreatedByName, 
		A.UpdatedBy AS UpdatedByID, 
		LEFT(P2.firstname, 1) + '. ' + P2.lastname AS UpdatedByName
	FROM         ce_Activity AS A 
	LEFT OUTER JOIN
		ce_person AS P2 ON A.UpdatedBy = P2.personid 
	LEFT OUTER JOIN
		ce_person AS P1 ON A.CreatedBy = P1.personid
	WHERE A.ActivityID=<cfqueryparam value="#Attributes.ActivityID#" cfsqltype="cf_sql_integer" />
</cfquery>
<cfoutput>
<h3>General Information</h3>
#startFormTag(controller="ajax_adm_activity", action="saveactivity", key=params.key, class="form-horizontal form-ccpd", name="frmEditActivity", id="EditForm")#
	<cfinclude template="/lib/saveinfo.cfm" />
	<fieldset>
	<!--- ADDED Attributes.SessionType HIDDEN FIELD FOR SAVING PURPOSES [Attributes.SessionType must be passed to save StartDate/EndDate] --->
	<input type="hidden" value="plain" name="returnFormat" />
	<input type="hidden" value="#attributes.activityid#" name="activityid" />
	<input type="hidden" value="#attributes.sessiontype#" name="SessionType" />
	<input type="hidden" value="" name="ChangedFields" id="ChangedFields" />
	<input type="hidden" value="" name="ChangedValues" id="ChangedValues" />

	#bTextAreaTag(name="title",rows="2",id="Title",label="Title",content="#HTMLSafe(Attributes.Title)#",style="width: 495px; height: 36px;")#
	#bSelectTag(name="activitytypeid",id="ActivityType",disabled="disabled",label="Type",options=qActivityTypeList,selected="#attributes.activitytypeid#")#
	#bSelectTag(name="grouping",id="Grouping",disabled="disabled",label="Sub Type",options=[],selected="#attributes.groupingId#")#
	#bSelectTag(name="sessiontype",id="SessionType",textField="name",valueField="key",disabled="disabled",label="Session Type",options=sessionTypes,selected="#attributes.sessionType#")#
		
	<div style="display: none;">
	<label for="ReleaseDate">Release Date</label>
	<input type="text" name="ReleaseDate" id="ReleaseDate" value="#Attributes.ReleaseDate#" class="DatePicker" />
	</div>
	
	<div class="control-group">
		<label for="Sponsorship" class="control-label">Sponsorship</label>
		<div class="controls">
			<div class="btn-group pull-left" data-toggle="buttons-radio">
				<button class="btn js-sponsorship-toggle js-sponsorship-D">Directly</button>
				<button class="btn js-sponsorship-toggle js-sponsorship-J">Jointly</button>
				<span id="JointlyTextFld" class="hide mls"><input type="text" name="Sponsor" id="Sponsor" value="#Attributes.Sponsor#" /></span>
			</div>
			<input type="radio" name="Sponsorship" class="Sponsorship hide" id="SponsorshipD"<cfif Trim(Attributes.Sponsorship) EQ "D"> checked="checked"</cfif> value="D" />
			<input type="radio" name="Sponsorship" class="Sponsorship hide" id="SponsorshipJ"<cfif Trim(Attributes.Sponsorship) EQ "J"> checked</cfif> value="J" />
		</div>
	</div>
	
	<div class="control-group">
		<label for="StartDate" class="control-label">Start Date</label>
		<div class="controls">
			<div class="input-append">
				<input type="text" name="StartDate" id="StartDate" class="span2" value="#Attributes.StartDate#" /><button class="btn js-datepicker" type="button"><i class="icon-calendar"></i></button>
			</div>
		</div>
	</div>
	
	
	<div class="control-group">
		<label for="EndDate" class="control-label">End Date</label>
		<div class="controls">
			<div class="input-append">
				<input type="text" name="EndDate" id="EndDate" class="span2" value="#Attributes.EndDate#" /><button class="btn js-datepicker" type="button"><i class="icon-calendar"></i></button>
			</div>
		</div>
	</div>
	
	<div class="Location">
		<label for="Location">Location</label>
		<input type="text" name="Location" id="Location" value="#Attributes.Location#" />
	</div>
	<div class="Location">
		<label for="Address1">Address 1</label>
		<input type="text" name="Address1" id="Address1" value="#Attributes.Address1#" />
	</div>
	<div class="Location">
		<label for="Address2">Address 2</label>
		<input type="text" name="Address2" id="Address2" value="#Attributes.Address2#" />
	</div>
	<div class="Location">
		<label for="City">City</label>
		<input type="text" name="City" id="City" value="#Attributes.City#" />
	</div>
	<div class="Location stateField">
		<label for="State">State</label>
		
		<select id="State" name="State">
		<option value="0">Select one...</option>
		<cfloop query="Application.List.States">
		<option value="#trim(Application.List.States.StateId)#"<cfif Attributes.State EQ trim(Application.List.States.StateId)> Selected</cfif>>#Name#</option>
		</cfloop>
		</select>
	</div>
	<div class="Location provinceField">
		<label for="Province">State / Province</label>
		<input type="text" name="Province" id="Province" value="#Attributes.Province#" />
	</div>
	<div class="Location">
		<label for="Country">Country</label>
		
		<select id="Country" name="Country">
		<option value="0">Select one...</option>
		<cfloop query="Application.List.Countries">
		<option value="#trim(Application.List.Countries.CountryID)#"<cfif Attributes.Country EQ trim(Application.List.Countries.CountryID) OR Attributes.Country EQ "" AND trim(Application.List.Countries.Name) EQ "United States of America"> Selected</cfif>>#Name#</option>
		</cfloop>
		</select>
	</div>
	<div class="Location">
		<label for="PostalCode">Postal Code</label>
		<input type="text" name="PostalCode" id="PostalCode" value="#Attributes.PostalCode#" />
	</div>
	
	<label for="ExternalID">External ID</label>
	<input type="text" name="ExternalID" id="ExternalID" value="#Attributes.ExternalID#" />
	
	Created By
	
	<a href="#request.myself#Person.Detail?PersonID=#qModified.CreatedByID#">#qModified.CreatedByName#</a> (#DateFormat(ActivityBean.getCreated(),"mm/dd/yyyy")# #TimeFormat(ActivityBean.getCreated(),"hh:mmTT")#)
	
	<cfif Attributes.UpdatedBy NEQ "">
	
	Updated By
	
	<a href="#request.myself#Person.Detail?PersonID=#qModified.UpdatedByID#">#qModified.UpdatedByName#</a> (#DateFormat(ActivityBean.getUpdated(),"mm/dd/yyyy")# #TimeFormat(ActivityBean.getUpdated(),"hh:mmTT")#)
	
	
	</cfif>
	</fieldset>
</form>
</cfoutput>
