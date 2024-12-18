package tn.booklist.booklist.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.booklist.booklist.entities.Book;
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}
