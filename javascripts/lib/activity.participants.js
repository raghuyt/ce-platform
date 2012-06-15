function addSelectedAttendee(params) {
	var settings = $.extend({},params);
	
	if(settings.person && settings.person > 0) {
		if(!$.ListFind(SelectedMembers,settings.person,",")) {
		SelectedMembers = $.ListAppend(SelectedMembers, settings.person, ",");
		}
	}
	
	if(settings.attendee && settings.attendee > 0) {
		if(!$.ListFind(SelectedAttendees,settings.attendee,",")) {
		SelectedAttendees = $.ListAppend(SelectedAttendees, settings.attendee, ",");
		}
	}
	
	updateSelectedCount(1);
}

function cancelButton() {
	$("#CreditsDialog").dialog("close");
}

function clearSelectedMembers() {
	SelectedAttendees = '';
	SelectedMembers = '';
	SelectedCount = 0;
	$("#CheckedCount").html("(0)");
}

function removeSelectedPerson(params) {
	var settings = $.extend({},params);
	
	if(settings.person && settings.person > 0) {
		SelectedMembers = $.ListDeleteAt(SelectedMembers, $.ListFind(SelectedMembers, settings.person));
	}
	
	if(settings.attendee && settings.attendee > 0) {
		SelectedAttendees = $.ListDeleteAt(SelectedAttendees, $.ListFind(SelectedAttendees, settings.attendee));
	}
	
	
	updateSelectedCount(-1);
}

function resetAttendee(nA,nP,sP) {
	$.ajax({
		url: "/AJAX_adm_Activity/resetAttendee", 
		type: 'post',
		data: { attendeeId: nP, ActivityID: nA, PaymentFlag: sP },
		success: function(data) {
			if(data.STATUS) {				
				addMessage(data.STATUSMSG,250,6000,4000);
				updateStats();
				updateRegistrants();
			} else {
				addError(data.STATUSMSG,250,6000,4000);
			}
		}
	});
}

function saveAttendee() {
	$.blockUI({ message: '<h1>Adding Attendee...</h1>'});
	
	$.post("/AJAX_adm_Activity/saveAttendee", { PersonID: $("#AttendeeID").val(), ActivityID: nActivity, returnFormat: "plain" },
		function(returnData) {
			cleanData = $.trim(returnData);
			status = $.ListGetAt(cleanData,1,"|");
			statusMsg = $.ListGetAt(cleanData,2,"|");
			
			if(status == 'Success') {
				updateRegistrants(nPageNo, nStatus);
				addMessage(statusMsg,250,6000,4000);
				$.unblockUI();
			} else if(status == 'Fail') {
				addError(statusMsg,250,6000,4000);
				$.unblockUI();
				$("#AttendeeName").val("Click To Add Attendee");
			}
		});
	
	$("#AttendeeID").val('');
	$("#AttendeeName").val('Click To Add Attendee');
}

function updateAttendeeFilterCounts() {
	$.each($('.attendees-filter').children(), function(i, item) {
		// DETERMINE IF CURRENT LIST ITEM IS A STATUS ROW
		if($(this).hasClass('attendee-status')) {
			var status = this.id.split('status')[1];
			var countContainer = $(this).find('span.attendee-status-count');
			
			// PROVIDE STATUS COUNT
			countContainer.html('(' + eval('status' +  status + 'Count') + ')');
		}
	});
}

function updatePagesDropdown(nPages) {
	var pagesContainer = $('.pages');
	var pageSelector = $('.pageSelector');
	
	pagesContainer.children().remove();
	
	for(var i=1; i<=nPages; i++) {
		var pageLink = $('<a />').addClass('page').attr('href','/activities/adm_participants?ActivityID=' + nActivity + '&status=' + nStatus + '&page=' + i).text(i);
		var page = $('<li />').append(pageLink).appendTo(pagesContainer);
	}
}

