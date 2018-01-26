package com.achilles.players.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Form;
import org.apache.http.client.fluent.Request;

import com.achilles.players.dto.Plat;
import com.achilles.players.dto.Round;
import com.achilles.players.dto.Score;
import com.achilles.players.util.ConfigUtil;

public class ScoreInfoService {
	private static final String UrlQueryRoundListInfo = "http://" + ConfigUtil.getConfigInstance().getAchillesAddress() + ConfigUtil.getConfigInstance().getAchillesQueryRoundListUrl();
	private static final String UrlQueryRoundScoreInfo = "http://" + ConfigUtil.getConfigInstance().getAchillesAddress() + ConfigUtil.getConfigInstance().getAchillesQueryRoundScoreUrl();
	
	public List<Round> QueryRoundList() throws Exception {
		Content ret = Request.Post(UrlQueryRoundListInfo)
				.bodyForm(Form.form().build())
				.execute().returnContent();
		
		String jsonStr = ret.asString();
		
		@SuppressWarnings("unchecked")
		Map<String, String> retMap = JSONObject.fromObject(jsonStr);

		Object object = retMap.get("result");
		String obj = object.toString();
		boolean isSuccess = Boolean.parseBoolean(obj);
		
		if(!isSuccess) {
			throw new Exception("query round list failed.[mesg:" + retMap.get("message") + "]");
		}

		Object o = retMap.get( "rounds" );
		JSONArray jsonArray = JSONArray.fromObject( o );
		List<Round> rounds = new ArrayList<Round>();
		for( int i = 0; i < jsonArray.size(); i++ ) {
			Object item = jsonArray.get(i);
			JSONObject roundObj = JSONObject.fromObject(item);
			Round round = (Round) JSONObject.toBean(roundObj, Round.class);
			rounds.add(round);
		}
		
		return rounds;
	}
	
	public List<Score> QueryRoundScoreInfo(int roundId) throws Exception {
		Content ret = Request.Post(UrlQueryRoundScoreInfo)
				.bodyForm(Form.form()
						.add( "roundId", ""+roundId )
						.build())
				.execute().returnContent();
		
		String jsonStr = ret.asString();
		
		@SuppressWarnings("unchecked")
		Map<String, String> retMap = JSONObject.fromObject(jsonStr);

		Object object = retMap.get("result");
		String obj = object.toString();
		boolean isSuccess = Boolean.parseBoolean(obj);
		
		if(!isSuccess) {
			throw new Exception("query round scores failed.[mesg:" + retMap.get("message") + "]");
		}

		Object o = retMap.get( "scores" );
		JSONArray jsonArray = JSONArray.fromObject( o );
		List<Score> scores = new ArrayList<Score>();
		for( int i = 0; i < jsonArray.size(); i++ ) {
			Object item = jsonArray.get(i);
			JSONObject scoreObj = JSONObject.fromObject(item);
			Score score = (Score) JSONObject.toBean(scoreObj, Score.class);
			scores.add(score);
		}
		
		return scores;
	}
	
}
