package com.github.nikitad7.blogconstructor.articles;

import com.github.nikitad7.blogconstructor.security.BlogConstructorRoles;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Supplier;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    private boolean hasAdminRole(Collection<? extends GrantedAuthority> authorities) {
        return Optional.ofNullable(authorities)
                .flatMap(roles -> roles.stream()
                        .filter(role -> {
                                    final boolean equals = Objects.equals(
                                            BlogConstructorRoles.ROLE_ADMIN.getAuthority(),
                                            role.getAuthority());
                                    return equals;
                                }
                        )
                        .findAny()
                )
                .isPresent();
    }

    private <T> T withRightsCheck(Authentication authentication,
                                  Supplier<T> adminCase,
                                  Supplier<T> notAuthenticatedUserCase,
                                  Function<String, T> authenticatedUserCase) {
        final Optional<Authentication> optionalAuthentication = Optional.ofNullable(authentication);

        if (hasAdminRole(optionalAuthentication.map(Authentication::getAuthorities).orElse(null))) {
            return adminCase.get();
        } else if (StringUtils.isNotBlank(optionalAuthentication.map(Authentication::getName).orElse(null))) {
            return authenticatedUserCase.apply(optionalAuthentication.map(Authentication::getName).get());
        } else {
            return notAuthenticatedUserCase.get();
        }
    }

    public List<Article> list(Authentication authentication) {
        return withRightsCheck(authentication,
                () -> articleRepository.findAllNotDeleted(),
                () -> articleRepository.findAllPublishedAndNotDeleted(),
                userName -> articleRepository.findAllOwnOrPublishedAndNotDeleted(userName)
        );
    }

    public Article findByUuid(String uuid, Authentication authentication) {
        return withRightsCheck(authentication,
                () -> articleRepository.findByUuidNotDeleted(uuid),
                () -> articleRepository.findByUuidPublishedAndNotDeleted(uuid),
                userName -> articleRepository.findByUuidWithAuthorNotDeleted(uuid, userName)
        );
    }

    public void addNewArticle(String uuid, Article newArticle, String userName) {
        final LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);

        newArticle.setUuid(uuid);

        final Article oldArticle = articleRepository.findByUuidWithAuthorNotDeleted(uuid, userName);
        if (oldArticle == null) {
            newArticle.setCreateDate(now);
        } else {
            newArticle.setCreateDate(oldArticle.getCreateDate());
            newArticle.setId(oldArticle.getId());
        }
        newArticle.setLastEditDate(now);
        if (!newArticle.isPublished()) {
            newArticle.setPublishedDate(null);
        } else if (newArticle.getPublishedDate() == null) {
            newArticle.setPublishedDate(now);
        }
        articleRepository.save(newArticle);
    }
}