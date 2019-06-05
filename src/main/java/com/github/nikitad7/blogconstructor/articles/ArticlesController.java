package com.github.nikitad7.blogconstructor.articles;

import com.github.nikitad7.blogconstructor.security.AdminOnly;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/articles")
public class ArticlesController {

    @Autowired
    private ArticleService articleService;

    @GetMapping
    public List<Article> getAllArticle(Authentication authentication) {
        return articleService.list(authentication);
    }

    @GetMapping("/{uuid}")
    public Article getArticle(@PathVariable String uuid,
                              Authentication authentication) {
        Objects.requireNonNull(uuid);
        final Article serviceByUuid = articleService.findByUuid(uuid, authentication);
        if (serviceByUuid == null) {
            throw new ArticleNotFoundException();
        }
        return serviceByUuid;
    }

    @PutMapping("/{uuid}")
    @AdminOnly
    public void addArticle(@PathVariable String uuid,
                           @RequestBody Article newArticle,
                           Authentication authentication) {
        Objects.requireNonNull(uuid);
        Objects.requireNonNull(newArticle);
        Objects.requireNonNull(authentication);
        articleService.addNewArticle(uuid, newArticle, authentication.getName());
    }
}