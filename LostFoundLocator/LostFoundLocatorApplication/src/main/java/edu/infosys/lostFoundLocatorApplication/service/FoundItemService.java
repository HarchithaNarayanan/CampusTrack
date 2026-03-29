package edu.infosys.lostFoundLocatorApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.dao.FoundItemDao;
import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;
import edu.infosys.lostFoundLocatorApplication.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;
import java.util.List;
import java.util.ArrayList;


@Service
public class FoundItemService {
	@Autowired
	private FoundItemDao foundItemDao;

	@Autowired
	private LostItemDao lostItemDao;
	
	public String generateFoundItemId() {
		String newId="";
		String id=foundItemDao.getLastId();
		if(id==null) {
			newId="F100001";
		}else {
			int num=Integer.parseInt(id.substring(1))+1;
			newId="F"+num;
		}
		return newId;
	}

	public List<FoundItem> getFoundItemsByLostItem(String lostItemId) {
		List<FoundItem> matches = new ArrayList<>();
		LostItem lostItem = lostItemDao.getLostItemById(lostItemId);
		
		if (lostItem != null) {
			List<FoundItem> allFoundItems = foundItemDao.getAllFoundItems();
			for (FoundItem foundItem : allFoundItems) {
				// Match based on same category and ensuring the found item is not yet matched/returned
				if (foundItem.getStatus() == false && 
				    foundItem.getCategory() != null && 
					foundItem.getCategory().equalsIgnoreCase(lostItem.getCategory())) {
					matches.add(foundItem);
				}
			}
		}
		return matches;
	}
}
