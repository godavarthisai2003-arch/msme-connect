package com.msme.backend.service;

import com.msme.backend.entity.Msme;
import com.msme.backend.repository.MsmeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MsmeService {

    @Autowired
    private MsmeRepository repository;

    // Get all MSMEs
    public List<Msme> getAllMsmes() {
        return repository.findAll();
    }

    // Add a new MSME
    public Msme addMsme(Msme msme) {
        return repository.save(msme);
    }
    public void deleteMsme(Integer id) {
    repository.deleteById(id);}
    public List<Msme> searchMsmes(String keyword) {
    return repository.findByNameContainingIgnoreCase(keyword);}
    public List<Msme> getMsmesByCategory(String category) {
    return repository.findByCategoryIgnoreCase(category);
    }



public Msme updateMsme(Integer id, Msme msme) {

    Msme existing = repository.findById(id).orElse(null);

    if (existing == null) {
        return null;
    }

    existing.setName(msme.getName());
    existing.setDescription(msme.getDescription());
    existing.setOffering(msme.getOffering());
    existing.setCategory(msme.getCategory());
    existing.setLocation(msme.getLocation());
    existing.setPhone(msme.getPhone());
    existing.setEmail(msme.getEmail());
    existing.setRating(msme.getRating());

    return repository.save(existing);
}}