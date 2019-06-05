package com.github.nikitad7.blogconstructor.security;

import org.springframework.security.core.GrantedAuthority;

public enum BlogConstructorRoles implements GrantedAuthority {

    ROLE_ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}