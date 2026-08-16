package com.msme.backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin; import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msme.backend.entity.Msme;
import com.msme.backend.service.MsmeService;
@CrossOrigin(origins = {
    "http://127.0.0.1:5500",
    "http://localhost:5500"
})

@RestController
@RequestMapping("/api/msmes")
public class MsmeController {

    private final MsmeService service;

    public MsmeController(MsmeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Msme> getAllMsmes() {
        return service.getAllMsmes();
    }
    @PostMapping
public Msme createMsme(@RequestBody Msme msme) {
    return service.addMsme(msme);
}

    @GetMapping("/search")
    public List<Msme> searchMsmes(String keyword) {
        return service.searchMsmes(keyword);
    }
    @PutMapping("/{id}")
public Msme updateMsme(
        @PathVariable Integer id,
        @RequestBody Msme msme) {

    return service.updateMsme(id, msme);
}

@DeleteMapping("/{id}")
public void deleteMsme(@PathVariable Integer id) {
    service.deleteMsme(id);
}

    @GetMapping("/category/{category}")
    public List<Msme> getMsmesByCategory(@PathVariable String category) {
        return service.getMsmesByCategory(category);
    }
}   