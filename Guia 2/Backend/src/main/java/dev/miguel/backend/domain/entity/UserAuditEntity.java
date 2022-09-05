package dev.miguel.backend.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "auditoria_users")
public class UserAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "document_anterior")
    private String documentAnterior;

    @Column(name = "username_anterior")
    private String usernameAnterior;

    @Column(name = "email_anterior")
    private String emailAnterior;

    @Column(name = "document_nuevo")
    private String documentNuevo;

    @Column(name = "username_nuevo")
    private String usernameNuevo;

    @Column(name = "email_nuevo")
    private String emailNuevo;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "modificado")
    private String modificado;

    @Column(name = "proceso")
    private String proceso;

    @Column(name = "user_id")
    private Integer userId;

}
