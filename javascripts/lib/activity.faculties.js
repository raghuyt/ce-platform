function addSelectedRow(params) {
	var settings = $.extend({},params);
	
	if(settings.faculty && settings.faculty > 0) {
		if(!$.ListFind(selectedRows,settings.faculty,",")) {
		selectedRows = $.ListAppend(selectedRows, settings.faculty, ",");
		}
	}
	
	updateSelectedCount(1);
}

function removeSelectedRow(params) {
	var settings = $.extend({},params);
	
	if(settings.faculty && settings.faculty > 0) {
		selectedRows = $.ListDeleteAt(selectedRows, $.ListFind(selectedRows, settings.faculty));
	}
	
	
	updateSelectedCount(-1);
}

function saveFacultyMember() {
	$.blockUI({ message: '<h1>Adding Faculty Member...</h1>'});
	$.post(sRootPath + "/_com/AJAX_Activity.cfc", { method: "saveFacultyMember", PersonID: $("#FacultyID").val(), ActivityID: nActivity, returnFormat: "plain" },
		function(returnData) {
			cleanData = $.trim(returnData);
			status = $.ListGetAt(cleanData,1,"|");
			statusMsg = $.ListGetAt(cleanData,2,"|");

			if(status == 'Success') {
				updateFaculty();
				updateActions();
				addMessage(statusMsg,250,6000,4000);
				$.unblockUI();
			} else if(status == 'Fail') {
				addError(statusMsg,250,6000,4000);
				$.unblockUI();
				$("#FacultyName").val("Click Here to Search");
			}
		});
	
	$("#PersonActivityID").val('');
	$("#PersonActivityName").val('Click Here To Search');
}

function updateFaculty() {
	var $loader = $(".js-faculty-loading");
	var $container = $(".js-faculty-container");
	
	$loader.show();
	$.ajax({
		url: "/activity_faculties/ahah/" + nActivity,
		type: 'post',
		data: { ActivityID: nActivity },
		success: function(data) {
			$container.html(data);
			$loader.hide();
			
			// CHECK IF ATTENDEE HAS BEEN MARKED AS SELECTED	
			$(".js-all-faculty").each(function() {
				var $row = $(this);
				var $checkBox = $row.find('.js-selected-checkbox');
				var nPerson = $row.find('.personId').val();
				var nFaculty = $row.find('.facultyId').val();
				
				// DETERMINE IF CURRENT ROW NEEDS CHECKED
				if($.ListFind(selectedRows, nFaculty)) {
					$row.addClass('alert alert-info');
					$checkBox.attr('checked', true);
				}
				
				$checkBox.click(function() {
					if($(this).attr("checked")) {
						$row.addClass('alert alert-info');
						
						// ADD CURRENT MEMBER TO SELECTEDROWS LIST
						addSelectedRow({
							person:nPerson,
							faculty:nFaculty
						});
					} else {
						$row.removeClass('alert alert-info');
						
						// REMOVE CURRENT MEMBER FROM SELECTEDROWS LIST
						removeSelectedRow({
							person:nPerson,
							faculty:nFaculty
						});
					}
				});
			});
		}
	});
};

function updateSelectedCount(nAmount) {
	selectedCount = selectedCount + nAmount;
	if(selectedCount > 0) {
		$(".js-partic-actions .btn").removeClass('disabled');
	} else {
		$(".js-partic-actions .btn").addClass('disabled');
	}
	$(".js-label-status-selected").text(selectedCount);
	
}

