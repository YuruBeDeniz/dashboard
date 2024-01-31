import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import { formatText } from '../../utilities/formatText';

export default function WikiArticle() {
  const [articles, setArticles] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getWikiArticles = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;  
    
    axios
     .get(url, {
      headers: {
        'Authorization': `${process.env.REACT_APP_WIKIMEDIA_ACCESS_TOKEN}`,
        'Api-User-Agent': `Dashboard ${process.env.REACT_APP_EMAIL}`,
      },
     })  
     .then(response => {
       setArticles(response.data);
       setIsLoading(false);
     })
     .catch(err => console.log(err))
  };

  useEffect(() => {
    getWikiArticles();
  }, []);

  const imageURL = articles?.image?.image?.source
  const pageURL = articles?.onthisday?.[0]?.pages?.[0]?.content_urls?.desktop?.page;
  const text = articles?.onthisday?.[0]?.text;


  return (
    <>
    <h1 className="article-card-title">Article of the Day</h1>
    <div className="article-card">
      {isLoading 
      ? <p>Loading...</p>
      : <>
          <img src={imageURL} alt={articles?.image?.artist?.text} className="article-image" />
          <div className="article-text">
            <p>{text && formatText(text)}</p>
            <a href={pageURL} target="_blank" rel="noreferrer">see more...</a>
          </div>
        </>
      }
    </div>
    </>
  );
}

