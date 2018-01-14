package com.achilles.players.service;

import com.achilles.players.dao.PlayerDAO;
import com.achilles.players.dao.impl.PlayerDAOImpl;
import com.achilles.players.model.Player;

public class LoginService {

	public String QueryPlayerNameByOpenid(String openid) {
		String name = null;
		try{
			Player play = QueryPlayerByOpenid(openid);
			if( play == null ) { 
				name = "";
			}
			else {
				name = play.getName() + "[" + play.getLoginId() + "]";
			}
		}
		catch(Exception e) {
			System.out.println("search player by openid error." + e.getMessage() + "[openid:" + openid +"]");
			name = "";
		}
		return name;
	}
	
	public Player QueryPlayerByOpenid(String openid) {
		Player player = null;
		try{
			PlayerDAO dao = new PlayerDAOImpl();
			player = dao.GetPlayerByQQOpenId(openid);
		}
		catch(Exception e) {
			System.out.println("search player by openid error." + e.getMessage() + "[openid:" + openid +"]");
			player = null;
		}
		return player;
	}

	public void RegPlayerWithQQOpenId(String openid, String playername,	String loginid, String qq) throws Exception {
		PlayerDAO dao = new PlayerDAOImpl();
		Player play = null;
		try{
			play = dao.GetPlayerByPerRegistInfo(loginid, playername, qq);
		}
		catch(Exception e) {
			throw new Exception("查询选手数据失败，请联系赛事管理员！");
		}
		
		if( play == null ) {
			throw new Exception("指定的选手信息不正确，无法完成信息绑定！");
		}
		
		
		if(play.getQqOpenId() == null || play.getQqOpenId().isEmpty()) {
			play.setQqOpenId(openid);
		}
		else {
			throw new Exception("要绑定的选手信息已被别人占用，请联系赛事管理员！");
		}
		try{
			dao.AddPlayer(play);
		}
		catch(Exception e) {
			throw new Exception("绑定选手信息失败，请联系赛事管理员！");
		}
		return;
	}
	
	public boolean LoginPwdService(String loginid, String pwd) {
		try{
			PlayerDAO dao = new PlayerDAOImpl();
			Player play = dao.GetPlayerByLoginId(loginid);
			if( play == null ) { 
				return false;
			}
			else {
				if( pwd.equals(play.getPwd()) ) {
					return true;
				}
			}
		}
		catch(Exception e) {
			System.out.println("check user login info error." + e.getMessage() + "[loginid:" + loginid +"]");
		}
		return false;
	}
	
	public String QueryPlayerNameByLoginId(String loginid) {
		String name = null;
		try{
			Player play = QueryPlayerByLoginId(loginid);
			if( play == null ) { 
				name = "";
			}
			else {
				name = play.getName() + "[" + play.getLoginId() + "]";
			}
		}
		catch(Exception e) {
			System.out.println("search player by loginid error." + e.getMessage() + "[loginid:" + loginid +"]");
			name = "";
		}
		return name;
	}
	
	public Player QueryPlayerByLoginId(String loginid) {
		Player player = null;
		try{
			PlayerDAO dao = new PlayerDAOImpl();
			player = dao.GetPlayerByLoginId(loginid);
		}
		catch(Exception e) {
			System.out.println("search player by loginid error." + e.getMessage() + "[loginid:" + loginid +"]");
			player = null;
		}
		return player;
	}

	public void ChangePwd(String loginid, String pwd, String newPwd) throws Exception {
		Player player = QueryPlayerByLoginId( loginid );
		if( pwd.equals(player.getPwd()) ) {
			player.setPwd(newPwd);
			PlayerDAO dao = new PlayerDAOImpl();
			dao.AddPlayer(player);
		}
		else {
			throw new Exception("验证口令失败！");
		}
		
	}
}
