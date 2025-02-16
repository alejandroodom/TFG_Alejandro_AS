package com.Aplicacion.salud.model;

import jakarta.validation.constraints.Pattern;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Document(collection = "users")
public class User {

    @Id
    private String Id;
    @NotNull
    private String username;
    @NotNull
    @Email
    private String email;
    @NotNull
    @Size(min = 8)
    private String password;
    private boolean phoneVerified;
    @Pattern(regexp = "^\\+[1-9]\\d{1,14}$", message = "Formato no válido. Introduzca un número de teléfono válido.")
    private String phoneNumber;
    private String phoneVerificationCode;
    private LocalDateTime verificationExpiry;

    private String sex;
    private LocalDate birthdate;
    private String country;


    public User() {
    }

    public String getId() {
        return Id;
    }

    public void setId(String Id) {
        this.Id = Id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    public boolean isPhoneVerified() {
        return phoneVerified;
    }

    public void setPhoneVerified(boolean phoneVerified) {
        this.phoneVerified = phoneVerified;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneVerificationCode() {
        return phoneVerificationCode;
    }

    public void setPhoneVerificationCode(String phoneVerificationCode) {
        this.phoneVerificationCode = phoneVerificationCode;
    }

    public LocalDateTime getVerificationExpiry() {
        return verificationExpiry;
    }

    public void setVerificationExpiry(LocalDateTime verificationExpiry) {
        this.verificationExpiry = verificationExpiry;
    }
}
