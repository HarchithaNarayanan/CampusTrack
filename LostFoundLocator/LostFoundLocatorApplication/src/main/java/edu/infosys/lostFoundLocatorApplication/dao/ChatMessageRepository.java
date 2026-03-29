package edu.infosys.lostFoundLocatorApplication.dao;

import edu.infosys.lostFoundLocatorApplication.bean.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findAllByOrderByTimestampAsc();
}
