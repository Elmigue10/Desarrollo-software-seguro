package dev.miguel.backend.business.service;

import dev.miguel.backend.domain.dto.AuthenticateRequestDto;
import dev.miguel.backend.domain.dto.UserDto;
import dev.miguel.backend.domain.entity.UserEntity;
import dev.miguel.backend.domain.repository.UserRepository;
import org.apache.catalina.User;
import org.apache.tomcat.util.codec.binary.Base64;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper = new ModelMapper();
    @Value("${service.secret-key}")
    private String secretKey;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<UserDto> findAllUsers(){
        return mapUserListToDto(userRepository.findAll(), false);
    }

    public List<UserDto> findAllUsersEncrypted(){
        return mapUserListToDto(userRepository.findAll(), true);
    }

    public void saveUser(UserDto userDto){
        UserEntity user = modelMapper.map(userDto, UserEntity.class);
        user.setAccion("insertado");
        user.setPassword(encodeMD5(secretKey, user.getPassword()));
        userRepository.save(user);
    }

    public Boolean authenticate(AuthenticateRequestDto authenticateRequestDto){
        Boolean isAuthenticate = false;
        String passwordEncoded = encodeMD5(secretKey, authenticateRequestDto.getPassword());
        UserEntity user = userRepository.findUserEntityByUsername(authenticateRequestDto.getUsername());
        if(user != null && user.getPassword().equals(passwordEncoded)){
            isAuthenticate = true;
        }
        return isAuthenticate;
    }

    public UserDto findUserByUsername(String username){
        return modelMapper.map(userRepository.findUserEntityByUsername(username), UserDto.class);
    }

    public void updateUser(UserDto userDto){
        UserEntity user = userRepository.findUserEntityByUserId(userDto.getUserId());
        user.setDocument(userDto.getDocument());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setLevel(userDto.getLevel());

        userRepository.save(user);
    }

    public void deleteUser(String document){
        userRepository.deleteUserEntityByDocument(document);
    }

    private List<UserDto> mapUserListToDto(List<UserEntity> users, Boolean showEncrypted){
        List<UserDto> userDtos = new ArrayList<>();
        users.stream().forEach( user -> {
            if(!showEncrypted){
                user.setPassword(decodeMD5(secretKey, user.getPassword()));
            }
            userDtos.add(modelMapper.map(user, UserDto.class));
        });
        return userDtos;
    }

    public String encodeMD5(String secretKey, String password){
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] keyPassword = md5.digest(secretKey.getBytes());
            byte[] bytesKeyPassword = Arrays.copyOf(keyPassword, 24);
            SecretKey key = new SecretKeySpec(bytesKeyPassword, "DESede");
            Cipher encrypt = Cipher.getInstance("DESede");
            encrypt.init(Cipher.ENCRYPT_MODE, key);
            byte[] passwordBytes = password.getBytes("utf-8");
            byte[] buf = encrypt.doFinal(passwordBytes);
            byte[] base64BytesPassword = Base64.encodeBase64(buf);
            return new String(base64BytesPassword);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String decodeMD5(String secretKey, String encryptedPassword){
        try{
            byte[] passwordBytes = Base64.decodeBase64(encryptedPassword.getBytes("utf-8"));
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] digestOfPassword = md5.digest(secretKey.getBytes("utf-8"));
            byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
            SecretKey key = new SecretKeySpec(keyBytes, "DESede");
            Cipher decipher = Cipher.getInstance("DESede");
            decipher.init(Cipher.DECRYPT_MODE, key);
            byte[] plainTextPassword = decipher.doFinal(passwordBytes);
            return new String(plainTextPassword, "UTF-8");
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public static String encryptMD5(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(password.getBytes());
            BigInteger number = new BigInteger(1, messageDigest);
            String hashtext = number.toString(16);

            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        }
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
