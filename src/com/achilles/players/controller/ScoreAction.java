package com.achilles.players.controller;

import java.util.List;

import com.achilles.players.dto.Score;
import com.achilles.players.dto.Round;
import com.achilles.players.service.ScoreInfoService;
import com.opensymphony.xwork2.ActionSupport;

public class ScoreAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5189976732530861209L;

	private String message;
	private boolean result;
	
	private List<Round> rounds; 
	private int roundId;
	private List<Score> items;
	
	public List<Round> getRounds() {
		return rounds;
	}

	public void setRounds(List<Round> rounds) {
		this.rounds = rounds;
	}

	public int getRoundId() {
		return roundId;
	}

	public void setRoundId(int roundId) {
		this.roundId = roundId;
	}

	public List<Score> getItems() {
		return items;
	}

	public void setItems(List<Score> items) {
		this.items = items;
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

	public String QueryRoundList()
	{
		try {
			ScoreInfoService ss = new ScoreInfoService();
			rounds = ss.QueryRoundList();
		}
		catch(Exception e) {
			message = e.getMessage();
			return SUCCESS;
		}
		this.setResult(true);
		return SUCCESS;
	}

	public String QueryRoundScore() {
		try {
			ScoreInfoService ss = new ScoreInfoService();
			items = ss.QueryRoundScoreInfo(roundId);
		}
		catch(Exception e) {
			message = e.getMessage();
			return SUCCESS;
		}
		this.setResult(true);
		return SUCCESS;
	}
}