function updateRegistrants(nPage, nStatus) {
	$("#RegistrantsLoading").show();
	
	$.ajax({
		url: '/activity_participants/ahah', 
		type: 'get',
		data: { activityId: nActivity, status: nStatus, selectedAttendees: SelectedAttendees, page: nPage },
		success: function(data) {
			$("#RegistrantsContainer").html(data);
			$("#RegistrantsLoading").hide();
			
			$(".AllAttendees").unbind();
			$(".AllAttendees").isPerson();
			
			// PLACE CHECKMARK BY ACTIVE STATUS
			$('.active-status').remove();
			$('#status' + nStatus).find('a').prepend('<i class="icon-ok active-status"></i> ');
			
			// REPLACE ACTIVE STATUS TITLE
			$('.attendee-status-title').text($('#status' + nStatus).find('a span.attendee-status-name').text());
			
			// CHECK IF ALL VIEWABLE ATTENDEES ARE SELECTED
			if($(".AllAttendees").length == TotalAttendeeCount) {
				// CHECK THE CHECK ALL BOX
				$('#CheckAll').attr('checked', true);
			}
			
			// CHECK IF ATTENDEE HAS BEEN MARKED AS SELECTED	
			$(".AllAttendees").each(function() {
				$row = $(this);
				var $checkBox = $row.find('.MemberCheckbox');
				var nPerson = $row.find('.personId').val();
				var nAttendee = $row.find('.attendeeId').val();
				
				// DETERMINE IF CURRENT ROW NEEDS CHECKED
				if($.ListFind(SelectedAttendees, nAttendee)) {
					$row.addClass('alert alert-info');
					$checkBox.attr('checked', true);
				}
				
				$checkBox.click(function() {
					if($(this).attr("checked")) {
						$("#attendeeRow-" + nAttendee).addClass('alert alert-info');
						
						// ADD CURRENT MEMBER TO SELECTEDMEMBERS LIST
						addSelectedAttendee({
							person:nPerson,
							attendee:nAttendee
						});
					} else {
						$("#attendeeRow-" + nAttendee).removeClass('alert alert-info');
						
						// REMOVE CURRENT MEMBER FROM SELECTEDMEMBERS LIST
						removeSelectedPerson({
							person:nPerson,
							attendee:nAttendee
						});
					}
				});
			});
		}
	});
}

function updateSelectedCount(nAmount) {
	SelectedCount = SelectedCount + nAmount;
	$("#label-status-selected").text(SelectedCount);
	$("#statusSelected span.attendee-status-count").text("(" + SelectedCount + ")");
	
}

function updateStatusDate(nAttendee,nType) {
	$.ajax({
		url: "/AJAX_adm_Activity/getAttendeeDate", 
		type: 'post',
		data: { AttendeeId: nAttendee, type: nType },
		dataType: 'json',
		success: function(data) {
			$("#datefill-" + nAttendee).html(data.STATUSMSG);
			$("#editdatelink-" + nAttendee).show();
		}
	});
}

