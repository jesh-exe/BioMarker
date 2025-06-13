package com.virtual.hosting.controller;

import com.virtual.hosting.entities.BioMarker;
import com.virtual.hosting.repository.BioMarkerRepository;
import com.virtual.hosting.service.BioMarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/biomarker")
@CrossOrigin("*")
public class BioMarkerController {

    @Autowired
    private BioMarkerService bioMarkerService;

    @Autowired
    private BioMarkerRepository bioMarkerRepository;

    @PostMapping
    public ResponseEntity<List<BioMarker>> saveDataFromFile(@RequestPart MultipartFile file)
    {
        return ResponseEntity.ok(bioMarkerService.saveDataFromFile(file));
    }

    @GetMapping
    public ResponseEntity<List<BioMarker>> getAllData()
    {
        return ResponseEntity.ok(bioMarkerRepository.findAll());
    }

    @DeleteMapping
    public ResponseEntity<?> clearDatabase(){
        bioMarkerRepository.deleteAll();
        return ResponseEntity.ok().build();
    }

}
