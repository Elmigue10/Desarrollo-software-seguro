package dev.miguel.backend.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserAuditDto {

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("documentAnterior")
    private String documentAnterior;

    @JsonProperty("usernameAnterior")
    private String usernameAnterior;

    @JsonProperty("emailAnterior")
    private String emailAnterior;

    @JsonProperty("documentNuevo")
    private String documentNuevo;

    @JsonProperty("usernameNuevo")
    private String usernameNuevo;

    @JsonProperty("emailNuevo")
    private String emailNuevo;

    @JsonProperty("usuario")
    private String usuario;

    @JsonProperty("modificado")
    private String modificado;

    @JsonProperty("proceso")
    private String proceso;

    @JsonProperty("userId")
    private Integer userId;

}
