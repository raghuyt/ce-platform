<h1>Create a New sys_filetype</h1>

<cfoutput>#includePartial("showFlash")#</cfoutput>

<cfoutput>

			
			
			#errorMessagesFor("sys_filetype")#
	
			#startFormTag(action="create")#
		
				
					
						#textField(objectName='sys_filetype', property='FileTypeID', label='File Type ID')#
																
				
					
						#textField(objectName='sys_filetype', property='Name', label='Name')#
																
				
					
						#textField(objectName='sys_filetype', property='Description', label='Description')#
																
				

				#submitTag()#
				
			#endFormTag()#
			
		

#linkTo(text="Return to the listing", action="index")#
</cfoutput>
