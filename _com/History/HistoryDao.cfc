<cfcomponent displayname="HistoryDAO" hint="table ID column = HistoryID">

	<cffunction name="init" access="public" output="false" returntype="_com.History.HistoryDAO">
		<cfargument name="dsn" type="string" required="true">
		<cfset variables.dsn = arguments.dsn>
		<cfreturn this>
	</cffunction>
	
	<cffunction name="create" access="public" output="false" returntype="boolean">
		<cfargument name="History" type="_com.History.History" required="true" />

		<cfset var qCreate = "" />
		<cftry>
			<cfquery name="qCreate" datasource="#variables.dsn#" result="CreateResult">
				INSERT INTO ce_History
					(
					HistoryStyleID,
					HistoryHTML,
					FromPersonID,
					ToPersonID,
					ToActivityID,
					ToHistoryID,
					ToSiteID,
					HiddenFlag
					)
				VALUES
					(
					<cfqueryparam value="#arguments.History.getHistoryStyleID()#" CFSQLType="cf_sql_integer" />,
					<cfqueryparam value="#arguments.History.getHistoryHTML()#" CFSQLType="cf_sql_varchar" null="#not len(arguments.History.getHistoryHTML())#" />,
					<cfqueryparam value="#arguments.History.getFromPersonID()#" CFSQLType="cf_sql_integer" />,
					<cfqueryparam value="#arguments.History.getToPersonID()#" CFSQLType="cf_sql_integer" null="#not len(arguments.History.getToPersonID())#" />,
					<cfqueryparam value="#arguments.History.getToActivityID()#" CFSQLType="cf_sql_integer" null="#not len(arguments.History.getToActivityID())#" />,
					<cfqueryparam value="#arguments.History.getToHistoryID()#" CFSQLType="cf_sql_integer" null="#not len(arguments.History.getToHistoryID())#" />,
					<cfqueryparam value="#arguments.History.getToSiteID()#" CFSQLType="cf_sql_integer" null="#not len(arguments.History.getToHistoryID())#" />,
					<cfqueryparam value="#arguments.History.getHiddenFlag()#" CFSQLType="cf_sql_char" null="#not len(arguments.History.getHiddenFlag())#" />
					)
			</cfquery>
			<cfcatch type="database">
				<cfreturn false />
			</cfcatch>
		</cftry>
		<cfreturn CreateResult.ID />
	</cffunction>

	<cffunction name="read" access="public" output="false" returntype="_com.History.History">
		<cfargument name="History" type="_com.History.History" required="true" />

		<cfset var qRead = "" />
		<cfset var strReturn = structNew() />
		<cftry>
			<cfquery name="qRead" datasource="#variables.dsn#">
				SELECT
					HistoryID,
					HistoryStyleID,
					HistoryHTML,
					FromPersonID,
					ToPersonID,
					ToActivityID,
					ToHistoryID,
					ToSiteID,
					Created,
					HiddenFlag
				FROM	ce_History
				WHERE	HistoryID = <cfqueryparam value="#arguments.History.getHistoryID()#" CFSQLType="cf_sql_integer" />
			</cfquery>
			<cfcatch type="database">
				<!--- leave the bean as is --->
			</cfcatch>
		</cftry>
		<cfif qRead.recordCount>
			<cfset strReturn = queryRowToStruct(qRead)>
			<cfset HistoryBean = arguments.History.init(argumentCollection=strReturn)>
			<cfreturn HistoryBean>
		</cfif>
	</cffunction>

	<cffunction name="update" access="public" output="false" returntype="boolean">
		<cfargument name="History" type="_com.History.History" required="true" />

		<cfset var qUpdate = "" />
		<cftry>
			<cfquery name="qUpdate" datasource="#variables.dsn#">
				UPDATE	ce_History
				SET
					HistoryStyleID = <cfqueryparam value="#arguments.History.getHistoryStyleID()#" CFSQLType="cf_sql_integer" />,
					HistoryHTML = <cfqueryparam value="#arguments.History.getHistoryHTML()#" CFSQLType="cf_sql_varchar" null="#not len(arguments.History.getHistoryHTML())#" />,
					FromPersonID = <cfqueryparam value="#arguments.History.getFromPersonID()#" CFSQLType="cf_sql_integer" />,
					ToPersonID = <cfqueryparam value="#arguments.History.getToPersonID()#" CFSQLType="cf_sql_integer" null="#not len(arguments.History.getToPersonID())#" />,
					ToActivityID = <cfqueryparam value="#arguments.History.getToActivityID()#" CFSQLType="cf_sql_integer" null="#not len(arguments.History.getToActivityID())#" />,
					ToHistoryID = <cfqueryparam value="#arguments.History.getToHistoryID()#" CFSQLType="cf_sql_integer" null="#not len(arguments.History.getToHistoryID())#" />,
					ToSiteID = <cfqueryparam value="#arguments.History.getToHistoryID()#" CFSQLType="cf_sql_integer" null="#not len(arguments.History.getToHistoryID())#" />,
					Created = <cfqueryparam value="#arguments.History.getCreated()#" CFSQLType="cf_sql_timestamp" null="#not len(arguments.History.getCreated())#" />,
					HiddenFlag = <cfqueryparam value="#arguments.History.getHiddenFlag()#" CFSQLType="cf_sql_char" null="#not len(arguments.History.getHiddenFlag())#" />
				WHERE	HistoryID = <cfqueryparam value="#arguments.History.getHistoryID()#" CFSQLType="cf_sql_integer" />
			</cfquery>
			<cfcatch type="database">
				<cfreturn false />
			</cfcatch>
		</cftry>
		<cfreturn true />
	</cffunction>

	<cffunction name="delete" access="public" output="false" returntype="boolean">
		<cfargument name="History" type="_com.History.History" required="true" />

		<cfset var qDelete = "">
		<cftry>
			<cfquery name="qDelete" datasource="#variables.dsn#">
				DELETE FROM	ce_History 
				WHERE	HistoryID = <cfqueryparam value="#arguments.History.getHistoryID()#" CFSQLType="cf_sql_integer" />
			</cfquery>
			<cfcatch type="database">
				<cfreturn false />
			</cfcatch>
		</cftry>
		<cfreturn true />
	</cffunction>

	<cffunction name="exists" access="public" output="false" returntype="boolean">
		<cfargument name="History" type="_com.History.History" required="true" />

		<cfset var qExists = "">
		<cfquery name="qExists" datasource="#variables.dsn#" maxrows="1">
			SELECT count(1) as idexists
			FROM	ce_History
			WHERE	HistoryID = <cfqueryparam value="#arguments.History.getHistoryID()#" CFSQLType="cf_sql_integer" />
		</cfquery>

		<cfif qExists.idexists>
			<cfreturn true />
		<cfelse>
			<cfreturn false />
		</cfif>
	</cffunction>

	<cffunction name="save" access="public" output="false" returntype="boolean">
		<cfargument name="History" type="_com.History.History" required="true" />
		
		<cfset var success = false />
		<cfif exists(arguments.History)>
			<cfset success = update(arguments.History) />
		<cfelse>
			<cfset success = create(arguments.History) />
		</cfif>
		
		<cfreturn success />
	</cffunction>

	<cffunction name="queryRowToStruct" access="private" output="false" returntype="struct">
		<cfargument name="qry" type="query" required="true">
		
		<cfscript>
			/**
			 * Makes a row of a query into a structure.
			 * 
			 * @param query 	 The query to work with. 
			 * @param row 	 Row number to check. Defaults to row 1. 
			 * @return Returns a structure. 
			 * @author Nathan Dintenfass (nathan@changemedia.com) 
			 * @version 1, December 11, 2001 
			 */
			//by default, do this to the first row of the query
			var row = 1;
			//a var for looping
			var ii = 1;
			//the cols to loop over
			var cols = listToArray(qry.columnList);
			//the struct to return
			var stReturn = structnew();
			//if there is a second argument, use that for the row number
			if(arrayLen(arguments) GT 1)
				row = arguments[2];
			//loop over the cols and build the struct from the query row
			for(ii = 1; ii lte arraylen(cols); ii = ii + 1){
				stReturn[cols[ii]] = qry[cols[ii]][row];
			}		
			//return the struct
			return stReturn;
		</cfscript>
	</cffunction>

</cfcomponent>
