/*! ACHILLESPLAYERS main.js
 * ================
 * Main JS application file for ACHILLESPLAYERS v1. This file
 * should be included in the main page. It controls some layout
 * options and data exchange with server.
 *
 * @Author  ilbcj Studio
 * @Support <http://www.ilbcj.com>
 * @Email   <22833638@qq.com>
 * @version 1.0.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */

//Make sure jQuery has been loaded before main.js
if (typeof jQuery === 'undefined') {
	throw new Error('ACHILLESPLAYERS requires jQuery');
}

///*! global function
// * 
// *  @type function
// *  @usage $.message
// */
//(function ($) {
//  'use strict';
//
//  $.fn.tipMessage = function (message) { 
//		$('#successAndFail_message').empty().append(message);
//		$('#successAndFail_Modal').modal('show');
//		var modalTimeOutId = setTimeout(function(){$('#successAndFail_Modal').modal('hide');},2000);
//		console.log( 'timerId: ' +  modalTimeOutId);
//		$('#successAndFail_Modal').on('hidden.bs.modal', function (e) {
//			clearTimeout(modalTimeOutId);
//		});
//	};
//}(jQuery));


/* ACHILLESPLAYERS
 *
 * @type Object
 * @description $.ACHILLESPLAYERS is the main object for the app.
 *              It's used for implementing functions and options related
 *              to the ACHILLESPLAYERS. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.ACHILLESPLAYERS = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.ACHILLESPLAYERS.options = {
	basePath: 'ACHILLESPLAYERSdemo'
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements ACHILLESPLAYERS's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
	'use strict';

	//Extend options if external options exist
	if (typeof ACHILLESPLAYERSOptions !== 'undefined') {
		$.extend(true, $.ACHILLESPLAYERS.options, ACHILLESPLAYERSOptions);
	}

	//Easy access to options
	var o = $.ACHILLESPLAYERS.options;
//	console.log(o.basePath);
	//Set up the object
	_initACHILLESPLAYERS(o);

	//Update table style
	$.extend( true, $.fn.dataTable.defaults, {
		searching: true,
		ordering: false,
		select: 'single',
		pagingType: 'full_numbers',
		dom: 'tr<"row"<"col-xs-2"l><"col-xs-7 text-center"p><"col-xs-3 text-right"i>>',
		bAutoWidth: false,
		lengthMenu: [[1, 10, 25, 50, 100], [1, 10, 25, 50, 100]],
		language: {
			url: o.basePath + '/plugins/datatables/table_label.json'
		},
		drawCallback: function( settings ) {
			//var active_class = 'success';
			var active_class = 'active';
				
			var $th_checkbox = $('table.table > thead > tr > th input[type=checkbox]');
			$th_checkbox.iCheck('uncheck').iCheck('destroy'); 
			$th_checkbox.on('ifClicked', function(){
				var th_checked = !this.checked;//checkbox inside "TH" table header , the value getted equals with the status before clicked
				//alert(th_checked);
				$(this).closest('table').find('tbody > tr').each(function(){
					var row = this;
					if(th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).iCheck('check');//.prop('checked', true);
					else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).iCheck('uncheck');//.prop('checked', false);
				});
			});
			
			//select/deselect a row when the checkbox is checked/unchecked
			$('table.table').on('ifToggled', 'tbody > tr > td input[type=checkbox]' , function(){
				//alert(this.checked);
				var $row = $(this).closest('tr');
				if(this.checked) $row.addClass(active_class);
				else $row.removeClass(active_class);
			
				var th_checked2 = true;
				$(this).closest('table').find('tbody > tr > td input[type=checkbox]').each(function(){
					if( $(this).prop('checked') == false ) th_checked2 = false;
				});
				//alert(th_checked2);
				$(this).closest('table').find('th input[type=checkbox]').iCheck(th_checked2?'check':'uncheck');
			});
			
			$('table input').iCheck({
				checkboxClass: 'icheckbox_square-blue',
				radioClass: 'iradio_square-blue',
				increaseArea: '20%' // optional
		    });
		}
	});
	
	//update date.toLocaleString
	Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + "点" + this.getMinutes() + "分" + this.getSeconds() + "秒";
	};
	Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
	};
	
	//Active the main menu and custom menu
	$.ACHILLESPLAYERS.menu.activate();

});

function _refreshTime() {
	'use strict';
	
	var dateStr = "";
	var timeStr = "";
	
	var myDate = new Date();
	
	//year
	dateStr += myDate.getFullYear() + "年";
	//month
	dateStr += parseInt(myDate.getMonth()) + 1 + "月";
	//date
	dateStr += myDate.getDate();
	//week
	var Week = ['日','一','二','三','四','五','六'];  
    dateStr += ' 星期' + Week[myDate.getDay()];  
    
    //time
    timeStr += myDate.getHours() + ":";
    timeStr += myDate.getMinutes() + ":";
    timeStr += myDate.getSeconds() + ".";
    var milliseconds = myDate.getMilliseconds();
//    console.log(milliseconds);
    while( (""+milliseconds).length < 3) {
//    	console.log(milliseconds + "|||" + milliseconds.length);
    	milliseconds += '0';
    }
    timeStr += milliseconds;
    $("#showDate").html(dateStr);
    $("#showTime").html(timeStr);
//  console.log(dateStr);
//  console.log(timeStr);
}

/* ----------------------------------
 * - Initialize the ACHILLESPLAYERS Object -
 * ----------------------------------
 * All ACHILLESPLAYERS functions are implemented below.
 */
