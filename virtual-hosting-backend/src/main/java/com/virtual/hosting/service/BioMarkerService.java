package com.virtual.hosting.service;

import com.virtual.hosting.entities.BioMarker;
import com.virtual.hosting.repository.BioMarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class BioMarkerService {

    @Autowired
    private BioMarkerRepository bioMarkerRepository;

    public List<BioMarker> saveDataFromFile(MultipartFile file) {
        try {
            String fileContent = new String(file.getBytes());
            String[] entries = fileContent.split(">");

            for (String entry : entries) {
                if (entry.trim().isEmpty()) continue;

                String[] lines = entry.split("\n");
                String header = lines[0].trim();

                String[] parts = header.split("_");
                String accessionNumber = parts[0];
                String lineage = parts.length > 1 ? parts[1] : "unknown";

                StringBuilder sequenceBuilder = new StringBuilder();
                for (int i = 1; i < lines.length; i++) {
                    sequenceBuilder.append(lines[i].trim());
                }

                String sequence = sequenceBuilder.toString();

                BioMarker sequenceData = new BioMarker();
                sequenceData.setAccessionNumber(accessionNumber);
                sequenceData.setLineage(lineage);
                sequenceData.setSequence(sequence);

                bioMarkerRepository.save(sequenceData);
            }
                return bioMarkerRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Failed to process file", e);
        }
    }

}
