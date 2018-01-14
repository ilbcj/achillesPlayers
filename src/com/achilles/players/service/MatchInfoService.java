package com.achilles.players.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Form;
import org.apache.http.client.fluent.Request;

import com.achilles.players.dto.MatchDayInfo;
import com.achilles.players.dto.MatchInfo;
import com.achilles.players.dto.MatchRegistrationInfo;
import com.achilles.players.dto.MatchRegistrationInfoForEdit;
import com.achilles.players.dto.Plat;
import com.achilles.players.dto.Round;
import com.achilles.players.dto.Season;
import com.achilles.players.dto.SeasonRound;
import com.achilles.players.model.Player;
import com.achilles.players.util.ConfigUtil;

public class MatchInfoService {
	private static final String UrlQueryRegInfo = "http://" + ConfigUtil.getConfigInstance().getAchillesAddress() + ConfigUtil.getConfigInstance().getAchillesQueryMatchRegistrationUrl();
	private static final String UrlQueryRegInfoForEdit = "http://" + ConfigUtil.getConfigInstance().getAchillesAddress() + ConfigUtil.getConfigInstance().getAchillesQueryMatchRegistrationForEditUrl();
	private static final String UrlSaveRegInfo = "http://" + ConfigUtil.getConfigInstance().getAchillesAddress() + ConfigUtil.getConfigInstance().getAchillesSaveMatchRegistrationUrl();
	private static final String UrlQueryPlatInfo = "http://" + ConfigUtil.getConfigInstance().getAchillesAddress() + ConfigUtil.getConfigInstance().getAchillesQueryMapListUrl();
	private static final String UrlQuerySeasonRoundInfo = "http://" + ConfigUtil.getConfigInstance().getAchillesAddress() + ConfigUtil.getConfigInstance().getAchillesQuerySeasonRoundUrl();
	private static final String UrlQueryActiveMatchInfo = "http://" + ConfigUtil.getConfigInstance().getAchillesAddress() + ConfigUtil.getConfigInstance().getAchillesQueryActiveMatchInfoUrl();
	
	public MatchRegistrationInfo QueryMatchRegistrationByPlayer( int playerId ) throws Exception {
		Content ret = Request.Post(UrlQueryRegInfo)
				.bodyForm(Form.form()
						.add( "playerId", ""+playerId )
						.build())
				.execute().returnContent();
		
		String jsonStr = ret.asString();
		
		@SuppressWarnings("unchecked")
		Map<String, String> retMap = JSONObject.fromObject(jsonStr);

		Object object = retMap.get("result");
		String obj = object.toString();
		boolean isSuccess = Boolean.parseBoolean(obj);
		
		if(!isSuccess) {
			throw new Exception("query MatchRegistrationInfo failed.[mesg:" + retMap.get("message") + "; playerId:" + playerId + "]");
		}

		Object o = retMap.get( "regInfo" );
		JSONObject regInfo = JSONObject.fromObject(o);
		MatchRegistrationInfo result = (MatchRegistrationInfo) JSONObject.toBean(regInfo, MatchRegistrationInfo.class);
		return result;
	}
	
	public MatchRegistrationInfoForEdit QueryMatchRegistrationForEditByPlayer( int playerId ) throws Exception {
		Content ret = Request.Post(UrlQueryRegInfoForEdit)
				.bodyForm(Form.form()
						.add( "playerId", ""+playerId )
						.build())
				.execute().returnContent();
		
		String jsonStr = ret.asString();
		
		@SuppressWarnings("unchecked")
		Map<String, String> retMap = JSONObject.fromObject(jsonStr);

		Object object = retMap.get("result");
		String obj = object.toString();
		boolean isSuccess = Boolean.parseBoolean(obj);
		
		if(!isSuccess) {
			throw new Exception("query MatchRegistrationInfo failed.[mesg:" + retMap.get("message") + "; playerId:" + playerId + "]");
		}

		Object o = retMap.get( "regInfoForEdit" );
		JSONObject regInfo = JSONObject.fromObject(o);
		MatchRegistrationInfoForEdit result = (MatchRegistrationInfoForEdit) JSONObject.toBean(regInfo, MatchRegistrationInfoForEdit.class);
		result.getAdversaries().clear();
		
		o = regInfo.get("adversaries");
		JSONArray jsonArray = JSONArray.fromObject( o );
		for( int i = 0; i < jsonArray.size(); i++ ) {
			Object item = jsonArray.get(i);
			JSONObject adversaryObj = JSONObject.fromObject(item);
			Player player = (Player) JSONObject.toBean(adversaryObj, Player.class);
			result.getAdversaries().add(player);
		}
		
		return result;
	}
	
