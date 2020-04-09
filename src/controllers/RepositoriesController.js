const { uuid } = require("uuidv4");

const repositories = [];

module.exports = {
  index(request, response) {
    return response.json(repositories);
  },

  store(request, response) {
    const { title, url, techs } = request.body;

    const repository = { id: uuid(), title, url, techs, likes: 0 };

    repositories.push(repository);

    return response.json(repository);
  },

  update(request, response) {
    const { id } = request.params;

    const { title, url, techs } = request.body;

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return response.status(400).json({ error: "Repository not found." });
    }

    const likes = repositories[repositoryIndex].likes;

    const repository = {
      id,
      title,
      url,
      techs,
      likes,
    };

    repositories[repositoryIndex] = repository;

    return response.json(repository);
  },

  delete(request, response) {
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return response.status(400).json({ error: "Repository not found." });
    }

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
  },

  like(request, response) {
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return response.status(400).json({ error: "Repository not found." });
    }

    repositories[repositoryIndex].likes += 1;

    const repository = repositories[repositoryIndex];

    return response.json(repository);
  },
};
