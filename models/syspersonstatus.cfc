<cfcomponent extends="Model">
    <cffunction name="init">
        <cfset table("Sys_PersonStatus")>
        <cfset property(name="id", column="PersonStatusID") />
        <!---<cfset setPrimaryKey(property="id") />--->
    </cffunction>
</cfcomponent>
