<cfcomponent displayname="imageDAO" hint="table ID column = id">

	<cffunction name="init" access="public" output="false" returntype="_com.image.imageDAO">
		<cfargument name="dsn" type="string" required="true">
		<cfset variables.dsn = arguments.dsn>
		<cfreturn this>
	</cffunction>
	
	<cffunction name="create" access="public" output="false" returntype="boolean">
		<cfargument name="image" type="_com.image.image" required="true" />

		<cfset var qCreate = "" />
		<cftry>
			<cfquery name="qCreate" datasource="#variables.dsn#" result="CreateResult">
				INSERT INTO ce_image
					(
					imagetype_id,
					data_key,
					caption,
					filename,
					file_ext,
					orig_filename,
					created,
					created_by
					)
				VALUES
					(
					<cfqueryparam value="#arguments.image.getimagetype_id()#" CFSQLType="cf_sql_char" null="#not len(arguments.image.getimagetype_id())#" />,
					<cfqueryparam value="#arguments.image.getdata_key()#" CFSQLType="cf_sql_integer" null="#not len(arguments.image.getdata_key())#" />,
					<cfqueryparam value="#arguments.image.getcaption()#" CFSQLType="cf_sql_varchar" null="#not len(arguments.image.getcaption())#" />,
					<cfqueryparam value="#arguments.image.getfilename()#" CFSQLType="cf_sql_varchar" null="#not len(arguments.image.getfilename())#" />,
					<cfqueryparam value="#arguments.image.getfile_ext()#" CFSQLType="cf_sql_char" null="#not len(arguments.image.getfile_ext())#" />,
					<cfqueryparam value="#arguments.image.getorig_filename()#" CFSQLType="cf_sql_varchar" null="#not len(arguments.image.getorig_filename())#" />,
					<cfqueryparam value="#arguments.image.getcreated()#" CFSQLType="cf_sql_timestamp" null="#not len(arguments.image.getcreated())#" />,
					<cfqueryparam value="#arguments.image.getcreated_by()#" CFSQLType="cf_sql_integer" null="#not len(arguments.image.getcreated_by())#" />
					)
			</cfquery>
			<cfcatch type="database">
				<cfreturn false />
			</cfcatch>
		</cftry>
		<cfreturn CreateResult.ID />
	</cffunction>

	<cffunction name="read" access="public" output="false" returntype="_com.image.image">
		<cfargument name="image" type="_com.image.image" required="true" />

		<cfset var qRead = "" />
		<cfset var strReturn = structNew() />
		<cftry>
			<cfquery name="qRead" datasource="#variables.dsn#">
				SELECT
					id,
					imagetype_id,
					data_key,
					caption,
					filename,
					file_ext,
					orig_filename,
					created,
					created_by
				FROM	ce_image
				WHERE	id = <cfqueryparam value="#arguments.image.getid()#" CFSQLType="cf_sql_integer" />
			</cfquery>
			<cfcatch type="database">
				<!--- leave the bean as is --->
			</cfcatch>
		</cftry>
		<cfif qRead.recordCount>
			<cfset strReturn = queryRowToStruct(qRead)>
			<cfset imageBean = arguments.image.init(argumentCollection=strReturn)>
			<cfreturn imageBean>
		</cfif>
	</cffunction>

	<cffunction name="update" access="public" output="false" returntype="boolean">
		<cfargument name="image" type="_com.image.image" required="true" />

		<cfset var qUpdate = "" />
		<cftry>
			<cfquery name="qUpdate" datasource="#variables.dsn#">
				UPDATE	ce_image
				SET
					imagetype_id = <cfqueryparam value="#arguments.image.getimagetype_id()#" CFSQLType="cf_sql_char" null="#not len(arguments.image.getimagetype_id())#" />,
					data_key = <cfqueryparam value="#arguments.image.getdata_key()#" CFSQLType="cf_sql_integer" null="#not len(arguments.image.getdata_key())#" />,
					caption = <cfqueryparam value="#arguments.image.getcaption()#" CFSQLType="cf_sql_varchar" null="#not len(arguments.image.getcaption())#" />,
					filename = <cfqueryparam value="#arguments.image.getfilename()#" CFSQLType="cf_sql_varchar" null="#not len(arguments.image.getfilename())#" />,
					file_ext = <cfqueryparam value="#arguments.image.getfile_ext()#" CFSQLType="cf_sql_char" null="#not len(arguments.image.getfile_ext())#" />,
					orig_filename = <cfqueryparam value="#arguments.image.getorig_filename()#" CFSQLType="cf_sql_varchar" null="#not len(arguments.image.getorig_filename())#" />,
					created = <cfqueryparam value="#arguments.image.getcreated()#" CFSQLType="cf_sql_timestamp" null="#not len(arguments.image.getcreated())#" />,
					created_by = <cfqueryparam value="#arguments.image.getcreated_by()#" CFSQLType="cf_sql_integer" null="#not len(arguments.image.getcreated_by())#" />
				WHERE	id = <cfqueryparam value="#arguments.image.getid()#" CFSQLType="cf_sql_integer" />
			</cfquery>
			<cfcatch type="database">
				<cfreturn false />
			</cfcatch>
		</cftry>
		<cfreturn true />
	</cffunction>

	<cffunction name="delete" access="public" output="false" returntype="boolean">
		<cfargument name="image" type="_com.image.image" required="true" />

		<cfset var qDelete = "">
		<cftry>
			<cfquery name="qDelete" datasource="#variables.dsn#">
				DELETE FROM	ce_image 
				WHERE	id = <cfqueryparam value="#arguments.image.getid()#" CFSQLType="cf_sql_integer" />
			</cfquery>
			<cfcatch type="database">
				<cfreturn false />
			</cfcatch>
		</cftry>
		<cfreturn true />
	</cffunction>

	<cffunction name="exists" access="public" output="false" returntype="boolean">
		<cfargument name="image" type="_com.image.image" required="true" />

		<cfset var qExists = "">
		<cfquery name="qExists" datasource="#variables.dsn#" maxrows="1">
			SELECT count(1) as idexists
			FROM	ce_image
			WHERE	id = <cfqueryparam value="#arguments.image.getid()#" CFSQLType="cf_sql_integer" />
		</cfquery>

		<cfif qExists.idexists>
			<cfreturn true />
		<cfelse>
			<cfreturn false />
		</cfif>
	</cffunction>

	<cffunction name="save" access="public" output="false" returntype="boolean">
		<cfargument name="image" type="_com.image.image" required="true" />
		
		<cfset var success = false />
		<cfif exists(arguments.image)>
			<cfset success = update(arguments.image) />
		<cfelse>
			<cfset success = create(arguments.image) />
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