$(document).ready(function() {
	var $checkAll = $('.js-check-all');
	var $facultyRemover = $('.js-remove-faculty');
	var $fileApprover = $('.js-approve-file');
	var $fileUploader = $('.js-file-uploader');
	var $fileUploadLink = $('.js-upload-file');
	var $photo = $('.js-person-photo');
	
	// AHAH DATA LOAD
	updateFaculty();
		
	$checkAll.live('click', function() {
		var $allElem = $(".js-all-faculty");
		var selectAll = $(this).attr("checked");
		
		$allElem.each(function() {
			var $row = $(this);
			var $checkBox = $row.find('.js-selected-checkbox');
			var nPerson = $row.find('.personId').val();
			var nFaculty = $row.find('.facultyId').val();
			var rowChecked = $checkBox.attr("checked");
			
			if(selectAll && !rowChecked) {
				// ADD CURRENT MEMBER TO SELECTEDMEMBERS LIST
				addSelectedRow({
					person: nPerson,
					faculty: nFaculty
				});
				
				$checkBox.attr("checked",true);
				
				// CHANGE BACKGROUND COLOR OF PERSONROW
				$row.addClass('alert alert-info');
			} else if(!selectAll && rowChecked) {
				if(rowChecked) {
					// ADD CURRENT MEMBER TO SELECTEDMEMBERS LIST
					removeSelectedRow({
						person: nPerson,
						faculty: nFaculty
					});
					
					$checkBox.attr("checked",false);
					
					// CHANGE BACKGROUND COLOR OF PERSONROW
					$row.removeClass('alert alert-info');
				}
			}
		});
	});
	
	$facultyRemover.bind("click",function() {
		if(confirm("Are you sure you want to remove the checked people from this Activity?")) {
			var result = "";
			var cleanData = "";
			$(".MemberCheckbox:checked").each(function () {
				result = $.ListAppend(result,$(this).val(),",");
			});
			
			$.blockUI({ message: '<h1>Removing Selected Faculty Members...</h1>'});
			$.getJSON(sRootPath + "/AJAX_adm_Activity.cfc", { method: "removeCheckedFaculty", PersonList: result, ActivityID: nActivity, returnFormat: "plain" },
			function(data) {
				if(data.STATUS) {
					addMessage(data.STATUSMSG,250,6000,4000);
				} else {
					addError(data.STATUSMSG,250,6000,4000);
				}
				
				updateFaculty();
				updateActions();
				$.unblockUI();	
			});
		}
	});
	
	/* NOTES DIALOG */
	$fileUploader.dialog({ 
		title:"Upload File",
		modal: false, 
		autoOpen: false,
		height:246,
		width:350,
		resizable: false,
		stack: false,
		buttons: { 
			Save:function() {
				$("#frmFileUpload").ajaxSubmit({
					success: function() {
						$fileUploader.html('');
						addMessage('File uploaded successfully.',500,6000,4000);
						$fileUploader.dialog('close');
					}
				}); 
			},
			Cancel:function() {
				$fileUploader.dialog('close');
				updateFaculty();
			}
		},
		open:function() {
			$.ajax({
				url: '/files/new/' + currPerson,
				type: 'post',
				data: { keyType: 'person', ActivityID: nActivity }, 
				success: function(data) {
					$fileUploader.html(data);
				}
			});
		},
		close:function() {
			updateFaculty();
			updateActions();
		}
	});
	
	$fileUploadLink.live('click', function() {
		currPerson = this.id.split('|')[1];
		
		$fileUploader.dialog("open");
	});
		
	/* FACULTY FILE APPROVAL */
	$fileApprover.live('click', function() {
		var idSplit = this.id.split('|');
		console.log(idSplit);
		var sApprovalType = idSplit[0];
		var sFileType = idSplit[1];
		var personId = idSplit[2];
		
		$.ajax({
			url: "/AJAX_adm_Activity/approveFacultyFile", 
			type: 'post',
			data: { ActivityID: nActivity, PersonID: personId, FileType: sFileType, Mode: sApprovalType },
			success: function(data) {			
				if(data.STATUS) {
					updateFaculty();
					addMessage(data.STATUSMSG,250,6000,4000);
				} else {
					updateFaculty();
					addError(data.STATUSMSG,250,6000,4000);
				}
			}
		});
	});
	
	/* PHOTO UPLOAD DIALOG */
	$("#PhotoUpload").dialog({ 
		title:"Upload Photo",
		modal: false, 
		autoOpen: false,
		height:120,
		width:450,
		resizable: false,
		open:function() {
			$("#PhotoUpload").show();
		}
	});
	
	$photo.live('click', function() {
		var personId = this.id.split('Photo')[1];
		
		$("#frmUpload").attr("src", '/people/photoupload/' + personId + '?ElementID=' + this.id);
		$("#PhotoUpload").dialog("open");
	});
	/* // END PHOTO UPLOAD DIALOG */
});