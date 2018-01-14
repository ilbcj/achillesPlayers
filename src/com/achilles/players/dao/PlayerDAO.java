package com.achilles.players.dao;

import com.achilles.players.model.Player;

public interface PlayerDAO {
	public Player AddPlayer(Player player) throws Exception;
	public Player GetPlayerByQQOpenId(String id) throws Exception;
	public Player GetPlayerByLoginId(String id) throws Exception;
	public Player GetPlayerByPerRegistInfo(String id, String name, String qq) throws Exception;

}
