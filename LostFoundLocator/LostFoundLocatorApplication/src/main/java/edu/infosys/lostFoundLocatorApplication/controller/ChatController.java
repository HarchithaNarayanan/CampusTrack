package edu.infosys.lostFoundLocatorApplication.controller;

import edu.infosys.lostFoundLocatorApplication.bean.ChatMessage;
import edu.infosys.lostFoundLocatorApplication.dao.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class ChatController {

    @Autowired
    private ChatMessageRepository chatRepository;

    // Get all messages
    @GetMapping("/chat")
    public List<ChatMessage> getAllMessages() {
        return chatRepository.findAllByOrderByTimestampAsc();
    }

    // Send a message
    @PostMapping("/chat")
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        return chatRepository.save(message);
    }

    // Clear all messages (admin only)
    @DeleteMapping("/chat")
    public void clearChat() {
        chatRepository.deleteAll();
    }
}
