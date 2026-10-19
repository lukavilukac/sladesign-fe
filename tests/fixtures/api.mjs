import { createServer } from 'node:http';
import { apiResponse } from './catalog.mjs';

createServer((req, res) => {
    // Never forward test requests to an external API or accept real orders.
    const data = req.method === 'GET' ? apiResponse(new URL(req.url, 'http://localhost').pathname, req.headers.locale) : null;
    res.writeHead(data === null ? 404 : 200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}).listen(4010, '127.0.0.1');
