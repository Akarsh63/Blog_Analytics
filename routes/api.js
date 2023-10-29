const express = require('express');
const router = express.Router();
const axios = require('axios');
const lodash = require('lodash');
const cachePeriod = 300000; 
const getBlogStats = lodash.memoize(fetchAndAnalyzeBlogStats, (cachePeriod) => cachePeriod);
const getBlogSearch = lodash.memoize(fetchAndFilterBlogs, (query) => query);

router.get('/blog-stats', async (req, res) => {
  try {
    const result = await getBlogStats();

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error in Retrieval of data. Try Again');
  }
});

router.get('/blog-search', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).send('Query parameter is required.');
    }
    const result =await getBlogSearch(query);
    if (!result.blogs.length) {
      return res.status(200).send(`No Blogs found for query ${query}`);
    }
    return res.status(200).json({ message: `Filtered Blogs for query ${query} are:`, blogs: result.blogs });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error in Retrieval of data. Try Again');
  }
});

async function fetchAndAnalyzeBlogStats() {
  const headers = {
    'x-hasura-admin-secret': `32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6`,
  };

  const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', { headers });
  const blogs = response.data.blogs;
  const total_blogs = lodash.size(blogs);
  const longestBlog = lodash.maxBy(blogs, 'title.length');
  const filtered_array = lodash.filter(blogs, function (blog) {
    const words_array = lodash.words(lodash.toLower(blog.title));
    return lodash.includes(words_array, 'privacy');
  });
  const total_title_with_privacy = lodash.size(filtered_array);
  const uniqueblogtitles = lodash.uniqBy(blogs, "title");

  return {
    'Total number of blogs': total_blogs,
    'The title of the longest blog': longestBlog.title,
    'Number of blogs with privacy in the title': total_title_with_privacy,
    'An array of unique blog titles': uniqueblogtitles.map((blog) => blog.title),
  };
}

async function fetchAndFilterBlogs(query) {

  const headers = {
    'x-hasura-admin-secret': `32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6`,
  };
  const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', { headers });
  const blogs = response.data.blogs;
  const filtered_blogs = lodash.filter(blogs, (blog) => lodash.toLower(blog.title).includes(query.toLowerCase()));
  return { blogs: filtered_blogs };
}

module.exports = router;
