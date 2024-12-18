package tn.booklist.booklist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("tn.booklist.booklist.entities")

public class BooklistApplication {

	public static void main(String[] args) {
		SpringApplication.run(BooklistApplication.class, args);
	}

}
