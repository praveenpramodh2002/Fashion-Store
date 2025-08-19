package FashionStore.FashionStore.repository;

import FashionStore.FashionStore.entity.ContactUs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepo extends JpaRepository<ContactUs,Long> {
}
