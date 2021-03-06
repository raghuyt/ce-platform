<cfcomponent extends="Controller" output="false">

	<cffunction name="init">
		<cfset filters(through="loginRequired") />
		<cfset filters(through="adminRequired") />
		<cfset super.init() />
	</cffunction>
	
	<!--- activity_faculties/ahah --->
    <cffunction name="ahah">
		<cfset qActivityFacultyList = Application.Com.ActivityFacultyGateway.getByViewAttributes(ActivityID=params.key,DeletedFlag='N',OrderBy="sr.RoleID DESC, p1.LastName,p1.FirstName")>
        
        <cfset renderPage(layout=false) />
    </cffunction>
	
	<!--- activity_faculties/create --->
	<cffunction name="create">
		<cfset activity_faculty = model("Activity_faculty").new(params.activity_faculty)>
		
		<!--- Verify that the activity_faculty creates successfully --->
		<cfif activity_faculty.save()>
			<cfset flashInsert(success="The activity_faculty was created successfully.")>
            <cfset redirectTo(action="index")>
		<!--- Otherwise --->
		<cfelse>
			<cfset flashInsert(error="There was an error creating the activity_faculty.")>
			<cfset renderPage(action="new")>
		</cfif>
	</cffunction>
	
	<!--- activity_faculties/delete/key --->
	<cffunction name="delete">
		<cfset activity_faculty = model("Activity_faculty").findByKey(params.key)>
		
		<!--- Verify that the activity_faculty deletes successfully --->
		<cfif activity_faculty.delete()>
			<cfset flashInsert(success="The activity_faculty was deleted successfully.")>	
            <cfset redirectTo(action="index")>
		<!--- Otherwise --->
		<cfelse>
			<cfset flashInsert(error="There was an error deleting the activity_faculty.")>
			<cfset redirectTo(action="index")>
		</cfif>
	</cffunction>
	
	<!--- activity_faculties/edit/key --->
	<cffunction name="edit">
		<!--- Find the record --->
    	<cfset activity_faculty = model("Activity_faculty").findByKey(params.key)>
    	
    	<!--- Check if the record exists --->
	    <cfif NOT IsObject(activity_faculty)>
	        <cfset flashInsert(error="Activity_faculty #params.key# was not found")>
			<cfset redirectTo(action="index")>
	    </cfif>
	</cffunction>
	
	<!--- activity_faculties/index --->
	<cffunction name="index">
	</cffunction>
	
	<!--- activity_faculties/new --->
	<cffunction name="new">
		<cfset activity_faculty = model("Activity_faculty").new()>
	</cffunction>
	
	<!--- activity_faculties/show/key --->
	<cffunction name="show">
		<!--- Find the record --->
    	<cfset activity_faculty = model("Activity_faculty").findByKey(params.key)>
    	
    	<!--- Check if the record exists --->
	    <cfif NOT IsObject(activity_faculty)>
	        <cfset flashInsert(error="Activity_faculty #params.key# was not found")>
	        <cfset redirectTo(action="index")>
	    </cfif>
	</cffunction>
	
	<!--- activity_faculties/update --->
	<cffunction name="update">
		<cfset activity_faculty = model("Activity_faculty").findByKey(params.key)>
		
		<!--- Verify that the activity_faculty updates successfully --->
		<cfif activity_faculty.update(params.activity_faculty)>
			<cfset flashInsert(success="The activity_faculty was updated successfully.")>	
            <cfset redirectTo(action="index")>
		<!--- Otherwise --->
		<cfelse>
			<cfset flashInsert(error="There was an error updating the activity_faculty.")>
			<cfset renderPage(action="edit")>
		</cfif>
	</cffunction>
</cfcomponent>
