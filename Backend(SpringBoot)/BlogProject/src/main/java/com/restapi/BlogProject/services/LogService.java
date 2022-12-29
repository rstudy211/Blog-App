package com.restapi.BlogProject.services;

import com.restapi.BlogProject.entity.LogsDto;
import org.springframework.stereotype.Service;


public interface LogService {
    void saveLog(LogsDto log);
}
