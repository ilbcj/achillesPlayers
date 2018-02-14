package com.achilles.players.dto;

public class AchillesConfig {

	private String playerNotice;
	private String bonusPlats;
	private String restDay;
	
	public String getRestDay() {
		return restDay;
	}
	public void setRestDay(String restDay) {
		this.restDay = restDay;
	}
	public String getPlayerNotice() {
		return playerNotice;
	}
	public void setPlayerNotice(String playerNotice) {
		this.playerNotice = playerNotice;
	}
	public String getBonusPlats() {
		return bonusPlats;
	}
	public void setBonusPlats(String bonusPlats) {
		this.bonusPlats = bonusPlats;
	}
}
