# 🚀 Proxy Caching Server

A lightweight, high-performance caching proxy server built with Node.js that speeds up API requests by caching responses locally.

## ✨ Features

- **Smart Caching**: Automatically caches GET requests with 5-minute TTL
- **File Persistence**: Cache survives server restarts
- **CLI Management**: Easy command-line interface for cache operations
- **Fast Performance**: Reduces API response times significantly
- **Error Handling**: Robust error handling with proper HTTP status codes
- **Cache Headers**: Includes `X-Cache` headers for debugging (HIT/MISS)

## 📦 Installation

```bash
git clone git@github.com:Amir-Shaban32/Caching-proxy-CLI.git
# Install dependencies
npm install node-cache express axios yargs
```

## 🚀 Quick Start

### 1. Start the Proxy Server

```bash
node app.mjs start 3000 https://dummyjson.com
```

This starts a proxy server on port 3000 that forwards requests to `https://dummyjson.com`.

### 2. Make Requests

Open your browser or use curl:

```bash
curl http://localhost:3000/products
curl http://localhost:3000/users
curl http://localhost:3000/products/1
```

### 3. Check Cache

```bash
node app.mjs list-cache
```

### 4. Clear Cache

```bash
node app.mjs clear-cache
```

## 📖 Usage

### Commands

| Command | Description | Example |
|---------|-------------|---------|
| `start [port] [origin]` | Start the proxy server | `node app.mjs start 8080 https://api.github.com` |
| `list-cache` | List all cached URLs | `node app.mjs list-cache` |
| `clear-cache` | Clear all cached data | `node app.mjs clear-cache` |

### Default Values

- **Port**: 3000
- **Origin**: https://dummyjson.com
- **Cache TTL**: 5 minutes

## 🔧 Configuration

### Custom Port and Origin

```bash
node app.mjs start 8080 https://api.github.com

node app.mjs start 5000 https://jsonplaceholder.typicode.com
```

### Cache Settings

Edit `proxy.mjs` to change cache behavior:

```javascript
// Change cache TTL (in seconds)
cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

// Disable TTL (cache forever)
cache = new NodeCache({ stdTTL: 0 });
```

## 🏗️ Project Structure

```
proxy-caching-project/
├── proxy.mjs           # Main proxy server logic
├── app.mjs             # CLI interface
├── proxy-cache.json    # Cache persistence file (auto-generated)
├── package.json        # Dependencies
└── README.md           # This file
```

## 🔍 How It Works

1. **Request Arrives**: Client makes request to proxy server
2. **Cache Check**: Server checks if response is cached
3. **Cache Hit**: If cached, return immediately with `X-Cache: HIT`
4. **Cache Miss**: If not cached, forward request to origin server
5. **Cache Store**: Store successful responses with `X-Cache: MISS`
6. **File Persistence**: Save cache to `proxy-cache.json`

## 📊 Cache Headers

The proxy adds helpful headers to responses:

- `X-Cache: HIT` - Response served from cache
- `X-Cache: MISS` - Response fetched from origin server

## 🛠️ Troubleshooting

### Common Issues

#### Cache appears empty when listing
**Problem**: Running commands in separate processes  
**Solution**: The updated version saves cache to file, so this should work now

#### Connection refused errors
**Problem**: Origin server is unreachable  
**Solution**: Check the origin URL and your internet connection

#### Port already in use
**Problem**: Another service is using the port  
**Solution**: Use a different port: `node app.mjs start 3001`

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Caching powered by [node-cache](https://github.com/node-cache/node-cache)
- CLI interface using [yargs](https://yargs.js.org/)
- HTTP requests via [axios](https://axios-http.com/)


