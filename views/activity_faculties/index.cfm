<div class="btn-toolbar clearfix">
	<div class="btn-group pull-left js-partic-actions">
		<a class="btn dropdown-toggle disabled" data-toggle="dropdown" href="##">SELECTED: <span id="label-status-selected" class="js-label-status-selected">0</span></a>
		<a class="btn dropdown-toggle disabled" data-toggle="dropdown" href="##">
			Actions
			<span class="caret"></span>
		</a>
		<ul class="dropdown-menu">
			<li><a href="##" class="js-remove-faculty">Remove</a></li>
        </ul>
	</div>
	
	<form class="form-inline pull-left mll" action="">
		<input type="text"  class="input-medium" placeholder="filter people" />	
	</form>
</div>
<cfoutput>
<div>
	<div id="RegistrantsContainer" class="js-faculty-container"></div>
	<div id="RegistrantsLoading" class="Loading js-faculty-loading"><img src="/admin/_images/ajax-loader.gif" />
	<div>Please Wait</div></div>
</div>
<div class="js-file-uploader"></div>
<div class="js-photo-uploader"></div>
</cfoutput>