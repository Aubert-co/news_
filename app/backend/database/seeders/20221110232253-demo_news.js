'use strict';
/*
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('news', [{
      content: 'John',
      title: 'Doe',
      resume: 'example@example.com',
      imgName:'qewq',
      imgPath:'qihwe',
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
