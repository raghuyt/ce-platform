<cfcomponent extends="Model">
    <cffunction name="init">
        <cfset table("ce_Person_Interest_Except")>
        <cfset property(name="id", column="PersonIntExceptID") />
        <cfset setPrimaryKey(property="id") />
    </cffunction>
</cfcomponent>
