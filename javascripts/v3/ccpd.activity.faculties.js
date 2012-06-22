function addSelectedRow(b){var a=$.extend({},b);if(a.faculty&&a.faculty>0){if(!$.ListFind(selectedRows,a.faculty,",")){selectedRows=$.ListAppend(selectedRows,a.faculty,",")}}updateSelectedCount(1)}function removeSelectedRow(b){var a=$.extend({},b);if(a.faculty&&a.faculty>0){selectedRows=$.ListDeleteAt(selectedRows,$.ListFind(selectedRows,a.faculty))}updateSelectedCount(-1)}function saveFacultyMember(){$.blockUI({message:"<h1>Adding Faculty Member...</h1>"});$.post(sRootPath+"/_com/AJAX_Activity.cfc",{method:"saveFacultyMember",PersonID:$("#FacultyID").val(),ActivityID:nActivity,returnFormat:"plain"},function(a){cleanData=$.trim(a);status=$.ListGetAt(cleanData,1,"|");statusMsg=$.ListGetAt(cleanData,2,"|");if(status=="Success"){updateFaculty();updateActions();addMessage(statusMsg,250,6000,4000);$.unblockUI()}else{if(status=="Fail"){addError(statusMsg,250,6000,4000);$.unblockUI();$("#FacultyName").val("Click Here to Search")}}});$("#PersonActivityID").val("");$("#PersonActivityName").val("Click Here To Search")}function updateFaculty(){var b=$(".js-faculty-loading");var d=$(".js-faculty-container");var c=$(".js-file-uploader");var a=$(".js-photo-uploader");b.show();$.ajax({url:"/activity_faculties/ahah/"+nActivity,type:"post",data:{ActivityID:nActivity},dataType:"html",success:function(e){d.html(e);b.hide();$(".js-all-faculty").unbind();$(".js-all-faculty").each(function(){var f=$(this);var g=f.find(".js-selected-checkbox");var h=f.find(".js-approve-file");var k=f.find(".js-upload-file");var j=f.find(".personId").val();var i=f.find(".facultyId").val();if($.ListFind(selectedRows,i)){f.addClass("alert alert-info");g.attr("checked",true)}g.click(function(){if($(this).attr("checked")){f.addClass("alert alert-info");addSelectedRow({person:j,faculty:i})}else{f.removeClass("alert alert-info");removeSelectedRow({person:j,faculty:i})}});h.live("click",function(){var o=this.id.split("|");var n=o[0];var l=o[1];var m=o[2];$.ajax({url:"/AJAX_adm_Activity/approveFacultyFile",type:"post",data:{ActivityID:nActivity,PersonID:m,FileType:l,Mode:n},success:function(p){if(p.STATUS){updateFaculty();addMessage(p.STATUSMSG,250,6000,4000)}else{updateFaculty();addError(p.STATUSMSG,250,6000,4000)}}})});c.dialog({title:"Upload File",modal:false,autoOpen:false,height:246,width:350,resizable:false,stack:false,buttons:{Save:function(){$("#frmFileUpload").ajaxSubmit({dataType:"json",forceSync:true,success:function(l){c.html("");addMessage("File uploaded successfully.",500,6000,4000);c.dialog("close")}})},Cancel:function(){c.dialog("close");updateFaculty()}},open:function(){console.log("in");$.ajax({url:"/files/new/"+j,type:"post",data:{keyType:"person",activityId:nActivity,facultyId:i},success:function(l){c.html(l)}})},close:function(){updateFaculty();updateActions()}});k.live("click",function(){c.dialog("open")})});$photo.live("click",function(){var f=this.id.split("Photo")[1];$("#frmUpload").attr("src","/people/photoupload/"+f+"?ElementID="+this.id);$("#PhotoUpload").dialog("open")});a.dialog({title:"Upload Photo",modal:false,autoOpen:false,height:120,width:450,resizable:false,open:function(){$("#PhotoUpload").show()}})}})}function updateSelectedCount(a){selectedCount=selectedCount+a;if(selectedCount>0){$(".js-partic-actions .btn").removeClass("disabled")}else{$(".js-partic-actions .btn").addClass("disabled")}$(".js-label-status-selected").text(selectedCount)}$(document).ready(function(){var b=$(".js-check-all");var c=$(".js-remove-faculty");var a=$(".js-person-photo");updateFaculty();b.live("click",function(){var d=$(".js-all-faculty");var e=$(this).attr("checked");d.each(function(){var f=$(this);var g=f.find(".js-selected-checkbox");var i=f.find(".personId").val();var h=f.find(".facultyId").val();var j=g.attr("checked");if(e&&!j){addSelectedRow({person:i,faculty:h});g.attr("checked",true);f.addClass("alert alert-info")}else{if(!e&&j){if(j){removeSelectedRow({person:i,faculty:h});g.attr("checked",false);f.removeClass("alert alert-info")}}}})});c.bind("click",function(){if(confirm("Are you sure you want to remove the checked people from this Activity?")){var d="";var e="";$(".MemberCheckbox:checked").each(function(){d=$.ListAppend(d,$(this).val(),",")});$.blockUI({message:"<h1>Removing Selected Faculty Members...</h1>"});$.getJSON(sRootPath+"/AJAX_adm_Activity.cfc",{method:"removeCheckedFaculty",PersonList:d,ActivityID:nActivity,returnFormat:"plain"},function(f){if(f.STATUS){addMessage(f.STATUSMSG,250,6000,4000)}else{addError(f.STATUSMSG,250,6000,4000)}updateFaculty();updateActions();$.unblockUI()})}})});