package edu.infosys.lostFoundLocatorApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import edu.infosys.lostFoundLocatorApplication.dao.FoundItemDao;
import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;
import edu.infosys.lostFoundLocatorApplication.service.LostfoundUserService;
import edu.infosys.lostFoundLocatorApplication.service.MatchItemService;

@RestController
@RequestMapping("/lostfound/admin")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class AdminController {

    @Autowired
    private LostItemDao lostItemDao;

    @Autowired
    private FoundItemDao foundItemDao;

    @Autowired
    private MatchItemService matchItemService;

    @Autowired
    private LostfoundUserService userService;

    @GetMapping("/stats")
    public Map<String, Integer> getDashboardStats() {
        Map<String, Integer> stats = new HashMap<>();
        
        int totalLost = lostItemDao.getAllLostItems().size();
        int totalFound = foundItemDao.getAllFoundItems().size();
        int totalMatches = matchItemService.getAllMatches().size();
        int totalStudents = userService.getAllStudents().size();
        
        stats.put("totalLost", totalLost);
        stats.put("totalFound", totalFound);
        stats.put("totalMatches", totalMatches);
        stats.put("totalStudents", totalStudents);
        
        return stats;
    }
}
