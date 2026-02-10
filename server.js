const express = require("express");
const blogRouter = require("./routers/blog");

const logTimeMiddleware = require("./middlewares/logTime")
const errorsHandlerMiddleware = require("./middlewares/errorsHandler")
const notFoundMiddleware = require("./middlewares/notFound")

const app = express()
const PORT = 3000

app.use(logTimeMiddleware)

app.use(express.static("public"))
app.use(express.json())

app.get('/', (req, res) => {
	res.type("html").send('<h1>Benvenuto nel mio blog</h1>');
});

app.get("/debug", (req, res) => {
	const richiestaSemplificata = {
		query: req.query, //query params come ?chiave=valore
		params: req.params, //parametri di rotta (non ancora visti)
		body: req.body, //body richesta json/form (non ancora visti)
		headers: req.headers, //header allegati alla richiesta
		method: req.method, //metodo HTTP (GET, POST, …)
		originalUrl: req.originalUrl, //URL richiesto
		path: req.path, //path (senza query)
		protocol: req.protocol, //http / https
		ip: req.ip, //IP client
		secure: req.secure, //true se HTTPS
		xhr: req.xhr, //true se AJAX
	};

	console.log("Ricevuta richiesta: ", richiestaSemplificata);

	res.json(richiestaSemplificata);
});

app.use( "/bacheca", blogRouter);


app.use(notFoundMiddleware)
app.use(errorsHandlerMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});