$(document).ready(function() {
	var $attendeeRemover = $('#remove-attendees');
	var $attendeeSelectedViewLink = $('#statusSelected');
	var $attendeeStatusChanger = $('.change-status');
	var $attendeeStatusViewChange = $('.view-attendee-statusdate');
	var $checkAll = $("#CheckAll");
	var $containerDiv = $('#RegistrantsContainer');
	var $fakeAttendeeRemover = $('.deleteLink');
	var $loadingDiv = $('#RegistrantsLoading');
	var $pager = $('a.page,a.first,a.last,a.next,a.previous');
	var $printer = $('.print');
	var $statusDateEditor = $(".EditStatusDate");
	var $statusFilter = $('.attendees-filter li.attendee-status');
	
	MaxRegistrants = $("#MaxRegistrants").val();
	AddlAttendees = $("#AddlAttendees").val();
	NoChange = 0;
	
	updateRegistrants(nPageNo, nStatus);
	
	$attendeeStatusViewChange.live('click', function() {
		var nAttendee = this.id.split('-')[1];
		var nType = this.id.split('-')[2];
		
		updateStatusDate(nAttendee,nType);
				
		// PLACE CHECKMARK BY ACTIVE STATUS
		$('#view-attendee-statuses-' + nAttendee).find('a .active-status').remove();
		$(this).prepend('<i class="icon-ok active-status"></i> ');
	});
	
	// VIEW SELECTED FILTER LINK
	$attendeeSelectedViewLink.live('click', function() {
		var statusName = this.id.split('status')[1];
		
		if(SelectedAttendees.length > 0) {
			updateRegistrants(1, statusName);
		} else {
			addError('You must select participants first.',500,6000,4000);
		}
	});
	
	$checkAll.live('click', function() {
		var $allAttendees = $(".AllAttendees");
		var selectAll = $(this).attr("checked");
		
		$allAttendees.each(function() {
			var $row = $(this);
			var $checkBox = $row.find('.MemberCheckbox');
			var nPerson = $row.find('.personId').val();
			var nAttendee = $row.find('.attendeeId').val();
			var rowChecked = $checkBox.attr("checked");
			
			if(selectAll && !rowChecked) {
				// ADD CURRENT MEMBER TO SELECTEDMEMBERS LIST
				addSelectedAttendee({
					person: nPerson,
					attendee: nAttendee
				});
				
				$checkBox.attr("checked",true);
				
				// CHANGE BACKGROUND COLOR OF PERSONROW
				$row.addClass('alert alert-info');
			} else if(!selectAll && rowChecked) {
				if(rowChecked) {
					// ADD CURRENT MEMBER TO SELECTEDMEMBERS LIST
					removeSelectedPerson({
						person: nPerson,
						attendee: nAttendee
					});
					
					$checkBox.attr("checked",false);
					
					// CHANGE BACKGROUND COLOR OF PERSONROW
					$row.removeClass('alert alert-info');
				}
			}
		});
	});
	
	$fakeAttendeeRemover.live("click",function() {
		var $row = $(this).parents('.personRow');
		var attendee = $row.find('.attendeeId').val();
		
		$.ajax({
			type:'post',
			dataType:'json',
			url:'/ajax_adm_activity/removeAttendeeByID',
			data:{
				'attendeeId':attendee
			},
			async:false,
			success:function(data) {
				if(data.STATUS) {
					$row.remove();
				}
			}
		});
	});
	
	$pager.live("click",function() {
		var $btnNext = $('.pager-simple a.next');
		var $btnPrev = $('.pager-simple a.previous');
		var $pageSelector = $('.pageSelector');
		var pageURL = '/activities/adm_participants?ActivityID=13660&status=0&page=';
		var pageNext;
		var pagePrev;
								 
		nPageNo = $.Mid(this.href,$.Find('page=',this.href)+5,$.Len(this.href)-$.Find('page=',this.href)+4);
		pageNext = (parseInt(nPageNo)+1);
		pagePrev = (parseInt(nPageNo)-1);
		
		// UPDATE SIMPLE PAGER PAGE DROPDOWN
		$pageSelector.text(nPageNo);
		
		// UPDATE COOKIE FOR CURRENT ACTIVITY PAGE NUMBER
		$.post("/UserSettings/setAttendeePage", { ActivityID: nActivity, Page: nPageNo });
		
		// UPDATE SIMPLE PAGER LINKS
		if(pageNext <= totalPages) {
			$btnNext.attr('href',pageURL + pageNext).removeClass('disabled');
		} else {
			$btnNext.addClass('disabled');
		}
		
		if(pagePrev >= 1) {
			$btnPrev.attr('href',pageURL + pagePrev).removeClass('disabled');
		} else {
			$btnPrev.addClass('disabled');
		}
		
		// RELOAD DATA
		updateRegistrants(nPageNo, nStatus);
		return false;
	});
	
	$statusDateEditor.live("click", this, function() {
		var CurrID = this.id;
		var nAttendee = this.id.split('-')[1];
		var dtCurrDate = $.Trim($("#current-attendee-date-" + nAttendee).val());
		var sDate = dtCurrDate.split(' ')[0];
		var $cancelEdit = $('#CancelDate-' + nAttendee);
		var $editStatusDate = $("#edit-attendee-date-" + nAttendee);
		var $saveEdit = $('#SaveDate-' + nAttendee);
		var $viewStatusDate = $("#view-attendee-date-" + nAttendee);
		
		// SET CURRENT STATUS DATE VALUE IN HTML ELEMENTS
		$("#CurrStatusDate-" + nAttendee).val(dtCurrDate);
		$("#EditDateField-" + nAttendee).val(dtCurrDate);
		
		$cancelEdit.click(function() {
			$editStatusDate.hide();
			$viewStatusDate.show();
			
			$cancelEdit.unbind();
			$editStatusDate.unbind();
			$saveEdit.unbind();
			$viewStatusDate.unbind();
		});
		
		$saveEdit.click(function() {
			var nType = $("#current-attendee-status-" + nAttendee).val();
			var dtDate = $("#EditDateField-" + nAttendee).val();
			
			// DETERMINE THERE IS A STATUS AND A DATE
			if(nType != "" && dtDate.length > 0) {
				$.ajax({
					url: "/AJAX_adm_Activity/saveAttendeeDate", 
					type: 'post',
					data: { attendeeId: nAttendee, DateValue: dtDate, Type: nType, returnFormat: "plain" },
					dataType: 'json',
					success: function(data) {
						if(data.STATUS) {
							addMessage(data.STATUSMSG,250,6000,4000);
							updateRegistrants(nPageNo, nStatus);
						} else {
							addError(data.STATUSMSG,250,6000,4000);
							
							$editStatusDate.hide();
							$viewStatusDate.show();
						}
					}
				});
			} else {
				addError("You must provide full date and time.",250,6000,4000);
				$("#EditDateField-" + nAttendee).focus();
				$("#EditDateField-" + nAttendee).val(dtStatusMask);
			}					 
		});
		
		// SHOW EDIT FORM
		$viewStatusDate.hide();
		$editStatusDate.show();
	});
	
	$statusFilter.live("click",function() {
		var statusLink = $(this).find('a');
		var countContainer = $(this).find('span');
		
		// UPDATE THE CURRENT STATUS
		nStatus = parseInt(this.id.split('status')[1]);
		
		$containerDiv.html("");
		$loadingDiv.show();
		
		// UPDATE THE ATTENDEE STATUS COOKIE FOR CURRENT ACTIVITY
		$.ajax({
			url: "/UserSettings/setAttendeeStatus", 
			type: 'post',
			data: { ActivityID: nActivity, status: nStatus },
			success: function(data) {
				updateRegistrants(1, nStatus);
			}
		});
		
		return false;
	});
	
	$attendeeStatusChanger.live('click', function() {
		var updateToStatus = this.id.split('-')[2];
		
		$.ajax({
			url: "/AJAX_adm_Activity/updateAttendeeStatuses",
			type: 'post',
			data: { AttendeeList: SelectedAttendees, ActivityID: nActivity, StatusID: updateToStatus },
			dataType: 'json',
			success: function(data)  {
				if(data.STATUS) {
					addMessage(data.STATUSMSG,500,6000,4000);
					updateStats();
					clearSelectedMembers();
					
					updateRegistrants(nPageNo, nStatus);
				} else {
					addError(data.STATUSMSG,500,6000,4000);
				}
			}
		});
	});
	
	/* REGISTRANTS AND ATTENDEE TEXTBOX START */
	$("#MaxRegistrants,#AddlAttendees").bind("blur", function() {
		if(MaxRegistrants != $("#MaxRegistrants").val()) {		// CHECK IF THE VALUE OF MAXREGISTRANTS CHANGED
			$.post("/AJAX_adm_Activity/updateMaxRegistrants",	{ ActivityID: nActivity, MaxRegistrants: $("#MaxRegistrants").val(), returnFormat: "plain" },
				function(returnData) {
					cleanData = $.trim(returnData);
					status = $.ListGetAt(cleanData,1,"|");
					statusMsg = $.ListGetAt(cleanData,2,"|");
					
					if(status == 'Success') {
						addMessage(statusMsg,250,6000,4000);
					} else {
						addError(statusMsg,250,6000,4000);
					}
				});
			
			MaxRegistrants = $("#MaxRegistrants").val();	// UPDATE MAXREGISTRANTS VALUE
		} else {
			NoChange = NoChange + 1;
		};
		
		if(AddlAttendees != $("#AddlAttendees").val()) {		// CHECK IF THE VALUE OF ADDLATTENDEES CHANGED
			$.post("/AJAX_adm_Activity/updateAddlAttendees", { ActivityID: nActivity, AddlAttendees: $("#AddlAttendees").val(), returnFormat: "plain" },
				function(returnData) {
					cleanData = $.trim(returnData);
					status = $.ListGetAt(cleanData,1,"|");
					statusMsg = $.ListGetAt(cleanData,2,"|");
					
					if(status == 'Success') {
						addMessage(statusMsg,250,6000,4000);
					} else {
						addError(statusMsg,250,6000,4000);
					}
				});
			
			AddlAttendees = $("#AddlAttendees").val();	// UPDATE ADDLATTENDEES VALUE
		} else {
			NoChange = NoChange + 1;
		};
		
		if(NoChange == 2) {
			addError('Please adjust the value you want to update and try again.',250,6000,4000);
			NoChange = 0;
		} else if(NoChange > 0) {
			NoChange = 0;
		};
			
	});
	/* REGISTRANTS AND ATTENDEE TEXTBOX END */
	
	/* REMOVE ONLY CHECKED */
	$attendeeRemover.live('click', function() {
		var cleanData = "";
		
		// DETERMINE IF THERE ARE ATTENDEES SELECTED
		if(SelectedAttendees.length > 0) {
			// DETERMINE IF THE USER MEANS TO REMOVE SELECTED ATTENDEES
			if(confirm("Are you sure you want to remove the checked attendees from this activity?")) {		
				$.blockUI({ message: '<h1>Removing Selected Attendees...</h1>'});
				$.ajax({
					url: "/AJAX_adm_Activity/removeCheckedAttendees", 
					type: 'post',
					data: { PersonList: SelectedMembers,AttendeeList: SelectedAttendees, ActivityID: nActivity, returnFormat: "plain" },
					dataType: 'json',
					success: function(data) {
						if(data.STATUS) {
							addMessage(data.STATUSMSG,250,6000,4000);
							clearSelectedMembers();
						} else {
							addError(data.STATUSMSG,250,6000,4000);
						}
						
						updateStats();
						$.unblockUI();
						updateRegistrants(nPageNo, nStatus);
					}
				});
			}
		} else {
			addError('You must select attendees to remove.',500,3000,2500);
		}
	});
	
	/* PRINT SELECTED ONLY START */
	$printer.live('click', function() {
		var task = this.id.split('-')[1];
		
		switch(task) {
			case 'cme':
				// DETERMINE IF THERE ARE ATTENDEES SELECTED
				if(SelectedAttendees.length > 0) {			
					window.open("/report/CMECert?ActivityID=" + nActivity + "&ReportID=5&selectedAttendees=" + SelectedAttendees);
				} else {
					window.open("/report/CMECert?ActivityID=" + nActivity + "&ReportID=5");
				}
				break;
			
			case 'cne':
				if(SelectedAttendees.length > 0) {			
					window.open("/report/CNECert?ActivityID=" + nActivity + "&ReportID=6&selectedAttendees=" + SelectedAttendees);
				} else {
					window.open("/report/CNECert?ActivityID=" + nActivity + "&ReportID=6");
				}
				break;
		}
	});
});