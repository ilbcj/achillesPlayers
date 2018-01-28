package com.achilles.players.controller;

import java.util.List;

import com.achilles.players.dto.MatchDayInfo;
import com.achilles.players.dto.MatchRegistrationInfo;
import com.achilles.players.dto.MatchRegistrationInfoForEdit;
import com.achilles.players.dto.Plat;
import com.achilles.players.dto.Round;
import com.achilles.players.dto.SeasonRound;
import com.achilles.players.model.Player;
import com.achilles.players.service.LoginService;
import com.achilles.players.service.MatchInfoService;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class MatchAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5189976732530861209L;

	private String message;
	private boolean result;
	private MatchRegistrationInfo regInfo;
	private MatchRegistrationInfoForEdit regInfoForEdit;
	private List<Plat> plats;
	private SeasonRound seasonRoundInfo;
	private List<MatchDayInfo> activeMatchInfo;

	private String playerNotice;
	private String bonusPlats;
	
	public String getBonusPlats() {
		return bonusPlats;
	}

	public void setBonusPlats(String bonusPlats) {
		this.bonusPlats = bonusPlats;
	}

	public String getPlayerNotice() {
		return playerNotice;
	}

	public void setPlayerNotice(String playerNotice) {
		this.playerNotice = playerNotice;
	}

	public List<MatchDayInfo> getActiveMatchInfo() {
		return activeMatchInfo;
	}

	public void setActiveMatchInfo(List<MatchDayInfo> activeMatchInfo) {
		this.activeMatchInfo = activeMatchInfo;
	}

	public SeasonRound getSeasonRoundInfo() {
		return seasonRoundInfo;
	}

	public void setSeasonRoundInfo(SeasonRound seasonRoundInfo) {
		this.seasonRoundInfo = seasonRoundInfo;
	}

	public MatchRegistrationInfoForEdit getRegInfoForEdit() {
		return regInfoForEdit;
	}

	public void setRegInfoForEdit(MatchRegistrationInfoForEdit regInfoForEdit) {
		this.regInfoForEdit = regInfoForEdit;
	}

	public List<Plat> getPlats() {
		return plats;
	}

	public void setPlats(List<Plat> plats) {
		this.plats = plats;
	}

	public MatchRegistrationInfo getRegInfo() {
		return regInfo;
	}

	public void setRegInfo(MatchRegistrationInfo regInfo) {
		this.regInfo = regInfo;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}

	public String QueryMatchRegistration()
	{
		try {
			LoginService ls = new LoginService();
			Player player = null;
			ActionContext ctx = ActionContext.getContext();
			String openid = (String) ctx.getSession().get(LoginAction.QQOPENID);
			String pwdtoken = (String) ctx.getSession().get(LoginAction.PWDTOKEN);
			if( openid != null ) {
				player = ls.QueryPlayerByOpenid( openid );
			}
			else {
				player = ls.QueryPlayerByLoginId( pwdtoken );
			}
			
			if( player == null ) {
				throw new Exception("用户信息有误。[openid:" + openid + "; loginid:" + pwdtoken + "]");
			}
			
			MatchInfoService ms = new MatchInfoService();
			regInfo = ms.QueryMatchRegistrationByPlayer( player.getId() );
			regInfoForEdit = ms.QueryMatchRegistrationForEditByPlayer( player.getId() );
			plats = ms.QueryPlats();
			bonusPlats = ms.QueryBonusPlats();
			seasonRoundInfo = ms.QuerySeasonRoundInfo();
		}
		catch(Exception e) {
			message = e.getMessage();
			return SUCCESS;
		}
		this.setResult(true);
		return SUCCESS;
	}

	public String SaveMatchRegistration() {
		try {
			LoginService ls = new LoginService();
			Player player = null;
			ActionContext ctx = ActionContext.getContext();
			String openid = (String) ctx.getSession().get(LoginAction.QQOPENID);
			String pwdtoken = (String) ctx.getSession().get(LoginAction.PWDTOKEN);
			if( openid != null ) {
				player = ls.QueryPlayerByOpenid( openid );
			}
			else {
				player = ls.QueryPlayerByLoginId( pwdtoken );
			}
			
			if( player == null ) {
				throw new Exception("用户信息有误。[openid:" + openid + "; loginid:" + pwdtoken + "]");
			}
			
			MatchInfoService ms = new MatchInfoService();
			seasonRoundInfo = ms.QuerySeasonRoundInfo();
			if( seasonRoundInfo.getRoundPhase() != Round.PHASE_REGISTRATION ) {
				throw new Exception("本轮比赛已过报名时间，不能更改挑战信息！");
			}
			if( player.getId() != regInfo.getPlayerId() ) {
				throw new Exception("提交数据与当前登录用户不匹配，请退出系统重新登录，再进行操作！");
			}
			ms.SaveMatchRegistration(regInfo);
		}
		catch(Exception e) {
			message = e.getMessage();
			return SUCCESS;
		}
		this.setResult(true);
		return SUCCESS;
	}
	
	public String QueryActiveMatchInfo() {
		try {
			MatchInfoService ms = new MatchInfoService();
			activeMatchInfo = ms.QueryActiveMatchInfo();
		}
		catch(Exception e) {
			message = e.getMessage();
			return SUCCESS;
		}
		this.setResult(true);
		return SUCCESS;
	}
	
	public String QueryNotice() {
		try {
			MatchInfoService ms = new MatchInfoService();
			playerNotice = ms.QueryPlayerNotice();
		}
		catch(Exception e) {
			message = e.getMessage();
			return SUCCESS;
		}
		this.setResult(true);
		return SUCCESS;
	}
}
