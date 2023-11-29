"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "companies",
      [
        { company: " Aprilia " },
        { company: " Bajaj " },
        { company: " Benelli " },
        { company: " CFMoto " },
        { company: " Cross X " },
        { company: " Crossfire " },
        { company: " Harley Davidson " },
        { company: " Hero " },
        { company: " Honda " },
        { company: " Jawa " },
        { company: " KTM " },
        { company: " Royal Enfield " },
        { company: " Suzuki " },
        { company: " TVS " },
        { company: " Yamaha " },
        { company: " Yatri Motorcycles " },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "categories",
      [
        { category: " family " },
        { category: " non-sports " },
        { category: " sports " },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "order_status_opts",
      [
        { order_status_value: " cart " },
        { order_status_value: " checkout " },
        { order_status_value: " delivered " },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
