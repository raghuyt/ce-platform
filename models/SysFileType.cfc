<cfcomponent extends="Model">
    <cffunction name="init">
        <cfset table("ce_Sys_FileType")>
        <cfset property(name="id", column="FileTypeID") />
        <cfset setPrimaryKey(property="id") />
    </cffunction>
</cfcomponent>
