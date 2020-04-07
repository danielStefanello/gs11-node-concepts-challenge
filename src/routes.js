const { Router } = require("express");

const RepositoriesController = require("./controllers/RepositoriesController");

const routes = new Router();

routes.get("/", (request, repsonse) => {
  return response.json({ message: "Welcome to the Node.js challenge. " });
});

routes.get("/repositories", RepositoriesController.index);

routes.post("/repositories", RepositoriesController.store);

routes.put("/repositories/:id", RepositoriesController.update);

routes.delete("/repositories/:id", RepositoriesController.delete);

routes.post("/repositories/:id/like", RepositoriesController.like);

module.exports = routes;
