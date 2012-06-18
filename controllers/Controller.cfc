<cfcomponent extends="Wheels">
	<cffunction name="init">
		<cfset filters(through="autoSetup") />
		<cfset filters(through="autoLayout",type="after") />
	</cffunction>
	
	<cffunction name="autoSetup">
		<cfparam name="params.controller" default="" />
		
		<cfif params.controller CONTAINS "activity_" AND listFindNoCase("edit,index,new,create,update",params.action,',')>
			<cfset $setActivity() />
		<cfelseif params.controller CONTAINS "person_" AND listFindNoCase("edit,index,new,create,update",params.action,',')>
			<cfset $setPerson() />
		<cfelseif params.controller EQ "activities" AND listFindNoCase("edit",params.action)>
			<cfset $setActivity() />
		</cfif>
	</cffunction>
	
	<cffunction name="autoLayout">
		<cfparam name="params.controller" default="" />
		<cfparam name="params.showInfoBar" default="true" />
		<cfparam name="params.layout" default="" />
        
        <cfif len(trim(params.layout)) EQ 0>
			<cfif params.controller CONTAINS "activity_" AND listFindNoCase("edit,index,new,create,update",params.action,',')>
                <cfset subLayout('adm_activity') />
            <cfelseif params.controller CONTAINS "person_" AND listFindNoCase("edit,index,new,create,update",params.action,',')>
                <cfset subLayout('adm_person') />
            <cfelseif params.controller EQ "activities" AND listFindNoCase("edit",params.action)>
                <cfset subLayout("adm_activity") />
            </cfif>
        <cfelse>
        	<cfset subLayout("#params.layout#") />
        </cfif>
	</cffunction>
	
	<cffunction name="showInfoBar">
		<cfargument name="infoBar" type="boolean" required="no" default="true" />
		
		<cfset params.showInfoBar = arguments.infobar />
	</cffunction>
	
	<cffunction name="subLayout">
		<cfargument name="layoutFile" type="string" required="no" default="" />
		<cfparam name="params.controller" default="" />
		<cfparam name="params.action" default="" />
		<cfparam name="params.key" default="0" />
		<cfset renderText($renderLayout($layout='/layout',$type='template',$content=$renderPage($template="",$controller=params.controller,$action=params.action,$key=params.key,$layout="/layout_#arguments.layoutFile#"))) />
	</cffunction>
	
	<cffunction name="pageTitle">
		<cfargument name="titleText" type="string" required="no" default="" />
		
		<cfset contentFor(pageTitle=arguments.titleText) />
	</cffunction>
	
	<cffunction name="pageSubTitle">
		<cfargument name="titleText" type="string" required="no" default="" />
		
		<cfset contentFor(pageSubTitle=arguments.titleText) />
	</cffunction>
	
	<cffunction name="$setActivity" access="public">
    	<cfparam name="params.submitted" type="integer" default="0" />
        <cfparam name="params.key" type="integer" default="0" />
        <cfparam name="params.activityId" type="integer" default="0" />
		
		<cfset params.activityId = (params.activityId GT 0) ? params.activityId : params.key />
		
		<!--- LEGACY FIX --->
		<cfset attributes = {} />
		<cfset attributes['activityid'] = params.activityId />
		<cfset attributes['submitted'] = params.submitted />
		
		<cfset activity = model("activity").findByKey(params.activityId) />
		<cfset pageTitle("#activity.title#") />
	</cffunction>
	
	<cffunction name="$setPerson" access="public">
    	<cfparam name="params.submitted" type="integer" default="0" />
        <cfparam name="params.key" type="integer" default="0" />
        <cfparam name="params.personId" type="integer" default="0" />
		
		<cfset params.personId = (params.personId GT 0) ? params.personId : params.key />
		
		<!--- LEGACY FIX --->
		<cfset attributes = {} />
		<cfset attributes['personid'] = params.personId />
		<cfset attributes['submitted'] = params.submitted />
		
		<cfset person = model("person").findByKey(params.personId) />
		<cfset pageTitle("#person.displayname#") />
	</cffunction>
</cfcomponent>