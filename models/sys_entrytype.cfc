<cfcomponent extends="Model">
    <cffunction name="init">
        <cfset table("ce_Sys_EntryType")>
        <cfset property(name="id", column="EntryTypeID") />
        <!---<cfset setPrimaryKey(property="id") />--->
    </cffunction>
</cfcomponent>
