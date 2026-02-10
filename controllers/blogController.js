const posts = require("../data/posts")
const db = require("../db/index")

/* ----------------- FUNZIONI CON DB --------------------- */
async function index(req, res) {
	let results = [];

	const limit = req.query.limit ?? 10;
	const page = req.query.page ?? 1;
	const myQuery = "SELECT * FROM posts LIMIT $1 OFFSET $2"

	try {
		const risultati = await db.query(myQuery, [limit, page * limit - limit])
		results = risultati.rows
	} catch (err) {
		console.log("Connection error: ", err.message)
	}

	res.json(results);

}

async function show(req, res) {
	const id = parseInt(req.params.id)

	let result = null;

	const myQuery = "SELECT * FROM posts WHERE id = $1"

	try {
		const risultati = await db.query(myQuery, [id])
		result = risultati.rows[0]
	} catch (err) {
		console.log("Connection error: ", err.message)
	}

	if (!result) {

		res.status(404)

		res.json({
			error: "Not found",
			message: "Post non trovato"
		})
	}

	res.json(result);
}

async function store(req, res) {
	// check campi obbligatori
	const reqBody = req.body

	if (!reqBody.titolo || !reqBody.contenuto) {
		res.status(400)
		res.json({
			error: "Bad request",
			message: "Titolo e contenuto sono obbligatori"
		})
	}

	// const myQuery = "INSERT INTO  id,username FROM users WHERE id = $1"

	// try {
	// 	const risultati = await db.query(myQuery, [id])
	// 	result = risultati.rows[0]
	// } catch (err) {
	// 	console.log("Connection error: ", err.message)
	// }

}
async function update(req, res) {
}
async function modify(req, res) {
}

async function destroy(req, res) {

	const id = parseInt(req.params.id)

	let result = null;

	const myQuery = "DELETE FROM posts WHERE id = $1 RETURNING *"

	try {
		const risultati = await db.query(myQuery, [id])
		result = risultati.rows[0]
	} catch (err) {
		console.log("Connection error: ", err.message)
	}

	if (!result) {

		res.status(404)

		res.json({
			error: "Not found",
			message: "Post non trovato"
		})
	}

	res.json(result);
}

/* ----------------- FUNZIONI SENZA DB --------------------- */
// function index(req, res) {
// 	let results = posts;

// 	if (req.query.tags) {

// 		const needle = req.query.tags;
// 		results = posts.filter(pizza => pizza.tags.includes(needle));

// 	}

// 	res.json(results);
// }

// function show(req, res) {

// 	const id = parseInt(req.params.id)

// 	const post = posts.find(p => p.id === id)


// 	if (!post) {

// 		res.status(404)

// 		res.json({
// 			error: "Not found",
// 			message: "Post non trovato"
// 		})
// 	}

// 	res.json(post)
// }

// function store(req, res) {
// 	const postIdsList = posts.map(post => post.id)
// 	const lastId = Math.max(...postIdsList)
// 	const newId = lastId + 1;

// 	const reqBody = req.body
// 	const newPost = {
// 		id: newId,
// 		titolo: reqBody.titolo,
// 		contenuto: reqBody.contenuto,
// 		immagine: reqBody.immagine,
// 		tags: reqBody.tags
// 	}

// 	posts.push(newPost)

// 	res.status(201)
// 	res.json(newPost)
// }

// function update(req, res) {

// 	const id = parseInt(req.params.id)

// 	const post = posts.find(p => p.id === id)

// 	if (!post) {

// 		res.status(404)

// 		res.json({
// 			error: "Not found",
// 			message: "Post non trovato"
// 		})
// 	}
// 	const reqBody = req.body

// 	post.titolo = reqBody.titolo
// 	post.contenuto = reqBody.contenuto
// 	post.immagine = reqBody.immagine
// 	post.tags = reqBody.tags

// 	res.json(post)

// }

// function modify(req, res) {

// 	const id = parseInt(req.params.id)

// 	const post = posts.find(p => p.id === id)

// 	if (!post) {

// 		res.status(404)

// 		res.json({
// 			error: "Not found",
// 			message: "Post non trovato"
// 		})
// 	}
// 	const reqBody = req.body

// 	post.titolo = reqBody.titolo ?? post.titolo
// 	post.contenuto = reqBody.contenuto ?? post.contenuto
// 	post.immagine = reqBody.immagine ?? post.immagine
// 	post.tags = reqBody.tags ?? post.tags

// 	res.json(post)

// }

// function destroy(req, res) {

// 	const id = parseInt(req.params.id)

// 	const post = posts.find(p => p.id === id)


// 	if (!post) {

// 		res.status(404)

// 		res.json({
// 			error: "Not found",
// 			message: "Post non trovato"
// 		})
// 	}
// 	const index = posts.indexOf(post)

// 	posts.splice(index, 1);

// 	res.sendStatus(204)
// }

module.exports = { index, show, store, update, modify, destroy }