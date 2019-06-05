package com.github.nikitad7.blogconstructor.articles;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ArticleRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ArticleRepository articleRepository;

    @Before
    public void setUp() {
        //author1
        createArticle("article1", "author1", true, false);
        createArticle("article2", "author1", true, false);
        createArticle("article3", "author1", true, false);
        createArticle("article4", "author1", true, true);
        createArticle("article5", "author1", true, true);
        createArticle("article6", "author1", true, true);
        createArticle("article7", "author1", false, true);
        //author2
        createArticle("article8", "author2", true, false);
        createArticle("article9", "author2", true, true);
        createArticle("article10", "author2", false, false);
        createArticle("article11", "author2", false, true);
    }

    private void createArticle(String key, String author, boolean published, boolean deleted) {
        Article article = new Article();
        article.setTitle(key + "_title");
        article.setBody(key + "_body");
        article.setUuid(key + "_uuid");
        article.setAuthor(author);
        article.setPublished(published);
        article.setDeleted(deleted);
        article.setCreateDate(LocalDateTime.now());
        article.setLastEditDate(LocalDateTime.now());
        entityManager.persist(article);
    }

    @Test
    public void findByUuidNotDeletedTest() {
        //published and not deleted
        assertEquals(articleRepository.findByUuidNotDeleted(
                "article1_uuid").getTitle(),
                "article1_title"
        );
        //deleted and published
        assertNull(articleRepository.findByUuidNotDeleted(
                "article6_uuid"
        ));
    }

    @Test
    public void findByUuidPublishedAndNotDeletedTest() {
        //published and not deleted
        assertEquals(articleRepository.findByUuidPublishedAndNotDeleted(
                "article1_uuid").getTitle(),
                "article1_title"
        );
        //published and deleted
        assertNull(articleRepository.findByUuidPublishedAndNotDeleted(
                "article6_uuid"
        ));
        //not published and not deleted
        assertNull(articleRepository.findByUuidPublishedAndNotDeleted(
                "article10_uuid"
        ));
        //not published and deleted
        assertNull(articleRepository.findByUuidPublishedAndNotDeleted(
                "article7_uuid"
        ));
    }

    @Test
    public void findByUuidWithAuthorNotDeletedTest() {
        /* === article author === */
        //published, not deleted
        assertEquals(articleRepository.findByUuidWithAuthorNotDeleted(
                "article8_uuid", "author2").getTitle(),
                "article8_title"
        );
        //not published, not deleted
        assertEquals(articleRepository.findByUuidWithAuthorNotDeleted(
                "article10_uuid", "author2").getTitle(),
                "article10_title"
        );
        //published, deleted
        assertNull(articleRepository.findByUuidWithAuthorNotDeleted(
                "article9_uuid", "author2"
        ));
        //not published, deleted
        assertNull(articleRepository.findByUuidWithAuthorNotDeleted(
                "article11_uuid", "author2"
        ));
        /* === not article author === */
        //published, not deleted
        assertEquals(articleRepository.findByUuidWithAuthorNotDeleted(
                "article8_uuid", "author1").getTitle(),
                "article8_title"
        );
        //not published, not deleted
        assertNull(articleRepository.findByUuidWithAuthorNotDeleted(
                "article10_uuid", "author1")
        );
        //published, deleted
        assertNull(articleRepository.findByUuidWithAuthorNotDeleted(
                "article9_uuid", "author1"
        ));
        //not published, deleted
        assertNull(articleRepository.findByUuidWithAuthorNotDeleted(
                "article11_uuid", "author1"
        ));
    }

    @Test
    public void findAllNotDeletedTest() {
        assertEquals(
                5,
                articleRepository.findAllNotDeleted().size()
        );
    }

    @Test
    public void findAllOwnOrPublishedAndNotDeletedTest() {
        assertEquals(4, articleRepository.findAllOwnOrPublishedAndNotDeleted("author1").size());
        assertEquals(5, articleRepository.findAllOwnOrPublishedAndNotDeleted("author2").size());
        assertEquals(4, articleRepository.findAllOwnOrPublishedAndNotDeleted(null).size());
    }

    @Test
    public void findAllPublishedAndNotDeletedTest() {
        assertEquals(4, articleRepository.findAllPublishedAndNotDeleted().size());
    }
}