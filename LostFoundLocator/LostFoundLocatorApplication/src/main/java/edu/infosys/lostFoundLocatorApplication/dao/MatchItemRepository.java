package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItemId;

public interface MatchItemRepository extends JpaRepository<MatchItem, MatchItemId> {

}
