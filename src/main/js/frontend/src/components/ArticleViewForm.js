import React from 'react';
import {STATE_ARTICLE_VIEW} from "../states";


const ArticleViewForm = function ({
                                      state,
                                      articleAuthor,
                                      login,
                                      articleUuid,
                                      articleTitle,
                                      articleBody,
                                      articlePublished,
                                      articlePublishedDate,
                                      articleLastEditDate,
                                      onArticleEdit
                                  }) {
    if (state === STATE_ARTICLE_VIEW) {
        const buttonEdit = () => {
            if (login === articleAuthor) {
                return (
                    <button onClick={() => {
                        onArticleEdit();
                    }}>Edit article
                    </button>
                );
            } else {
                return null;
            }
        }
        let publishedDateAsText = "Not published yet";
        if (articlePublished) {
            publishedDateAsText = articlePublishedDate;
        }
        const dateDivState = {
            textAlign: "right",
        };
        return (
            <div>
                <div style={dateDivState}>Published date: {publishedDateAsText}</div>
                <div style={dateDivState}>Last edit date: {articleLastEditDate}</div>
                <h1>{articleTitle}{buttonEdit()}</h1>
                <div style={{
                    padding: "1%"
                }} dangerouslySetInnerHTML={{__html: articleBody}}/>
            </div>
        );
    }
    return null;
}

export default ArticleViewForm;