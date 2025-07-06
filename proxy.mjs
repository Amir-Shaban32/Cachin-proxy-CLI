import NodeCache from "node-cache";
import express from "express";
import axios from "axios";

let cache = null;

export const start = (port, origin) => {
  cache = new NodeCache({ stdTTL: 300 }); 
  const app = express();
  
  // Use middleware instead of route pattern
  app.use(async (req, res, next) => {
    try {
      const url = `${origin.replace(/\/+$/, '')}${req.originalUrl}`;
      const cached = cache.get(url);
      
      if (cached) {
        res.setHeader('X-Cache', 'HIT');
        return res.status(cached.status).set(cached.headers).send(cached.data);
      }
      
      const response = await axios.get(url, { 
        headers: { ...req.headers, host: undefined },
        timeout: 10000 
      });
      
      cache.set(url, {
        status: response.status,
        headers: response.headers,
        data: response.data
      });
      
      res.setHeader('X-Cache', 'MISS');
      res.status(response.status).set(response.headers).send(response.data);
      
    } catch (err) {
      console.error(`Proxy error: ${err.message}`);
      const status = err.response?.status || 500;
      const message = err.response?.data || 'Proxy error';
      res.status(status).send(message);
    }
  });
  
  app.listen(port, () => {
    console.log(`Proxy server running on port ${port}, proxying to ${origin}`);
  });
};

export const listCache = () => {
  if (!cache) {
    console.log('Cache not initialized');
    return;
  }
  
  const keys = cache.keys();
  if (keys.length === 0) {
    console.log('Cache is empty');
  } else {
    console.log(`Cached URLs (${keys.length}):`);
    keys.forEach(key => console.log(`  ${key}`));
  }
};

export const clearCache = () => {
  if (cache) {
    cache.flushAll();
    console.log('Cache cleared');
  } else {
    console.log('Cache not initialized');
  }
};
