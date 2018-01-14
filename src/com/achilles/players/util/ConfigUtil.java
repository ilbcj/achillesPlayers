package com.achilles.players.util;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.achilles.players.model.PlayerProfile;


public class ConfigUtil {
	private static Log logger = LogFactory.getLog(ConfigUtil.class);
	private static PlayerProfile profile = null;
	private static final String PROFILENAME = "player.properties";
	
	public static PlayerProfile getConfigInstance() {

		if( profile == null ) {
			try{
				profile = new PlayerProfile();
				InputStream in = ConfigUtil.class.getClassLoader().getResourceAsStream( PROFILENAME );  
				BufferedReader br = new BufferedReader(new InputStreamReader(in));  
				Properties props = new Properties();  
				props.load(br);  
				for(Object s: props.keySet()){
					if( PlayerProfile.ACHILLES_ADDRESS.equals( s ) ) {
						profile.setAchillesAddress( props.getProperty( s.toString() ) );
					}
					else if( PlayerProfile.ACHILLES_SAVE_MATCH_REGISTRATION_URL.equals( s ) ) {
						profile.setAchillesSaveMatchRegistrationUrl( props.getProperty( s.toString() ) );
					}
					else if( PlayerProfile.ACHILLES_QUERY_MATCH_REGISTRATION_URL.equals( s ) ) {
						profile.setAchillesQueryMatchRegistrationUrl( props.getProperty( s.toString() ) );
					}
					else if( PlayerProfile.ACHILLES_QUERY_MATCH_REGISTRATION_FOR_EDIT_URL.equals( s ) ) {
						profile.setAchillesQueryMatchRegistrationForEditUrl( props.getProperty( s.toString() ) );
					}
					else if( PlayerProfile.ACHILLES_QUERY_MAP_LIST_URL.equals( s ) ) {
						profile.setAchillesQueryMapListUrl( props.getProperty( s.toString() ) );
					}
					else if( PlayerProfile.ACHILLES_QUERY_SEASON_ROUND_URL.equals( s ) ) {
						profile.setAchillesQuerySeasonRoundUrl( props.getProperty( s.toString() ) );
					}
					else if( PlayerProfile.ACHILLES_QUERY_ACTIVE_MATCH_INFO_URL.equals( s ) ) {
						profile.setAchillesQueryActiveMatchInfoUrl( props.getProperty( s.toString() ) );
					} 
					//System.out.println(s+":"+props.getProperty(s.toString()));  
				}  
			}
			catch(Exception e) {
				logger.info("get system config failed.[" + e.getMessage() + "]");
			}
		}
		
		return profile;
	}
}
