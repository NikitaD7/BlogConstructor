package com.github.nikitad7.blogconstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {
    @PreAuthorize("isAuthenticated()")
    @RequestMapping("/get_my_user_name")
    public String getCurrentUsername(Authentication authentication) {
        final String username = authentication.getName();
        return "{\"username\":\"" + username + "\"}";
    }
}