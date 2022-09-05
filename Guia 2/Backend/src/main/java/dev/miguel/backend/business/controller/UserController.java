package dev.miguel.backend.business.controller;

import dev.miguel.backend.business.service.UserService;
import dev.miguel.backend.domain.dto.AuthenticateRequestDto;
import dev.miguel.backend.domain.dto.UserDto;
import dev.miguel.backend.domain.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/health")
    public String health(){
        return "It works!";
    }

    @GetMapping("")
    public ResponseEntity<List<UserDto>> findAllUsers(){
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/encrypted")
    public ResponseEntity<List<UserDto>> findAllUsersEncrypted(){
        return new ResponseEntity<>(userService.findAllUsersEncrypted(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Object> saveUser(@RequestBody UserDto userDto){
        userService.saveUser(userDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Object> authenticate(@RequestBody AuthenticateRequestDto requestDto){
        return new ResponseEntity<>(userService.authenticate(requestDto), HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDto> findUserByUsername(@PathVariable String username){
        return new ResponseEntity<>(userService.findUserByUsername(username),
                HttpStatus.OK);
    }


    @PutMapping("")
    public ResponseEntity<Object> updateUser(@RequestBody UserDto userDto){
        userService.updateUser(userDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<Object> deleteUser(@RequestParam("document") String document){
        userService.deleteUser(document);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
