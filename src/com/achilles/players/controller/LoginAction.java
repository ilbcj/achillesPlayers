package com.achilles.players.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.achilles.players.service.LoginService;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.qq.connect.api.OpenID;
import com.qq.connect.javabeans.AccessToken;
import com.qq.connect.oauth.Oauth;

public class LoginAction extends ActionSupport {
	public static final String QQOPENID = "qq_openid";
	public static final String PWDTOKEN = "pwd_token";
	private static final String QQACCESSTOKEN = "qq_access_token";
	private static final String QQTOKENEXPIREIN = "qq_token_expirein";
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 5189976732530861209L;
	private String loginid;
	private String message;
	private String playername;
	private String qq;
	private String random;
	private boolean result;
	
	private String pwd;
	private String newPwd;
	
	public String getNewPwd() {
		return newPwd;
	}

	public void setNewPwd(String newPwd) {
		this.newPwd = newPwd;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getRandom() {
		return random;
	}

	public void setRandom(String random) {
		this.random = random;
	}

	public String getPlayername() {
		return playername;
	}

	public void setPlayername(String playername) {
		this.playername = playername;
	}

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getLoginid() {
		return loginid;
	}

	public void setLoginid(String loginid) {
		this.loginid = loginid;
	}

	public String Loginpwd() throws Exception
	{
		ActionContext ctx = ActionContext.getContext();
		String randFromSession = (String)ctx.getSession().get("auth.random");
		if(randFromSession == null || !randFromSession.equals(this.random))
		{
			message = "登录信息不正确，请重新打开浏览器！";
			return SUCCESS;
		}
		LoginService as = new LoginService();
		if( as.LoginPwdService(loginid, pwd) )
		{
			ctx.getSession().put(PWDTOKEN, loginid);
		}
		else
		{
			message = "信息不正确，登录失败！";
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String ChangePwd() throws Exception
	{
		try {
			LoginService ls = new LoginService();
			ActionContext ctx = ActionContext.getContext();
			String pwdtoken = (String) ctx.getSession().get(LoginAction.PWDTOKEN);
			
			if( pwdtoken == null ) {
				throw new Exception("用户登录session信息有误。[服务端没有找到登录ID]！");
			}
			
			ls.ChangePwd(pwdtoken, pwd, newPwd);
		}
		catch(Exception e) {
			message = e.getMessage();
			return SUCCESS;
		}
		this.setResult(true);
		return SUCCESS;
	}
	
	public String AfterLogin()
	{
		HttpServletRequest request = ServletActionContext.getRequest();
		try{
			AccessToken accessTokenObj = (new Oauth()).getAccessTokenByRequest(request);
	
	        String accessToken   = null,
	               openID        = null;
	        long tokenExpireIn = 0L;
	        if (accessTokenObj.getAccessToken().equals("")) {
//              我们的网站被CSRF攻击了或者用户取消了授权
//              做一些数据统计工作
	        	message = "没有获取到QQ认证服务器响应，暂时无法登录!";
	        	System.out.print( message );
	        	return ERROR;
	        } else {
	        	accessToken = accessTokenObj.getAccessToken();
                tokenExpireIn = accessTokenObj.getExpireIn();
                
                ActionContext ctx = ActionContext.getContext();
        		//String randFromSession = (String)ctx.getSession().get("auth.random");
                ctx.getSession().put(QQACCESSTOKEN, accessToken);
                ctx.getSession().put(QQTOKENEXPIREIN, String.valueOf(tokenExpireIn));
                
                // 利用获取到的accessToken 去获取当前用的openid -------- start
                OpenID openIDObj =  new OpenID(accessToken);
                openID = openIDObj.getUserOpenID();
                
                System.out.println("欢迎你，代号为 " + openID + " 的用户!");
                ctx.getSession().put(QQOPENID, openID);
                //System.out.println("<a href=" + "/shuoshuoDemo.html" +  " target=\"_blank\">去看看发表说说的demo吧</a>");
                // 利用获取到的accessToken 去获取当前用户的openid --------- end
                
                
//                System.out.println("<p> start -----------------------------------利用获取到的accessToken,openid 去获取用户在Qzone的昵称等信息 ---------------------------- start </p>");
//                UserInfo qzoneUserInfo = new UserInfo(accessToken, openID);
//                UserInfoBean userInfoBean = qzoneUserInfo.getUserInfo();
//                System.out.println("<br/>");
//                if (userInfoBean.getRet() == 0) {
//                    System.out.println(userInfoBean.getNickname() + "<br/>");
//                    System.out.println(userInfoBean.getGender() + "<br/>");
//                    System.out.println("黄钻等级： " + userInfoBean.getLevel() + "<br/>");
//                    System.out.println("会员 : " + userInfoBean.isVip() + "<br/>");
//                    System.out.println("黄钻会员： " + userInfoBean.isYellowYearVip() + "<br/>");
//                    System.out.println("<image src=" + userInfoBean.getAvatar().getAvatarURL30() + "/><br/>");
//                    System.out.println("<image src=" + userInfoBean.getAvatar().getAvatarURL50() + "/><br/>");
//                    System.out.println("<image src=" + userInfoBean.getAvatar().getAvatarURL100() + "/><br/>");
//                } else {
//                    System.out.println("很抱歉，我们没能正确获取到您的信息，原因是： " + userInfoBean.getMsg());
//                }
//                System.out.println("<p> end -----------------------------------利用获取到的accessToken,openid 去获取用户在Qzone的昵称等信息 ---------------------------- end </p>");

	        }
		}
		catch(Exception e) {
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String Index()
	{
//		ActionContext ctx = ActionContext.getContext();
//		String openid = (String)ctx.getSession().get(QQOPENID);
//		playername = new LoginService().QueryPlayerName(openid);
//		if( playername == null || playername.isEmpty() ) 
//			return ERROR;
		return SUCCESS;
	}
	
	public String QueryPlayerInfo()
	{
		ActionContext ctx = ActionContext.getContext();
		String openid = (String) ctx.getSession().get(QQOPENID);
		LoginService service = new LoginService();
		if( openid != null ) {
			playername = service.QueryPlayerNameByOpenid(openid);
		}
		else {
			String pwdtoken = (String) ctx.getSession().get(PWDTOKEN);
			playername = service.QueryPlayerNameByLoginId(pwdtoken);
		}
		this.setResult(true);
		return SUCCESS;
	}
	
	public String Logout()
	{
		ActionContext ctx = ActionContext.getContext();
		ctx.getSession().put(QQACCESSTOKEN, null);
		ctx.getSession().put(QQTOKENEXPIREIN, null);
		ctx.getSession().put(QQOPENID, null);
		ctx.getSession().put(PWDTOKEN, null);
		this.setResult(true);
		return SUCCESS;
	}
	
	public String Reg()
	{
		try{
			ActionContext ctx = ActionContext.getContext();
			String openid = (String)ctx.getSession().get(QQOPENID);
			new LoginService().RegPlayerWithQQOpenId(openid, playername, loginid, qq);
		}
		catch(Exception e) {
			message = e.getMessage();
			return ERROR;
		}
		this.setResult(true);
		return SUCCESS;
	}
}
