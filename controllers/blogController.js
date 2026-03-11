const posts = require("../data/posts")
const db = require("../db/index")

/* ----------------- FUNZIONI CON DB --------------------- */
async function index(req, res) {
	let results = [];

	// console.log(req.query)
	const limit = req.query.limit ?? 10;
	const page = req.query.page ?? 1;
	const myQuery = "SELECT * FROM posts LIMIT $1 OFFSET $2"

	const { rows, rowCount } = await db.query(myQuery, [limit, page * limit - limit])

	const success = (rowCount > 0);
	const statusCode = success ? 200 : 404;

	const response = {
		success,
		payload: rows
	};

	return res.status(statusCode).json(response);

}

async function show(req, res) {
	const id = parseInt(req.params.id)

	let result = null;

	const statement = `SELECT id, title, tags, date FROM posts WHERE id = $1`;
	const params = [id];

	const { rows, rowCount } = await db.query(statement, params);

	const success = (rowCount > 0);
	const statusCode = success ? 200 : 404;

	const response = {
		success,
		payload: rows[0]
	};

	if (!success) {
		response.error = "Not found";
		response.message = "Articolo non trovata";
	}

	res.status(statusCode).json(response);
}

async function store(req, res) {
	const { title, tags } = req.body;

	if (!title || title.length < 3) {
		throw new Error("Titolo non valido");
	}

	if (!Array.isArray(tags)) {
		throw new Error("Tag non validi");
	}

	const statement = `INSERT INTO posts (title, tags) VALUES ($1, $2::jsonb) RETURNING *`;

	const params = [title, JSON.stringify(tags)];

	const { rows, rowCount } = await db.query(statement, params);

	const success = (rowCount == 1);
	const statusCode = success ? 201 : 404;

	const response = {
		success,
		payload: rows[0]
	};

	if (!success) {
		response.error = "Errore inserimento";
		response.message = "Impossibile inserire l'elemento";
	}

	res.status(statusCode).json(response);
}

async function update(req, res) {
	const id = Number(req.params.id);
	const { title, tags } = req.body;

	if (!title || title.length < 3) {
		throw new Error("Titolo non valido");
	}

	if (!Array.isArray(tags)) {
		throw new Error("Tag non validi");
	}

	if (!Number.isInteger(id) || id <= 0) {
		throw new Error("ID non valido");
	}

	const statement = `UPDATE posts SET title=$1, tags=$2::json WHERE id=$3 RETURNING *`;

	const params = [title, JSON.stringify(tags), id];

	const { rows, rowCount } = await db.query(statement, params);

	const success = (rowCount == 1);
	const statusCode = success ? 201 : 404;

	const response = {
		success,
		payload: rows[0]
	};

	if (!success) {
		response.error = "Errore modifica";
		response.message = "Impossibile modificare l'elemento";
	}

	res.status(statusCode).json(response);
}
async function modify(req, res) {
}

async function destroy(req, res) {

	const id = Number(req.params.id);

	if (!Number.isInteger(id) || id <= 0) {
		throw new Error("ID non valido");
	}

	const statement = `DELETE FROM posts WHERE id=$1`;

	const params = [id];

	const { rows, rowCount } = await db.query(statement, params);

	const success = (rowCount == 1);
	const statusCode = success ? 201 : 404;

	const response = {
		success,
		payload: rows[0]
	};

	if (!success) {
		response.error = "Errore eliminazione";
		response.message = "Impossibile eliminare l'elemento";
	}

	res.status(statusCode).json(response);
}

/* ----------------- FUNZIONI SENZA DB --------------------- */
// function index(req, res) {
// 	let results = posts;

// 	if (req.query.tags) {

// 		const needle = req.query.tags;
// 		results = posts.filter(post => post.tags.includes(needle));

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