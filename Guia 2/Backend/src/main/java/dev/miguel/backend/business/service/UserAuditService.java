package dev.miguel.backend.business.service;

import dev.miguel.backend.domain.dto.UserAuditDto;
import dev.miguel.backend.domain.entity.UserAuditEntity;
import dev.miguel.backend.domain.repository.UserAuditRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserAuditService {

    private final UserAuditRepository userAuditRepository;

    private final ModelMapper modelMapper = new ModelMapper();

    public List<UserAuditDto> findAllUserAudit(){
        return mapUserAuditToDto(userAuditRepository.findAll());
    }

    private List<UserAuditDto> mapUserAuditToDto(List<UserAuditEntity> usersAudit){
        List<UserAuditDto> userAuditDtoList = new ArrayList<>();
        usersAudit.stream().forEach( userAudit -> {
            userAuditDtoList.add(modelMapper.map(userAudit, UserAuditDto.class));
        });
        return userAuditDtoList;
    }
}