	public void SaveMatchRegistration( MatchRegistrationInfo matchInfo ) throws Exception {
		//sync data to ttams
		
		Form form = Form.form()
		.add("regInfo.playerId",  "" + matchInfo.getPlayerId());
		for( int i = 0; i < matchInfo.getAdversaryIds().size(); i++ ) {
			form.add( "regInfo.adversaryIds", "" + matchInfo.getAdversaryIds().get(i) );
		}
		for( int i = 0; i < matchInfo.getPlatIds().size(); i++ ) {
			form.add( "regInfo.platIds", "" + matchInfo.getPlatIds().get(i) );
		}
		for( int i = 0; i < matchInfo.getDayIds().size(); i++ ) {
			form.add( "regInfo.dayIds", "" + matchInfo.getDayIds().get(i) );
		}
		
		Content ret = Request.Post(UrlSaveRegInfo)
				.bodyForm( form.build() )
				.execute().returnContent();
		
		String jsonStr = ret.asString();
		
		@SuppressWarnings("unchecked")
		Map<String, String> retMap = JSONObject.fromObject(jsonStr);

		Object object = retMap.get("result");
		String obj = object.toString();
		boolean isSuccess = Boolean.parseBoolean(obj);
		
		if(!isSuccess) {
			String message = "save MatchRegistrationInfo failed.[mesg:" + retMap.get("message") + "; ";
			message += "regInfo.playerId:" + matchInfo.getPlayerId() + "; ";
			message += "regInfo.name" + matchInfo.getName() + "; ";
			message += "regInfo.loginId" + matchInfo.getLoginId() + "; ";
			message += "regInfo.race" + matchInfo.getRace() + "; ";
			message += "regInfo.scoreRewardMemo" + matchInfo.getScoreRewardMemo() + "; ";
			for( int i = 0; i < matchInfo.getAdversaryIds().size(); i++ ) {
				message += "regInfo.adversaryIds" + matchInfo.getAdversaryIds().get(i) + "; ";
			}
			for( int i = 0; i < matchInfo.getDayIds().size(); i++ ) {
				message += "regInfo.dayIds" + matchInfo.getDayIds().get(i) + "; ";
			}
			message += "]";
			throw new Exception(message);
		}
		
		return;
	}
	
	public List<Plat> QueryPlats() throws Exception {
		Content ret = Request.Post(UrlQueryPlatInfo)
				.bodyForm(Form.form().build())
				.execute().returnContent();
		
		String jsonStr = ret.asString();
		
		@SuppressWarnings("unchecked")
		Map<String, String> retMap = JSONObject.fromObject(jsonStr);

		Object object = retMap.get("result");
		String obj = object.toString();
		boolean isSuccess = Boolean.parseBoolean(obj);
		
		if(!isSuccess) {
			throw new Exception("query plats failed.[mesg:" + retMap.get("message") + "]");
		}

		Object o = retMap.get( "items" );
		JSONArray jsonArray = JSONArray.fromObject( o );
		List<Plat> plats = new ArrayList<Plat>();
		for( int i = 0; i < jsonArray.size(); i++ ) {
			Object item = jsonArray.get(i);
			JSONObject platObj = JSONObject.fromObject(item);
			Plat plat = (Plat) JSONObject.toBean(platObj, Plat.class);
			plats.add(plat);
		}
		
		return plats;
	}

	public SeasonRound QuerySeasonRoundInfo() throws Exception {
		Content ret = Request.Post(UrlQuerySeasonRoundInfo)
				.bodyForm(Form.form().build())
				.execute().returnContent();
		
		String jsonStr = ret.asString();
		
		@SuppressWarnings("unchecked")
		Map<String, String> retMap = JSONObject.fromObject(jsonStr);

		Object object = retMap.get("result");
		String obj = object.toString();
		boolean isSuccess = Boolean.parseBoolean(obj);
		
		if(!isSuccess) {
			throw new Exception("query currnet season and round info failed.[mesg:" + retMap.get("message") + "]");
		}

		Object o = retMap.get( "season" );
		JSONObject seasonInfo = JSONObject.fromObject(o);
		Season season = (Season) JSONObject.toBean(seasonInfo, Season.class);
		
		o = retMap.get( "round" );
		JSONObject roundInfo = JSONObject.fromObject(o);
		Round round = (Round) JSONObject.toBean(roundInfo, Round.class);
		
		SeasonRound result = new SeasonRound();
		result.setRoundPhase( round.getPhase() );
		result.setName( "赛季：" + season.getName() + " -- 场次：" + round.getName() );
		return result;
	}

	public List<MatchDayInfo> QueryActiveMatchInfo() throws Exception {
		Content ret = Request.Post(UrlQueryActiveMatchInfo)
				.bodyForm(Form.form().build())
				.execute().returnContent();
		
		String jsonStr = ret.asString();
		
		@SuppressWarnings("unchecked")
		Map<String, String> retMap = JSONObject.fromObject(jsonStr);

		Object object = retMap.get("result");
		String obj = object.toString();
		boolean isSuccess = Boolean.parseBoolean(obj);
		
		if(!isSuccess) {
			throw new Exception("query ActiveMatchInfo failed.[mesg:" + retMap.get("message") + "]");
		}

		List<MatchDayInfo> result = new ArrayList<MatchDayInfo>();
		MatchDayInfo matchDay = null;
		Object objActiveMatch = retMap.get( "activeMatchInfo" );
		JSONArray jsonArrayActiveMatch = JSONArray.fromObject( objActiveMatch );
		for( int i = 0; i < jsonArrayActiveMatch.size(); i++ ) {
			Object itemActiveMatch = jsonArrayActiveMatch.get(i);
			matchDay = (MatchDayInfo) JSONObject.toBean( JSONObject.fromObject(itemActiveMatch), MatchDayInfo.class );
			matchDay.getMatchInfo().clear();
			
			Object objMatchInfo = JSONObject.fromObject(itemActiveMatch).get( "matchInfo" );
			JSONArray jsonArrayMatchInfo = JSONArray.fromObject( objMatchInfo );
			for( int j = 0; j < jsonArrayMatchInfo.size(); j++ ) {
				Object itemMatchInfo = jsonArrayMatchInfo.get(j);
				MatchInfo matchInfo = (MatchInfo) JSONObject.toBean( JSONObject.fromObject(itemMatchInfo), MatchInfo.class);
				matchDay.getMatchInfo().add(matchInfo);
			}
			result.add(matchDay);
		}
		
		return result;
	}
}
