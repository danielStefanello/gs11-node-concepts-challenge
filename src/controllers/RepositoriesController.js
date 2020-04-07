const { uuid } = require("uuidv4");

const repositories = [];

module.exports = {
  index(request, response) {
    return response.json(repositories);
  },

  store(request, response) {
    const { title, url, techs } = request.body;

    const repositorie = { id: uuid(), title, url, techs, likes: 0 };

    repositories.push(repositorie);

    return response.json(repositorie);
  },

  update(request, response) {
    const { id } = request.params;

    const { title, url, techs } = request.body;

    const repositorieIndex = repositories.findIndex(
      (repositorie) => repositorie.id === id
    );

    if (repositorieIndex < 0) {
      return response.status(400).json({ error: "Repositorie not found." });
    }

    const likes = repositories[repositorieIndex].likes;

    const repositorie = {
      id,
      title,
      url,
      techs,
      likes,
    };

    repositories[repositorieIndex] = repositorie;

    return response.json(repositorie);
  },

  delete(request, response) {
    const { id } = request.params;

    const repositorieIndex = repositories.findIndex(
      (repositorie) => repositorie.id === id
    );

    if (repositorieIndex < 0) {
      return response.status(400).json({ error: "Repositorie not found." });
    }

    repositories.splice(repositorieIndex, 1);

    return response.status(204).send();
  },

  like(request, response) {
    const { id } = request.params;

    const repositorieIndex = repositories.findIndex(
      (repositorie) => repositorie.id === id
    );

    if (repositorieIndex < 0) {
      return response.status(400).json({ error: "Repositorie not found." });
    }

    repositories[repositorieIndex].likes += 1;

    const repositorie = repositories[repositorieIndex];

    return response.json(repositorie);
  },
};
