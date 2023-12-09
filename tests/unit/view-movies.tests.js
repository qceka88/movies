const assert = require('assert');
const fetch = require('node-fetch');

suite('View Movies page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/movies");
    let body = await res.text();
    assert.ok(body.includes("<h1>Added Movies</h1>"));
  });
  
  test('Movies list', async function() {
    let res = await fetch("http://localhost:8888/movies");
    let body = await res.text();
    assert.ok(body.includes("<ul><li>Interstellar (9.8)</li><li>Shrek (9.1)</li><li>The Mummy (9.3)</li></ul>"));
  });
});
