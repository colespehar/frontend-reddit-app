import React from 'react';

function Article(props) {
  let base_url = 'https://reddit.com';
  function favs() {
      let storedID, storedArticle;
      storedID = localStorage.getItem('storedID');
      storedArticle = localStorage.getItem('storedArticle');

      if (storedID !== null && storedArticle !== null && storedID !== "" && storedArticle !== "") {
          storedID = storedID.split(',');
          storedArticle = storedArticle.split(',');

          let storedIDString, storedArticleString;

          for(let i = 0; i < storedID.length; i++) {
            if(i === 0) {
                storedIDString = storedID[i];
                storedArticleString = storedArticle[i];
            }
            else {
                storedIDString += ',' + storedID[i];
                storedArticleString += ',' + storedArticle[i];
            }
          }
          storedIDString += ',' + props.article.id;
          storedArticleString += ',' + props.article.subreddit;

          localStorage.setItem('storedID', storedIDString);
          localStorage.setItem('storedArticle', storedArticleString);
      }
      else {
        localStorage.setItem('storedID', props.article.id);
        localStorage.setItem('storedArticle', props.article.subreddit);
      }
  }

  return (
    <article>
      <a href={ base_url + props.article.permalink } target="_blank">
        <h3>{ props.article.title }</h3>
      </a>

      <input type="checkbox" onClick={favs}/>

    </article>
  )
}

export default Article;