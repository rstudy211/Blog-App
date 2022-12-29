package com.restapi.BlogProject.services;

import com.restapi.BlogProject.entity.Logs;
import com.restapi.BlogProject.entity.LogsDto;
import com.restapi.BlogProject.repository.LogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogServiceImpls implements LogService {

    @Autowired
    private LogsRepository logsRepository;

    @Override
    public void saveLog(LogsDto log){
        logsRepository.save(new Logs(log));
    }
}
