'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      {
        name: "Carnaval",
        state: false,
        date: "2023-02-17",
        location: "-23.51633,-46.64624",
        description: "O carnaval é uma festa popular que ocorre anualmente em diversos países ao redor do mundo. Caracterizado por desfiles de escolas de samba, blocos de rua, música, dança e fantasia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Expoacre",
        state: true,
        date: "2023-07-29",
        location: "-10.01806,-67.79816",
        description: "A Expoacre é uma feira agropecuária e industrial que acontece todos os anos no estado do Acre, no Brasil. É considerada uma das maiores feiras do estado e reúne diversos setores da economia local, como agricultura, pecuária, indústria, comércio e serviços.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jogos Uni",
        state: true,
        date: "2023-10-1",
        location: "-10.01806,-67.79816",
        description: "Os Jogos Universitários são competições esportivas realizadas entre instituições de ensino superior, como universidades e faculdades, com o objetivo de promover a prática esportiva, incentivar a integração entre os estudantes e fortalecer o espírito esportivo e o sentimento de pertencimento à instituição",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Events', null, {});

  }
};
