package dev.miguel.backend.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticateRequestDto {

    @JsonProperty("username")
    private String username;

    @JsonProperty("password")
    private String password;

}
