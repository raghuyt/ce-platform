<cfoutput>
<!--- 
	Loads js / css for this view only.
	Controller js files should already be loaded. 
--->
<cfif NOT listFindNoCase("activities/index,people/index","#params.controller#/#params.action#",",") AND NOT listFindNoCase("activities,people","#params.controller#",",")>
#includePartial(partial="/#params.controller#/js")#
</cfif>
<!---<script src="/javascripts/#application.version_token#/app/views/#lcase(params.controller)#/#params.action#.js" type="text/javascript"></script>--->

<div id="pagelet_#params.pagelet#" data-pagelet_token="#params.pagelet_token#" data-controller="#lcase(params.controller)#" data-action="#lcase(params.action)#" class="content-container">
	#includeContent()#
</div>
</cfoutput>