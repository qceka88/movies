const assert = require('assert');
const fetch = require('node-fetch');

suite('Add Movies page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/add-movie");
    let body = await res.text();
    assert.ok(body.includes("<h1>Add New Movie</h1>"));
  });

  test('Movie HTML form', async function() {
    let res = await fetch("http://localhost:8888/add-movie");
    let body = await res.text();
    
    let nameFieldFound = body.includes('<input id="name" type="text" name="name"/>');
    assert.ok(nameFieldFound, "Field 'name' is missing");

    let ratingFieldFound = body.includes('<input id="rating" type="text" name="rating"/>');
    assert.ok(ratingFieldFound, "Field 'rating' is missing");

    let buttonAddFound = body.includes('<button type="submit">Add</button>');
    assert.ok(buttonAddFound, "Button [Add] is missing");
  });

  test('Add valid movie', async function() {
    let res = await fetch(
      "http://localhost:8888/add-movie",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=Up&rating=9.5"
      }
    );
    let body = await res.text();
    let moviesReturned = body.includes(
		"<ul><li>Interstellar (9.8)</li><li>Shrek (9.1)</li><li>The Mummy (9.3)</li><li>Up (9.5)</li></ul>");
    assert.ok(moviesReturned, "Add movie failed");
  });

  test('Add invalid movie', async function() {
     let res = await fetch(
      "http://localhost:8888/add-movie",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=The Matrix&rating="
      }
    );
    let body = await res.text();
    let errMsg = body.includes("Cannot add movie. Name and rating fields are required!");
    assert.ok(errMsg, "Add invalid movie should display an error message");

    res = await fetch("http://localhost:8888/");
    body = await res.text();
	assert.ok(body.includes("Added movies: <b>3</b>"), 
		"Add invalid movie should not change the movies count");
  });
});
