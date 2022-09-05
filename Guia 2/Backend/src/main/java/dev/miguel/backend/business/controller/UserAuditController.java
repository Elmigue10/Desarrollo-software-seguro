package dev.miguel.backend.business.controller;

import dev.miguel.backend.business.service.UserAuditService;
import dev.miguel.backend.domain.dto.UserAuditDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/user-audit")
@AllArgsConstructor
public class UserAuditController {

    private final UserAuditService userAuditService;

    @GetMapping("")
    public ResponseEntity<List<UserAuditDto>> findAllUserAudit(){
        return new ResponseEntity<>(userAuditService.findAllUserAudit(), HttpStatus.OK);
    }

}
