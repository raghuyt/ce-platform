<!---
	This file is used to configure specific settings for the "development" environment.
	A variable set in this file will override the one in "config/settings.cfm".
	Example: <cfset set(dataSourceName="devDB")>
--->
<cfset set(javascriptPath="") />
<cfset set(assetPaths={
	http="localhost:9229/assets/",
	https="localhost:9229/assets/"
}) />