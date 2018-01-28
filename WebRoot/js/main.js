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
            
            menu += '</li>';
            
            $('#mm').html(menu);
    		
    		$('#menu_battle_maintain').on('click.ACHILLESPLAYERS.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/battle/battle_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ACHILLESPLAYERS.checkLoad(response);$.ACHILLESPLAYERS.match.activate();});
    		});
    		
    		$('#menu_score_maintain').on('click.ACHILLES.menu.data-api',function(e){
    			o.basePath && $('div.content-wrapper').load(o.basePath + '/page/score/score_maintain.html?random=' + Math.random() + ' .content-wrapper-inner',
    					function(response,status,xhr){$.ACHILLESPLAYERS.checkLoad(response);$.ACHILLESPLAYERS.score.activate();});
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
    		
    		$("#progress_Modal").modal('show');
    		o.basePath && $.post(o.basePath + "/match/queryNotice.action", {}, function(retObj) {
				$("#progress_Modal").modal('hide');
				if(retObj.result == true) {
					var notice = retObj.playerNotice.split('\n');
					var message = '';
					notice.forEach(function(item, index){
						if(item != null && item.length > 0) {
							message += '<p>' + item + '</p>';
						}
					});
					if( message != '' ) {
						$.ACHILLESPLAYERS.tipMessage(message, false);
					}
				}
			}, "json");
    		
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
				$.ACHILLESPLAYERS.tipMessage(message, false);
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
						html += '<div class="col-xs-11">';
						html += 	'<div class="row "><div class="col-xs-12"><select id="adversary' + index + '" class="form-control select2" data-placeholder="选择挑战对手" style="width: 100%;"></select></div></div>';
						html += 	'<div class="row style-select"><div class="col-xs-12">';
						html +=			'<div class="subject-info-box-1"><select id="lstBox' + index + '" class="form-control" multiple></select></div>';
						html +=			'<div class="subject-info-arrows text-center"><br />';
						html +=				'<input type="button" id="btnAllRight' + index + '" value=">>" class="btn btn-default" /><br />';
						html +=				'<input type="button" id="btnRight' + index + '" value=">" class="btn btn-default" /><br />';
						html +=				'<input type="button" id="btnLeft' + index + '" value="<" class="btn btn-default" /><br />';
						html +=				'<input type="button" id="btnAllLeft' + index + '" value="<<" class="btn btn-default" />';
						html +=			'</div>';
						html +=			'<div class="subject-info-box-2"><select multiple class="form-control" id="plat' + index + '"></select></div>';
						html +=			'<div class="clearfix"></div>';
						html +=		'</div></div>';
						html += '</div>';
						html += '<div class="col-xs-1"><a class="btn btn-app clearAdversaryItem" data-index="' + index + '"><i class="fa fa-trash-o"></i> 清空</a></div>';
						html += '</div></li>';
						playerOptionStr += '<option value=' + player.id + '>第' + player.ranking + '名 - ' + player.loginId + '[' + player.race + ']</option>';
					});
					html += '</ul></div>';
					
					// 对战地图
					retObj.plats.forEach(function(plat, index){
						var platName = plat.name;
						var platIds = retObj.bonusPlats.split(',');
						if( $.inArray(''+plat.id, platIds) != -1 ) {
							platName = plat.name + ' -- 加分地图';
						}
						platOptionStr += '<option value=' + plat.id + '>' + platName + '</option>';
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
					
					$('[id^=lstBox]').each(function(index, lstBox){
						var self = $(this);
						self.append( platOptionStr );
						$('#btnRight' + index).click(function (e) {
				            $('select').moveToListAndDelete('#lstBox' + index, '#plat' + index);
				            e.preventDefault();
						});
						
				        $('#btnAllRight' + index).click(function (e) {
				            $('select').moveAllToListAndDelete('#lstBox' + index, '#plat' + index);
				            e.preventDefault();
				        });
				        
				        $('#btnLeft' + index).click(function (e) {
				            $('select').moveToListAndDelete('#plat' + index, '#lstBox' + index);
				            e.preventDefault();
				        });
				        
				        $('#btnAllLeft' + index).click(function (e) {
				            $('select').moveAllToListAndDelete('#plat' + index, '#lstBox' + index);
				            e.preventDefault();
				        });
					});
					retObj.regInfo.platIds.forEach(function(platId, index){
						if( platId != null ) {
							var selectedPlat = platId.split(',');
							$('#lstBox'+ index).val( selectedPlat[0] );
							$('#btnRight' + index).click();
							$('#lstBox'+ index).val( selectedPlat[1] );
							$('#btnRight' + index).click();
							$('#lstBox'+ index).val( selectedPlat[2] );
							$('#btnRight' + index).click();
						}
					});
					
					$('[id^=week]').iCheck({
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
				$('#btnAllLeft' + index).click();
			}
		},
		saveRegistrationInfo: function () {
			var regInfo = $('#registration_save').data('reg_info');
			
			regInfo.adversaryIds = [];
			regInfo.platIds = [];
			var message = '';
			$('[id^=adversary]').each(function(index, adversary){
				var self = $(this);
				var plats = $('#plat' + index + ' option');
				if( self.val() != null ) {
					if( plats.length == 0 ) {
						message = "没有为比赛指定地图！";
						$.ACHILLESPLAYERS.tipMessage(message, false);
						return;
					}
					if( plats.length != 3 ) {
						message = "每场挑战要选择三张地图！";
						$.ACHILLESPLAYERS.tipMessage(message, false);
						return;
					}
					if( regInfo.adversaryIds.indexOf( self.val() ) != -1 ) {
						message = "不能选择重复的对手！";
						$.ACHILLESPLAYERS.tipMessage(message, false);
						return;
					}
					var platId = [];
					platId.push( plats[0].value );
					platId.push( plats[1].value );
					platId.push( plats[2].value );
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
			$('[id^=week]').each(function(index, day){
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
					            { title: "地图", data: "platName", width: "400px" },
					            { title: "结果", data: "result" },
					            { title: "比分", data: "score" }					            
					        ],
					        columnDefs: [
					        	{
									render: function ( data, type, row ) {
										var bgcolor = '';
										if(row.challengerVranking < 11 ) {
											bgcolor = 'bg-purple';
										}
										else if(row.challengerVranking < 21 ) {
											bgcolor = 'bg-yellow';
										}
										else if(row.challengerVranking < 31 ) {
											bgcolor = 'bg-blue';
										}
										else if(row.challengerVranking < 41 ) {
											bgcolor = 'bg-green';
										}
										else{
											bgcolor = 'bg-red';
										}
										var html = '<span class="margin badge ' + bgcolor + '"> '+ row.challengerVranking + '</span>' + data;
										return html;
									},
									targets: 0
								},
								{
									render: function ( data, type, row ) {
										var bgcolor = '';
										if(row.adversaryVranking < 11 ) {
											bgcolor = 'bg-purple';
										}
										else if(row.adversaryVranking < 21 ) {
											bgcolor = 'bg-yellow';
										}
										else if(row.adversaryVranking < 31 ) {
											bgcolor = 'bg-blue';
										}
										else if(row.adversaryVranking < 41 ) {
											bgcolor = 'bg-green';
										}
										else {
											bgcolor = 'bg-red';
										}
										var html = '<span class="margin badge ' + bgcolor + '"> '+ row.adversaryVranking + '</span>' + data;
										return html;
									},
									targets: 1
								},
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
											html = '<span class="badge bg-red margin fa fa-flag">' + row.challengerName + '</span><span class="badge bg-black margin fa fa-bomb">' + row.adversaryName + '</span>';
										}
										else if(data === 2) {
											html = '<span class="badge bg-black margin fa fa-bomb">' + row.challengerName + '</span><span class="badge bg-red margin fa fa-flag">' + row.adversaryName + '</span>';
										}
										else if(data === 3) {
											html = '平局';
										}
										else if(data === 4) {
											html = '<span class="badge bg-black margin fa fa-bomb">' + row.challengerName + ' 缺席</span>';
										}
										else if(data === 5) {
											html = '<span class="badge bg-black margin fa fa-bomb">' + row.adversaryName + ' 缺席</span>';
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
	
	/* score
	* ======
	* score infomation maintain page
	*
	* @type Object
	* @usage $.ACHILLES.score.activate()
	* @usage $.ACHILLES.score.save()
	* @usage $.ACHILLES.score.reset()
	*/
	$.ACHILLESPLAYERS.score = {
		activate: function () {
//			$.ACHILLES.score.reset();
			o.basePath && $.post(o.basePath + '/score/queryRoundList.action', {}, function(retObj){
				if(retObj.result == true) {
					var rounds = retObj.rounds;
					var htmlData = '<li class="time-label"><span class="bg-red">第一赛季</span></li>';
					rounds.forEach(function(round, index){
						htmlData += '<li><i class="fa fa-table bg-blue"></i>';
						htmlData +='<div class="timeline-item">';
						htmlData += '<span class="time"><i class="fa fa-clock-o"></i> ' + round.timestamp + '</span>';
						//htmlData += '<h3 class="timeline-header"><a data-toggle="collapse" data-target="#round' + index + '" href="#" ' + ( index === 0 ? '' : 'class="collapsed"' ) +  ' data-round_id="' + round.id + '">' + round.name + '</a></h3>';
						htmlData += '<h3 class="timeline-header"><a data-toggle="collapse" data-target="#round' + index + '" href="#" class="round-score collapsed" data-round_id="' + round.id + '">' + round.name + '</a></h3>';
						htmlData += '<div class="timeline-body">';
						htmlData += '<div class="box box-primary collapse " id="round' + index + '">';
						htmlData += '<div class="box-body no-padding"><table id="round_score_' + round.id + '" class="table table-striped table-hover"></table></div>';
						htmlData += '</div></div></div></li>';
					});
					
					htmlData += '<li><i class="fa fa-clock-o bg-gray"></i></li>';
					
					$('#score_list').html(htmlData);
					
					$('.round-score').on('click.ACHILLES.score.scoreload', $.ACHILLESPLAYERS.score.loadScore);
					
					$('.round-score').get(0).click();
				}
				else {
					var message = '获取比赛场次信息失败![' + retObj.message + ']';
					$.ACHILLESPLAYERS.tipMessage(message, false);
		            return;
				}
			});
			//listen page items' event
//			$('#score_reset').on('click.ACHILLES.score.reset', $.ACHILLES.score.reset);
//			$('#score_save').on('click.ACHILLES.score.save', $.ACHILLES.score.save);
			
		},
		loadScore: function () {
			var roundTitle = $(this);
			var isLoaded = roundTitle.data('loaded');
			if(isLoaded) {
				return;
			}
			
			var roundId = roundTitle.data('round_id');
			var postData = 'roundId=' + roundId;
			o.basePath && $.post(o.basePath + '/score/queryRoundScore.action', postData, function(retObj){
	    		if(retObj.result == true)
				{
					$('#round_score_' + roundId).DataTable( {
						paging: false,
				        data: retObj.items,
				        rowId: 'id',
				        columns: [
				        	{ title: '操作', data: null, defaultContent: '', width: '100px' },
				        	{ title: '选手', data: 'playerName', width: '200px' },
				        	{ title: '排名', data: 'ranking' },
				            { title: '比分', data: 'score' }	,
				            { title: '挑战胜场', data: 'challengerWin', width: '200px' },
				            { title: '挑战败场', data: 'challengerLose', width: '200px' },
				            { title: '守擂胜场', data: 'adversaryWin', width: '200px' },
				            { title: '守擂败场', data: 'adversaryLose', width: '200px' },
				            { title: '是否缺席', data: 'absent', width: '200px' }					            				            
				        ],
				        columnDefs: [
				        	{
								render: function ( data, type, row ) {
									var html = '';
									if(data === 0) {
										if(row.challengerWin === 0 && row.challengerLose === 0 && row.adversaryWin === 0 && row.adversaryLose === 0) {
											html = '<span class="winner">本周未申请比赛</span>' ;
										}
										else {
											html = '<span class="looser">全部出席</span>' ;
										}
									}
									else if(data === 1) {
										html = '<span class="winner">存在缺席</span>' ;
									}
									return html;
								},
								targets: 8
							},
				        	{
								render: function ( data, type, row ) {
									var html = '<div class="btn-group">';
									html += '<button class="score_detail_info btn btn-xs btn-success" data-memo="' + row.memo + '"><i class="fa fa-edit"></i>积分详情</button>';
									html += '</div>';
									return html;
								},
								targets: 0
							}
						]
				    });
					
					$('#round_score_' + roundId).on( 'draw.dt', function () {
						$('.score_detail_info').on('click.ACHILLES.score.info.detail', $.ACHILLESPLAYERS.score.detailScoreInfo);
					});
					
					roundTitle.data('loaded', true);
				} else {
					var message = '获取比赛积分信息失败![' + retObj.message + ']';
					$.ACHILLESPLAYERS.tipMessage(message, false);
				}
			}, 'json');			
		},
		detailScoreInfo: function () {
			var memo = $(this).data('memo');
			var strs=memo.split("],"); //字符分割 
			memo = '';
			var i=0;
			for (;i<strs.length ;i++ ) 
			{ 
				if(strs[i].length > 0) {
					memo += '<p class="margin" style="font-size: 1.5em;">' + strs[i] + ']</p>'; //分割后的字符输出
				}
			} 
			$('#detail_score_info_message').empty().append(memo);
			$('#detail_score_info_modal').modal('show');
		}
	};// end of $.ACHILLESPLAYERS.score
	
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
