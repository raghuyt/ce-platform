<h1>Create a New sys_country</h1>

<cfoutput>#includePartial("showFlash")#</cfoutput>

<cfoutput>

			
			
			#errorMessagesFor("sys_country")#
	
			#startFormTag(action="create")#
		
				
																
				
					
						#textField(objectName='sys_country', property='name', label='Name')#
																
				
					
						#textField(objectName='sys_country', property='code', label='Code')#
																
				

				#submitTag()#
				
			#endFormTag()#
			
		

#linkTo(text="Return to the listing", action="index")#
</cfoutput>
