package com.example.api_backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api_backend.entity.UserLogin;



public interface UserLoginRepository extends JpaRepository<UserLogin, Integer> {
    UserLogin findByEmail(String email);
}

