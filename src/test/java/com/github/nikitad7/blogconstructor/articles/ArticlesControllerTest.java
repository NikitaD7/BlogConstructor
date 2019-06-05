package com.github.nikitad7.blogconstructor.articles;

import com.github.nikitad7.blogconstructor.RestAuthenticationEntryPoint;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@WebMvcTest(ArticlesController.class)
public class ArticlesControllerTest {
    @Autowired
    private MockMvc mvc;

    @TestConfiguration
    static class ArticleServiceTestConfiguration {
        @Bean
        public RestAuthenticationEntryPoint restAuthenticationEntryPoint() {
            return new RestAuthenticationEntryPoint();
        }

        @Bean
        public ArticleService articleService() {
            return new ArticleService();
        }
    }

    @MockBean
    private ArticleRepository articleRepository;

    @Before
    public void setUp() {
        final List<Article> privateAuthor1Articles = new ArrayList<>();
        final List<Article> privateAuthor2Articles = new ArrayList<>();
        final List<Article> publicArticles = new ArrayList<>();

        Article article;
        //author1
        article = createArticle("article1", "author1", true);
        publicArticles.add(article);
        article = createArticle("article2", "author1", true);
        publicArticles.add(article);
        article = createArticle("article3", "author1", false);
        privateAuthor1Articles.add(article);
        //author2
        article = createArticle("article4", "author2", true);
        publicArticles.add(article);
        article = createArticle("article5", "author2", false);
        privateAuthor2Articles.add(article);
        article = createArticle("article6", "author2", false);
        privateAuthor2Articles.add(article);

        //public access
        Mockito.when(articleRepository.findAllPublishedAndNotDeleted())
                .thenReturn(publicArticles);

        //admin access
        final List<Article> allArticle = new ArrayList<>();
        allArticle.addAll(publicArticles);
        allArticle.addAll(privateAuthor1Articles);
        allArticle.addAll(privateAuthor2Articles);
        Mockito.when(articleRepository.findAllNotDeleted())
                .thenReturn(allArticle);

        //author1 access
        final List<Article> allArticleForAuthor1 = new ArrayList<>();
        allArticleForAuthor1.addAll(publicArticles);
        allArticleForAuthor1.addAll(privateAuthor1Articles);
        Mockito.when(articleRepository.findAllOwnOrPublishedAndNotDeleted("author1"))
                .thenReturn(allArticleForAuthor1);

        //author2 access
        final List<Article> allArticleForAuthor2 = new ArrayList<>();
        allArticleForAuthor2.addAll(publicArticles);
        allArticleForAuthor2.addAll(privateAuthor2Articles);
        Mockito.when(articleRepository.findAllOwnOrPublishedAndNotDeleted("author2"))
                .thenReturn(allArticleForAuthor2);


        Mockito.when(articleRepository.findByUuidNotDeleted(any(String.class)))
                .thenAnswer(invocationOnMock -> allArticle.stream()
                        .filter(articleToFilter -> Objects.equals(articleToFilter.getUuid(), invocationOnMock.getArgument(0)))
                        .findAny()
                        .orElse(null)
                );

        Mockito.when(articleRepository.findByUuidPublishedAndNotDeleted(any(String.class)))
                .thenAnswer(invocationOnMock -> publicArticles.stream()
                        .filter(articleToFilter -> Objects.equals(articleToFilter.getUuid(), invocationOnMock.getArgument(0)))
                        .findAny()
                        .orElse(null)
                );

        Mockito.when(articleRepository.findByUuidWithAuthorNotDeleted(any(String.class), any(String.class)))
                .thenAnswer(invocationOnMock -> allArticle.stream()
                        .filter(articleToFilter -> Objects.equals(articleToFilter.getUuid(), invocationOnMock.getArgument(0)))
                        .filter(articleToFilter ->
                                articleToFilter.isPublished()
                                        || Objects.equals(articleToFilter.getAuthor(), invocationOnMock.getArgument(1)))
                        .findAny()
                        .orElse(null)
                );

    }

    private Article createArticle(String key, String author, boolean published) {
        Article article = new Article();
        article.setTitle(key + "_title");
        article.setBody(key + "_body");
        article.setUuid(key + "_uuid");
        article.setAuthor(author);
        article.setPublished(published);
        article.setDeleted(false);
        article.setCreateDate(LocalDateTime.now());
        article.setLastEditDate(LocalDateTime.now());
        return article;
    }

    @Test
    public void getAllArticleUnauthorizedUserTest() throws Exception {
        mvc.perform(get("/articles")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));
    }

    @Test
    @WithMockUser(username = "author1", roles = {})
    public void getAllArticleAuthor1Test() throws Exception {
        mvc.perform(get("/articles")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)));
    }

    @Test
    @WithMockUser(username = "author2", roles = {})
    public void getAllArticleAuthor2Test() throws Exception {
        mvc.perform(get("/articles")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(5)));
    }

    @Test
    @WithMockUser(username = "someAdmin", roles = {"ADMIN"})
    public void getAllArticleAdminTest() throws Exception {
        mvc.perform(get("/articles")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(6)));
    }

    @Test
    public void getArticleUnauthorizedUserTest() throws Exception {
        //public author1 article
        mvc.perform(get("/articles/article1_uuid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("article1_title"));

        //private author1 article
        mvc.perform(get("/articles/article3_uuid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        //article with incorrect uuid
        mvc.perform(get("/articles/incorrect_article_uuid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "author1", roles = {})
    public void getArticleAuthor1Test() throws Exception {
        //private author1 article
        mvc.perform(get("/articles/article3_uuid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("article3_title"));

        //public author2 article
        mvc.perform(get("/articles/article4_uuid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("article4_title"));

        //private author2 article
        mvc.perform(get("/articles/article5_uuid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}