function _initACHILLESPLAYERS(o) {
	'use strict';
	/* Menu
	 * ======
	* Create main menu and custom menu
	*
	* @type Object
	* @usage $.ACHILLESPLAYERS.menu.activate()
	*/
	$.ACHILLESPLAYERS.menu = {
		activate: function () {
			//get admin info
			o.basePath && $.post(o.basePath + '/login/queryPlayerInfo.action',function(data){
				$('span.user-info').html(data.playername);
				$('#changepwd_name').html(data.playername);
			});
			
			//add logoff event
			$('#logoff').on('click.ACHILLESPLAYERS.admin.off', function(e){
				o.basePath && $.post(o.basePath + '/login/logout.action', function(data){
					window.location = o.basePath;
				});
			});
		  
			//load main menu
			var menu = '<li class="header">控制台</li>';
/*			menu += '<li class="treeview">';
			menu += '<a href="javascript:void(0)"><i class="fa fa-gears"></i> <span>选手管理</span>';
            menu +=   '<span class="pull-right-container">';
            menu +=     '<i class="fa fa-angle-left pull-right"></i>';
            menu +=   '</span>';
            menu += '</a>';
            menu += '<ul class="treeview-menu">';
            menu +=   '<li><a id="menu_player_maintain" href="javascript:void(0)"><i class="fa fa-circle-o"/>选手信息</a></li>';
            menu += '</ul>';
            menu += '</li>';
            
            menu += '<li class="treeview">';
			menu += '<a href="javascript:void(0)"><i class="fa fa-gears"></i> <span>赛季管理</span>';
            menu +=   '<span class="pull-right-container">';
            menu +=     '<i class="fa fa-angle-left pull-right"></i>';
            menu +=   '</span>';
            menu += '</a>';
            menu += '<ul class="treeview-menu">';
            menu +=   '<li><a id="menu_season_maintain" href="javascript:void(0)"><i class="fa fa-circle-o"/>赛季信息</a></li>';
            menu +=   '<li><a id="menu_round_maintain" href="javascript:void(0)"><i class="fa fa-circle-o"/>场次信息</a></li>';
            menu += '</ul>';
            menu += '</li>';
            
            menu += '<li class="treeview">';
			menu += '<a href="javascript:void(0)"><i class="fa fa-gears"></i> <span>积分管理</span>';
            menu +=   '<span class="pull-right-container">';
            menu +=     '<i class="fa fa-angle-left pull-right"></i>';
            menu +=   '</span>';
            menu += '</a>';
            menu += '<ul class="treeview-menu">';
            menu +=   '<li><a id="menu_score_maintain" href="javascript:void(0)"><i class="fa fa-circle-o"/>积分榜</a></li>';
            menu += '</ul>';
            menu += '</li>';
            
            menu += '<li class="treeview">';
			menu += '<a href="javascript:void(0)"><i class="fa fa-gears"></i> <span>系统管理</span>';
            menu +=   '<span class="pull-right-container">';
            menu +=     '<i class="fa fa-angle-left pull-right"></i>';
            menu +=   '</span>';
            menu += '</a>';
            menu += '<ul class="treeview-menu">';
            menu +=   '<li><a id="menu_config_maintain" href="javascript:void(0)"><i class="fa fa-circle-o"/>参数配置</a></li>';
            menu += '</ul>';*/
			
			menu += '<li class="treeview">';
			menu += '<a href="javascript:void(0)"><i class="fa fa-gears"></i> <span>对战管理</span>';
            menu +=   '<span class="pull-right-container">';
            menu +=     '<i class="fa fa-angle-left pull-right"></i>';
            menu +=   '</span>';
            menu += '</a>';
            menu += '<ul class="treeview-menu">';
            menu +=   '<li><a id="menu_battle_maintain" href="javascript:void(0)"><i class="fa fa-circle-o"/>对战信息</a></li>';
            menu += '</ul>';
            menu += '</li>';
            
            menu += '</li>';
            
            $('#mm').html(menu);
    		
    		$('#menu_battle_maintain').on('click.ACHILLESPLAYERS.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/battle/battle_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ACHILLESPLAYERS.checkLoad(response);$.ACHILLESPLAYERS.match.activate();});
    		});
    		
    		$('#change_pwd').on('click.ACHILLESPLAYERS.changepwd.data-api',function(e){
    			$('#oldPwd').val('');
    			$('#newPwd').val('');
    			$('#rePwd').val('');
    			$('#pwd_modal').modal('show');
    		});
    		$('#change_pwd_confirm').on('click.ACHILLESPLAYERS.changepwd.confirm.data-api',function(e){
    			$("#progress_Modal").modal('show');
    			var oldPwd = $('#oldPwd').val();
    			var newPwd = $('#newPwd').val();
    			var rePwd = $('#rePwd').val();
    			if( newPwd == null || newPwd == '' || newPwd != rePwd ) {
    				$("#progress_Modal").modal('hide');
    				var message = "两次输入的新口令内容不一致！";
					$.ACHILLESPLAYERS.tipMessage(message, false);
					return;
    			}
    			var postData = '';
    			postData += 'pwd=' + oldPwd;
    			postData += '&newPwd=' + newPwd;
				o.basePath && $.post(o.basePath + "/login/changePwd.action", postData, function(retObj) {
					$("#progress_Modal").modal('hide');
					if(retObj.result == true) {
						var message = "修改口令成功！";
						$.ACHILLESPLAYERS.tipMessage(message);
					} else {
						var message = "修改口令操作失败！[" + retObj.message + "]";
						$.ACHILLESPLAYERS.tipMessage(message, false);
					}
				}, "json");
    		});
			/*$('#menu_player_maintain').on('click.ACHILLESPLAYERS.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/player/player_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ACHILLESPLAYERS.checkLoad(response);$.ACHILLESPLAYERS.player.activate();});
    		});
    		$('#menu_season_maintain').on('click.ACHILLESPLAYERS.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/period/season_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ACHILLESPLAYERS.checkLoad(response);$.ACHILLESPLAYERS.season.activate();});
    		});
    		$('#menu_round_maintain').on('click.ACHILLESPLAYERS.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/period/round_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ACHILLESPLAYERS.checkLoad(response);$.ACHILLESPLAYERS.round.activate();});
    		});
    		$('#menu_score_maintain').on('click.ACHILLESPLAYERS.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/score/score_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ACHILLESPLAYERS.checkLoad(response);$.ACHILLESPLAYERS.score.activate();});
    		});
    		$('#menu_config_maintain').on('click.ACHILLESPLAYERS.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/config/config_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ACHILLESPLAYERS.checkLoad(response);$.ACHILLESPLAYERS.config.activate();});
    		});*/
		}
	};// end of $.ACHILLESPLAYERS.menu
	
	/* match
	* ======
	* match info page
	*
	* @type Object
	* @usage $.ACHILLESPLAYERS.match.activate()
	* @usage $.ACHILLESPLAYERS.match.bindPlayerInfo()
	*/
	$.ACHILLESPLAYERS.match = {
		activate: function () {
			$.ACHILLESPLAYERS.match.queryRegistrationInfo();
			
			$.ACHILLESPLAYERS.match.queryActiveMatchInfo();
			
			$('#modify_registration').on('click.ACHILLESPLAYERS.match.modifyregistration', $.ACHILLESPLAYERS.match.modifyRegistration);
			$('#registration_save').on('click.ACHILLESPLAYERS.match.registrationsave', $.ACHILLESPLAYERS.match.saveRegistrationInfo);
			$('#registration_reload').on('click.ACHILLESPLAYERS.match.registrationreload', $.ACHILLESPLAYERS.match.queryRegistrationInfo);
		},
		modifyRegistration: function () {
			if( $('#modify_registration').hasClass('disabled') ) {
				var message = '本轮比赛已过报名时间，不能更改挑战信息！';
				$.ACHILLESPLAYERS.tipMessage(message, false)
				return;
			}
			$('#registration_cover').addClass('hidden');
		},
		queryRegistrationInfo: function () {
			$("#progress_Modal").modal('show');
			o.basePath && $.post(o.basePath + "/match/queryMatchRegistration.action", {}, function(retObj) {
				$("#progress_Modal").modal('hide');
				if(retObj.result == true) {
					if( retObj.plats.length == 0 ) {
						var message = "获取比赛地图信息失败![没有可用地图]";
						$.ACHILLESPLAYERS.tipMessage(message, false);
						return;
					}
					
					$('#season_round_info').html(retObj.seasonRoundInfo.name);
					var html = '';
					var playerOptionStr = '';//'<option value></option>';
					var platOptionStr = '';//'<option value></option>'
					// 对战选手
					html += '<div class="form-group">';
					html += '<label>选择挑战对手</label>'
					html += '<ul class="list-group list-group-unbordered">';
					retObj.regInfoForEdit.adversaries.forEach(function(player, index){
						html += '<li class="list-group-item"><div class="row">';
						html += '<div class="col-xs-11"><div class="row "><div class="col-xs-12"><select id="adversary' + index + '" class="form-control select2" data-placeholder="选择挑战对手" style="width: 100%;"></select></div></div><div class="row"><div class="col-xs-12"><select id="plat' + index + '" class="form-control select2" multiple="multiple" data-placeholder="选择地图可多选！！！" style="width: 100%;"></select></div></div></div>';
						html += '<div class="col-xs-1"><a class="btn btn-app clearAdversaryItem" data-index="' + index + '"><i class="fa fa-trash-o"></i> 清空</a></div>';
						html += '</div></li>';
						playerOptionStr += '<option value=' + player.id + '>第' + player.ranking + '名 - ' + player.name + ' - ' + player.loginId + ' - ' + player.race + '</option>';
					});
					html += '</ul></div>';
					
					// 对战地图
					retObj.plats.forEach(function(plat, index){
						platOptionStr += '<option value=' + plat.id + '>' + plat.name + '</option>';
					});
					
					// 对战日期
					html += '<div class="form-group"><label for="exampleInputEmail1">选择对战日期</label>';
					html += '<ul class="list-group list-group-unbordered"><li class="list-group-item">';
					html += '<span class="margin"><input id="week0" type="checkbox" value="0"><label for="monday">星期一</label></span>';
					html += '<span class="margin"><input id="week1" type="checkbox" value="1"><label for="tuesday">星期二</label></span>';
					html += '<span class="margin"><input id="week2" type="checkbox" value="2"><label for="wednesday">星期三</label></span>';
					html += '<span class="margin"><input id="week3" type="checkbox" value="3"><label for="thusday">星期四</label></span>';
					html += '<span class="margin"><input id="week4" type="checkbox" value="4"><label for="friday">星期五</label></span>';
					html += '<span class="margin"><input id="week5" type="checkbox" value="5"><label for="saturday">星期六</label></span>';
					html += '<span class="margin"><input id="week6" type="checkbox" value="6"><label for="sunday">星期日</label></span>';
					html += '</li></ul></div>';
					
					$("#registration_info").empty().append(html);
					$('.clearAdversaryItem').on('click.ACHILLES.match.clearadversaryitem', $.ACHILLESPLAYERS.match.clearAdversaryItem);
					$('.select2').select2();
					$('#adversary0, #adversary1, #adversary2, #adversary3, #adversary4').append( playerOptionStr );
					$('#adversary0, #adversary1, #adversary2, #adversary3, #adversary4').each(function(){
						$(this).val([]).select2();
					});
					retObj.regInfo.adversaryIds.forEach(function(adversaryId, index){
						$('#adversary'+ index).val(adversaryId).select2();
					});
					
					$('#plat0, #plat1, #plat2, #plat3, #plat4').append( platOptionStr );
					$('#plat0, #plat1, #plat2, #plat3, #plat4').each(function(){
						$(this).val([]).select2();
					});
					retObj.regInfo.platIds.forEach(function(platId, index){
						if( platId != null ) {
							var selectedPlat = platId.split(',');
							$('#plat'+ index).val( selectedPlat ).select2();	
						}
					});
					
					$('#week0, #week1, #week2, #week3, #week4, #week5, #week6').iCheck({
					    checkboxClass: 'icheckbox_square-blue margin',
						radioClass: 'iradio_square-blue margin',
					    increaseArea: '20%' // optional
					});
					// for rest day
					$('#week0').iCheck('disable');
					$('#week0').parent().next().addClass('text-gray');
					retObj.regInfo.dayIds.forEach(function(dayId){
						$('#week'+ dayId).iCheck('check');
					});
					
					if( retObj.seasonRoundInfo.roundPhase != 0 ) {
						$('#modify_registration').addClass('disabled');
					}
					$('#registration_save').data('reg_info', retObj.regInfo);
				} else {
					var message = "获取选手详细报名信息失败！[" + retObj.message + "]";
					$.ACHILLESPLAYERS.tipMessage(message, false);
				}
			}, "json");
		},
		clearAdversaryItem: function () {
			var index = $(this).data('index');
			if ( index != null && index >= 0 ) {
				$('#adversary' + index).val([]).select2();
				$('#plat' + index).val([]).select2();
			}
		},
		saveRegistrationInfo: function () {
			var regInfo = $('#registration_save').data('reg_info');
			
			regInfo.adversaryIds = [];
			regInfo.platIds = [];
			var message = '';
			$('#adversary0, #adversary1, #adversary2, #adversary3, #adversary4').each(function(index, adversary){
				var self = $(this);
				var platId = $('#plat' + index).val();
				if( self.val() != null ) {
					if( platId == null ) {
						message = "没有为比赛指定地图！";
						$.ACHILLESPLAYERS.tipMessage(message, false);
						return;
					}
					if( platId.length != 3 ) {
						message = "每场挑战要选择三张地图！";
						$.ACHILLESPLAYERS.tipMessage(message, false);
						return;
					}
					if( regInfo.adversaryIds.indexOf( self.val() ) != -1 ) {
						message = "不能选择重复的对手！";
						$.ACHILLESPLAYERS.tipMessage(message, false);
						return;
					}
					regInfo.adversaryIds.push(self.val());
					regInfo.platIds.push(platId.toString());
				}
				else {
					if( platId != null ) {
						message = '选择了对战地图，但没有为比赛指定挑战对手！';
						$.ACHILLESPLAYERS.tipMessage(message, false);
						return;
					}
				}
			});
			if(message != '') {
				return;
			}
			
			regInfo.dayIds= [];
			$('#week0, #week1, #week2, #week3, #week4, #week5, #week6').each(function(index, day){
				var self = $(this);
				if(self.prop('checked')) {
					var dayId = self.val();
					regInfo.dayIds.push(dayId);
				}
			});
			//console.log(regInfo);
			
			var postData = 'regInfo.playerId=' + regInfo.playerId;
			regInfo.adversaryIds.forEach(function(adversaryId){
				postData += '&regInfo.adversaryIds=' + adversaryId;
			});
			regInfo.platIds.forEach(function(platId){
				postData += '&regInfo.platIds=' + platId;
			});
			regInfo.dayIds.forEach(function(dayId){
				postData += '&regInfo.dayIds=' + dayId;
			});
			o.basePath && $.post(o.basePath + "/match/saveMatchRegistration.action", postData, function(retObj) {
				if(retObj.result == true) {
					var message = "报名信息更新成功!";
					$.ACHILLESPLAYERS.tipMessage(message);
					$('#registration_cover').removeClass('hidden');
				} else {
					var message = "报名信息更新失败! " + retObj.message;
					$.ACHILLESPLAYERS.tipMessage(message, false);
				}
			}, "json");
			return;
		},
		queryActiveMatchInfo: function () {
			o.basePath && $.post(o.basePath + "/match/queryActiveMatchInfo.action", {}, function(retObj) {
				if(retObj.result == true) {
					$('#match_day_info_table_wapper').html('');
					var matchInfos = retObj.activeMatchInfo;
					var index=0, len=matchInfos.length;
					for (; index<len; index++) {
						var matchInfo = matchInfos[index];
						var html = '<div class="box"><div class="box-header"><h3 class="box-title">' + matchInfo.dayName + '</h3></div><div class="box-body no-padding"><table id="active_match_info_day_' 
								+ index + '" class="table table-striped table-hover"></table></div></div>';
						$('#match_day_info_table_wapper').append(html);
						
						$('#active_match_info_day_' + index).DataTable( {
							paging: false,
					        data: matchInfo.matchInfo,
					        rowId: 'id',
					        columns: [
					        	{ title: "挑战者", data: "challengerName", width: "200px" },
					            { title: "擂主", data: "adversaryName", width: "200px" },
					            { title: "地图", data: "platName", width: "600px" },
					            { title: "结果", data: "result" },
					            { title: "比分", data: "score" }					            
					        ],
					        columnDefs: [
					        	{
									render: function ( data, type, row ) {
										var html = '';
										if( data != '' ) {
											var plats = data.split(',');
											plats.forEach(function(plat){
												if(plat != null && plat != '') {
													html += '<span class="margin badge bg-green">' + plat + '</span>';	
												}
											});
											 
										}
										
										return html;
									},
									targets: 2
								},
								{
									render: function ( data, type, row ) {
										var html = '';
										if(data === 1) {
											html = '<span class="winner fa fa-flag">' + row.challengerName + '</span><span class="looser fa fa-bomb">' + row.adversaryName + '</span>';
										}
										else if(data === 2) {
											html = '<span class="looser fa fa-bomb">' + row.challengerName + '</span><span class="winner fa fa-flag">' + row.adversaryName + '</span>';
										}
										else if(data === 3) {
											html = '平局';
										}
										else if(data === 4) {
											html = '<span class="looser fa fa-bomb">' + row.challengerName + ' 缺席</span>';
										}
										else if(data === 5) {
											html = '<span class="looser fa fa-bomb">' + row.adversaryName + ' 缺席</span>';
										}
										return html;
									},
									targets: 3
								}
							]
					   });
					}
					
				} else {
					var message = '查询对战信息失败![' + retObj.message + ']';
					$.ACHILLESPLAYERS.tipMessage(message, false);
				}
			}, 'json');
		}
	};// end of $.ACHILLESPLAYERS.match
	
	/* season
	* ======
	* match season infomation maintain page
	*
	* @type Object
	* @usage $.ACHILLESPLAYERS.season.activate()
	* @usage $.ACHILLESPLAYERS.season.addSeasonWindow()
	* @usage $.ACHILLESPLAYERS.season.addSeasonConfirm()
	* @usage $.ACHILLESPLAYERS.season.batchDelSeason()
	* @usage $.ACHILLESPLAYERS.season.delSeason()
	* @usage $.ACHILLESPLAYERS.season.delSeasonsConfirm()
	*/
	$.ACHILLESPLAYERS.season = {
		activate: function () {
			o.basePath && $('#season_main_table').DataTable( {
				ajax:{
					url: o.basePath + '/period/querySeasons.action',
					type: 'POST',
					dataSrc: 'items'
				},
				processing: true,
				serverSide: true,
				columns: [
					{ data: '' },
					{ data: 'name' },
					{ data: 'timestamp' },
					{ data: 'memo' }
				],
				rowId: 'id',
				columnDefs: [
					{
						render: function ( data, type, row ) {
							return '<input type="checkbox" data-id="' + row.id + '" />';
						},
						targets: 0
					},
					{
						render: function ( data, type, row ) {
							var html = '<div class="btn-group">';
							html += '<button class="season_info btn btn-xs btn-success" data-id="' + row.id + '"><i class="fa fa-edit"></i>详情</button>';
							html += '<button class="season_del btn btn-xs btn-danger" data-id="' + row.id + '"><i class="fa fa-trash-o"></i>删除</button>';
							html += '</div>';
							return html;
						},
						targets: 4
					}
				],
				createdRow: function ( row, data, index ) {
					$('td', row).eq(0).addClass('text-center');
				}
			});
			
			//listen page items' event
			$('#add_season').on('click.ACHILLESPLAYERS.season.add', $.ACHILLESPLAYERS.season.addSeasonWindow);
			$('#season_detail_modal_confirm').on('click.ACHILLESPLAYERS.season.addconfirm', $.ACHILLESPLAYERS.season.saveSeasonConfirm);
			$('#del_seasons').on('click.ACHILLESPLAYERS.season.delete.batch', $.ACHILLESPLAYERS.season.batchDelSeason);
			$('#season_main_table').on( 'draw.dt', function () {
				$('.season_info').on('click.ACHILLESPLAYERS.season.detail', $.ACHILLESPLAYERS.season.addSeasonWindow);
				$('.season_del').on('click.ACHILLESPLAYERS.season.delete.single', $.ACHILLESPLAYERS.season.delSeason);
			});
			$('#season_confirm_modal_confirm').on('click.ACHILLESPLAYERS.season.delconfirm', $.ACHILLESPLAYERS.season.delSeasonsConfirm);
		},
		addSeasonWindow: function () {
			var id = $(this).data('id');
			if( typeof id === 'undefined' ) {
				$('#name').val('');
		    	$('#timestamp').val('');
		    	$('#memo').val('');
		    	$('#season_detail_modal_confirm').data('season_id', 0);
			}
			else {
				var rowData = $('#season_main_table').DataTable().row( '#' + id ).data();
				$('#name').val(rowData.name);
		    	$('#timestamp').val(rowData.timestamp);
		    	$('#memo').val(rowData.memo);
				$('#season_detail_modal_confirm').data('season_id', id);
			}
			$('#season_detail_modal').modal('show');
		},
		saveSeasonConfirm: function () {
			var id = $('#season_detail_modal_confirm').data('season_id');
			var name = $('#name').val();
		    var time = $('#timestamp').val();
		    var memo = $('#memo').val();
		    
			var postData = 'season.id=' + id;
			postData += '&season.name=' + name;
			postData += '&season.timestamp=' + time;
			postData += '&season.memo=' + memo;
	
			o.basePath && $.post(o.basePath + '/period/saveSeason.action?rand=' + Math.random(), postData, function(retObj,textStatus, jqXHR) {
	    		if(retObj.result == true)
				{
					o.basePath && $('#season_main_table').DataTable().ajax.reload();
					var message = '保存赛季信息成功!';
					$.ACHILLESPLAYERS.tipMessage(message);
				} else {
					var message = '保存赛季信息失败![' + retObj.message + ']';
					$.ACHILLESPLAYERS.tipMessage(message, false);
				}
			}, 'json');
		},
		batchDelSeason: function () {
			if( ($('#season_main_table :checkbox:checked[data-id]').length == 0) ) { 
				var message = "请选择要删除的赛季!";
				$.ACHILLESPLAYERS.tipMessage(message);
				return;
			} else {
				var delIds = '';
				$("#season_main_table :checkbox").each(function(index,checkboxItem){
					if($(checkboxItem).prop('checked') && index != 0){
						delIds += "delIds=" + $(checkboxItem).attr('data-id') + "&";
					}
				});
				var message = '已经选取了' + $("#season_main_table :checkbox:checked[data-id]").length + '条记录。是否要删除这些赛季？';
				$('#season_confirm_modal_message').empty().append(message);
				$('#season_confirm_modal_confirm').data('delIds', delIds);
				$("#season_confirm_modal").modal('show');
			}
		},
		delSeason: function () {
			var rowId = $(this).data('id');
			var delIds = 'delIds=' + rowId;
			var message = '是否要删除此赛季？';
			$('#season_confirm_modal_message').empty().append(message);
			$('#season_confirm_modal_confirm').data('delIds', delIds);
			$("#season_confirm_modal").modal('show');
		},
		delSeasonsConfirm: function () {
			var postData = '';
			postData = $('#season_confirm_modal_confirm').data('delIds');
			o.basePath && $.post(o.basePath + '/period/deleteSeasons.action', postData, function(retObj) {
				if(retObj.result == true) {
					var message = '赛季信息已删除';
					$.ACHILLESPLAYERS.tipMessage(message);
					$('#season_main_table').DataTable().ajax.reload();
				} else {
					var message = '删除赛季信息操作失败![' + retObj.message + ']';
					$.ACHILLESPLAYERS.tipMessage(message, false);
				}
			}, 'json');
		}
	};// end of $.ACHILLESPLAYERS.season
	
	/* TipMessage(message)
	* ==========
	* Showing the info or warn message.
	*
	* @type Function
	* @usage: $.ACHILLESPLAYERS.tipMessage(message)
	*/
	$.ACHILLESPLAYERS.tipMessage = function(message, isAutoClose) {
		isAutoClose = arguments[1]===undefined ? true : arguments[1];
		$('#tipModal').removeClass('modal-danger').removeClass('modal-info');
		if( isAutoClose ) {
			$('#tipModal').addClass('modal-info');
		}
		else {
			$('#tipModal').addClass('modal-danger');
			$('#tipModal').modal({backdrop: 'static', keyboard: false});
		}
		$('#tipMessage').empty().append(message);
		$('#tipModal').modal('show');
		if(isAutoClose) {
			var modalTimeOutId = setTimeout(function(){$('#tipModal').modal('hide');},2000);
		}
		
		//console.log( 'timerId: ' +  modalTimeOutId);
		$('#tipModal').on('hidden.bs.modal', function (e) {
			if(isAutoClose)
				clearTimeout(modalTimeOutId);
		});
	};// end of $.ACHILLES.tipMessage
  
	/* CheckLoad()
	* ==========
	* check load response.
	*
	* @type Function
	* @usage: $.ACHILLESPLAYERS.checkLoad(response)
	*/
	$.ACHILLESPLAYERS.checkLoad = function(response) {
		if(! new RegExp('content-wrapper-inner').test(response) ){
			window.location.href = $.ACHILLESPLAYERS.options.basePath;
		}
			
	};// end of $.ACHILLESPLAYERS.checkLoad
  
///* CheckLoad()
//* ==========
//* active function of checkbox in table, which can turn the rows's check status on/off.
//*
//* @type Function
//* @usage: $.ACHILLESPLAYERS.checkLoad()
//*/
//$.ACHILLESPLAYERS.checkLoad = function() {
//		
//};// end of $.ACHILLESPLAYERS.checkLoad
  
}
