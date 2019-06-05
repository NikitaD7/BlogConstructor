package com.github.nikitad7.blogconstructor.articles;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("SELECT a FROM Article a WHERE a.uuid = :uuid AND a.deleted = false")
    Article findByUuidNotDeleted(@Param("uuid") String uuid);

    @Query("SELECT a FROM Article a WHERE a.uuid = :uuid AND a.published = true AND a.deleted = false")
    Article findByUuidPublishedAndNotDeleted(@Param("uuid") String uuid);

    @Query("SELECT a FROM Article a WHERE a.uuid = :uuid AND (a.published = true OR a.author = :userName) AND a.deleted = false")
    Article findByUuidWithAuthorNotDeleted(@Param("uuid") String uuid, @Param("userName") String userName);

    @Query("SELECT a FROM Article a WHERE a.deleted = false")
    List<Article> findAllNotDeleted();

    @Query("SELECT a FROM Article a WHERE (a.published = true OR a.author = :userName) AND a.deleted = false")
    List<Article> findAllOwnOrPublishedAndNotDeleted(@Param("userName") String userName);

    @Query("SELECT a FROM Article a WHERE a.published = true AND a.deleted = false")
    List<Article> findAllPublishedAndNotDeleted();
}