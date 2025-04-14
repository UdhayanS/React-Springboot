package com.example.api_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.api_backend.entity.UserLogin;
import com.example.api_backend.repository.UserLoginRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // allow React
public class UserLoginController {

    @Autowired
    private UserLoginRepository userLoginRepo;

    @PostMapping("/login")
    public String loginUser(@RequestBody UserLogin user) {
        UserLogin existingUser = userLoginRepo.findByEmail(user.getEmail());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return "Login successful!";
        }
        return "Invalid email or password!";
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody UserLogin user) {
        if (userLoginRepo.findByEmail(user.getEmail()) != null) {
            return "User with this email already exists!";
        }
        userLoginRepo.save(user);
        return "User registered successfully!";
    }
}
