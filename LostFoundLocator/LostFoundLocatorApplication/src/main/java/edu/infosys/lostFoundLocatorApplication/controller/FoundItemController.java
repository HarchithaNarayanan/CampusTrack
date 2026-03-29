package edu.infosys.lostFoundLocatorApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;
import edu.infosys.lostFoundLocatorApplication.dao.FoundItemDao;
import edu.infosys.lostFoundLocatorApplication.service.FoundItemService;
import edu.infosys.lostFoundLocatorApplication.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")

public class FoundItemController {

    @Autowired
    private FoundItemDao foundItemDao;

    @Autowired
    private LostfoundUserService service;

    @Autowired
    private FoundItemService foundService;

    // Save Found Item
    @PostMapping("/found")
    public void saveFoundItem(@RequestBody FoundItem foundItem) {
        foundItemDao.saveFoundItem(foundItem);
    }

    // Get All Found Items
    @GetMapping("/found")
    public List<FoundItem> getAllFoundItems() {
        return foundItemDao.getAllFoundItems();
    }

    // Get Found Item By ID
    @GetMapping("/found/{foundItemId}")
    public FoundItem getFoundItemById(@PathVariable String foundItemId) {
        return foundItemDao.getFoundItemById(foundItemId);
    }

    // Delete Found Item By ID
    @DeleteMapping("/found/{foundItemId}")
    public void deleteFoundItemById(@PathVariable String foundItemId) {
        foundItemDao.deleteFoundItemById(foundItemId);
    }

    // Generate Found Item ID
    @GetMapping("/found-id")
    public String generateFoundItemId() {
        return foundService.generateFoundItemId();
    }

    // Get Found Items By UserName
    @GetMapping("/found-user")
    public List<FoundItem> getFoundItemsByUsername() {
        String userId = service.getUserId();
        return foundItemDao.getFoundItemsByUsername(userId);
    }

    // Get Matching Found Items By Lost Item ID
    @GetMapping("/found-match/{lostItemId}")
    public List<FoundItem> getFoundItemsByLostItem(@PathVariable String lostItemId) {
        return foundService.getFoundItemsByLostItem(lostItemId);
    }
}
