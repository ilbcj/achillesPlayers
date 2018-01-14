package com.achilles.players.dao.impl;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.exception.ConstraintViolationException;

import com.achilles.players.dao.PlayerDAO;
import com.achilles.players.model.HibernateUtil;
import com.achilles.players.model.Player;

public class PlayerDAOImpl implements PlayerDAO {

	@Override
	public Player AddPlayer(Player player) throws Exception {
		//打开线程安全的session对象
		Session session = HibernateUtil.currentSession();
		//打开事务
		Transaction tx = session.beginTransaction();
		try
		{
			player = (Player)session.merge(player);
			tx.commit();
		}
		catch(ConstraintViolationException cne){
			tx.rollback();
			System.out.println(cne.getSQLException().getMessage());
			throw new Exception("存在重名选手");
		}
		catch(org.hibernate.exception.SQLGrammarException e)
		{
			tx.rollback();
			System.out.println(e.getSQLException().getMessage());
			throw e.getSQLException();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			tx.rollback();
			System.out.println(e.getMessage());
			throw e;
		}
		finally
		{
			HibernateUtil.closeSession();
		}
		return player;
	}

	@Override
	public Player GetPlayerByQQOpenId(String id) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		Player rs = null;
		String sqlString = "SELECT * FROM Player WHERE qq_open_id=:qq_open_id ";
		
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(Player.class);
			q.setString("qq_open_id", id);
			rs = (Player)q.uniqueResult();
			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
			System.out.println(e.getMessage());
			throw e;
		} finally {
			HibernateUtil.closeSession();
		}
		return rs;
	}
	
	@Override
	public Player GetPlayerByPerRegistInfo(String id, String name, String qq) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		Player rs = null;
		String sqlString = "SELECT * FROM Player WHERE login_id=:login_id and name=:name and qq=:qq ";
		
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(Player.class);
			q.setString("login_id", id);
			q.setString("name", name);
			q.setString("qq", qq);
			rs = (Player)q.uniqueResult();
			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
			System.out.println(e.getMessage());
			throw e;
		} finally {
			HibernateUtil.closeSession();
		}
		return rs;
	}

	@Override
	public Player GetPlayerByLoginId(String id) throws Exception {
		Session session = HibernateUtil.currentSession();
		Transaction tx = session.beginTransaction();
		Player rs = null;
		String sqlString = "SELECT * FROM Player WHERE login_id=:login_id ";
		
		try {
			Query q = session.createSQLQuery(sqlString).addEntity(Player.class);
			q.setString("login_id", id);
			rs = (Player)q.uniqueResult();
			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
			System.out.println(e.getMessage());
			throw e;
		} finally {
			HibernateUtil.closeSession();
		}
		return rs;
	}

}
