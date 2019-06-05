import React from 'react';
import {STATE_ARTICLE_EDIT} from "../states";
import Textarea from 'react-textarea-autosize';

function ArticleEditForm({
                             state,
                             articleUuid,
                             articleTitle, onArticleTitleChange,
                             articleBody, onArticleBodyChange,
                             articleAuthor,
                             articlePublished, onArticlePublishedChange,
                             articlePublishedDate,
                             articleCreateDate,
                             articleLastEditDate,
                             onArticleCancel,
                             onArticleSave,
                         }) {
    if (state === STATE_ARTICLE_EDIT) {
        const blockStyle = {
            margin: "2%"
        };
        const dateDivState = {
            textAlign: "right",
        };
        return (
            <div>
                <div style={dateDivState}>Create date: {articleCreateDate}</div>
                <div style={dateDivState}>Published date: {articlePublishedDate}</div>
                <div style={dateDivState}>Last edit date: {articleLastEditDate}</div>
                <div style={blockStyle}>
                    <div>Article is visible:</div>
                    <div>
                        <input type="checkbox"
                               name="articlePublished"
                               checked={articlePublished}
                               onChange={event => onArticlePublishedChange(event.target.checked)}/>
                    </div>
                </div>
                <div style={blockStyle}>
                    <div>Title:</div>
                    <div>
                        <input type="text"
                               name="title"
                               value={articleTitle}
                               style={{
                                   width: "90%"
                               }}
                               onChange={event => onArticleTitleChange(event.target.value)
                               }/>
                    </div>
                </div>
                <div style={blockStyle}>
                    <div>Body:</div>
                    <div>
                        <Textarea style={{
                            width: "90%",
                            resize: "none",
                            height: "auto",
                            overflow: "auto",
                        }}
                                  value={articleBody}
                                  onChange={event => onArticleBodyChange(event.target.value)}
                        />
                    </div>
                </div>
                <div style={blockStyle}>
                    <div>
                        <button onClick={() => {
                            onArticleSave(articleUuid,
                                articleTitle,
                                articleBody,
                                articleAuthor,
                                articlePublished,
                                articlePublishedDate,
                                articleCreateDate,
                                articleLastEditDate);
                        }}>
                            Save
                        </button>
                        <button onClick={() => {
                            onArticleCancel();
                        }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default ArticleEditForm;