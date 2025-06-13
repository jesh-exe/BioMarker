package com.jobvista.controller;

import com.jobvista.entities.BioMarker;
import com.jobvista.repository.BioMarkerRepository;
import com.jobvista.service.BioMarkerService;
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

}
