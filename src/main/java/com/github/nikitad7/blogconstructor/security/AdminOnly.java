package com.github.nikitad7.blogconstructor.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@PreAuthorize("hasRole(T(com.github.nikitad7.blogconstructor.security.BlogConstructorRoles).ROLE_ADMIN)")
public @interface AdminOnly {
}