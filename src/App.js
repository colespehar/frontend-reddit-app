import React, { useState, useEffect } from 'react';

import Article from './components/Article';

function App() {
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('programming');
  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit +".json").then(
      res => {
        if (res.status !== 200) {
          console.warn("Warning: Something is wrong with the api.");
          return;
        }
        res.json().then(data => {
          if (data != null)
            setArticles(data.data.children);
        });
      }
    )
  }, [subreddit]);
  
  function favourites() {

    setArticles();
    let id, name;
    id = localStorage.getItem('storedID');
    name = localStorage.getItem('storedArticle');

    if (id === null || id === ""){
      fetch("https://www.reddit.com/r/" + subreddit +".json").then(
      res => {
        if (res.status !== 200) {
          console.warn("Warning: Something is wrong with the api.");
          return;
        }
        res.json().then(data => {
          if (data != null)
            setArticles(data.data.children);
        });
      }
    )
      return;
    }
    else {

      id = id.split(',');
      name = name.split(',');
      
      const promises = id.map(f => {
        return fetch('https://www.reddit.com/' + f + '.json');
      });
  
      Promise.all(promises).then(values => {
        const promisesValues = values.map(v => v.json());
        Promise.all(promisesValues).then(items => {
          const mapped = items.map(item => item[0]?.data?.children[0]);
          setArticles(mapped);
        });
      });
    }
  }

  function removeFavourites() {

    localStorage.setItem('storedID', "");
    localStorage.setItem('storedArticle',"");
    setArticles();
    fetch("https://www.reddit.com/r/" + subreddit +".json").then(
      res => {
        if (res.status !== 200) {
          console.warn("Warning: Something is wrong with the api.");
          return;
        }
        res.json().then(data => {
          if (data != null)
            setArticles(data.data.children);
        });
      }
    )
  }

  return (
    <div className="App">
      <header>
        <input className="subreddit_input" onChange={e => setSubreddit(e.target.value)} value={subreddit} />

        <div className="favsButton">
          <input type="button" onClick={favourites} value="Favourites" />
        </div>
        <div className="removeFavs">
          <input type="button" onClick={removeFavourites} value="Remove All" />
        </div>

      </header>

      <div className="articles">
        {(articles != null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''}
      </div>
    </div>
  );
}

export default App;