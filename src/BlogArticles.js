import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://techcrunch.com/wp-json/wp/v2/posts?per_page=10';

const BlogArticles = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const fetchArticles = async () => {
        try {
          const response = await axios(url);
          setBlogs(response.data);
          
        } catch (error) {
          setError('Error fetching blogs');
        }
        setLoading(false);
      };

      fetchArticles();
    }, 600);
  }, []);

  return (
    <div className='home'>
      {loading && <div>loading...</div>}
      {error && <div>{error}</div>}
      {blogs && (
        <div className='articles'>
          {blogs.map(blog => (
            <div className='article' key={blog.id}>
              <h2>{blog.title.rendered}</h2>
              <p>{blog.excerpt.rendered}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogArticles;
