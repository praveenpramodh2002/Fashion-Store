package FashionStore.FashionStore.controller;

import FashionStore.FashionStore.entity.ContactUs;
import FashionStore.FashionStore.exception.ContactNotFoundException;
import FashionStore.FashionStore.repository.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactRepo contactRepo;

    @PostMapping("/public/addContact")
    public ContactUs addContact(@RequestBody ContactUs addContact) {
        return contactRepo.save(addContact);
    }

    @GetMapping("/public/allContact")
    public List<ContactUs> getAllContact() {
        return contactRepo.findAll();
    }

    @GetMapping("/public/contactId/{id}")
    public ContactUs getContactById(@PathVariable Long id) {
        return contactRepo.findById(id)
                .orElseThrow(() -> new ContactNotFoundException(id));
    }

    @PutMapping("/public/updateContact/{id}")
    public ContactUs updateContact(@RequestBody ContactUs updateContact, @PathVariable Long id) {
        return contactRepo.findById(id)
                .map(contactUs -> {
                    contactUs.setName(updateContact.getName());
                    contactUs.setEmail(updateContact.getEmail());
                    contactUs.setSubject(updateContact.getSubject());  // ✅ Added subject update
                    contactUs.setMessage(updateContact.getMessage());
                    return contactRepo.save(contactUs);
                }).orElseThrow(() -> new ContactNotFoundException(id));
    }

    @DeleteMapping("/public/deleteContact/{id}")
    public String deleteContact(@PathVariable Long id) {
        if (!contactRepo.existsById(id)) {
            throw new ContactNotFoundException(id);
        }
        contactRepo.deleteById(id);
        return "Contact id: " + id + " has been deleted successfully";
    }
}
