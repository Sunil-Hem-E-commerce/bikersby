"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "districts",
      [
        { districtName: "Achham" },
        { districtName: "Arghakhachi" },
        { districtName: "Baglung" },
        { districtName: "Baitadi" },
        { districtName: "Bajhang" },
        { districtName: "Bajura" },
        { districtName: "Banke" },
        { districtName: "Bara" },
        { districtName: "Bardiya" },
        { districtName: "Bhaktapur" },
        { districtName: "Bhojpur" },
        { districtName: "Chitwan" },
        { districtName: "Dadeldhura" },
        { districtName: "Dailekh" },
        { districtName: "Dang" },
        { districtName: "Darchula" },
        { districtName: "Dhading" },
        { districtName: "Dhankuta" },
        { districtName: "Dhanusha" },
        { districtName: "Dolakha" },
        { districtName: "Dolpa" },
        { districtName: "Doti" },
        { districtName: "Gorkha" },
        { districtName: "Gulmi" },
        { districtName: "Humla" },
        { districtName: "Ilam" },
        { districtName: "Jajarkot" },
        { districtName: "Jhapa" },
        { districtName: "Jumla" },
        { districtName: "Kailali" },
        { districtName: "Kalikot" },
        { districtName: "Kanchanpur" },
        { districtName: "Kapilbastu" },
        { districtName: "Kaski" },
        { districtName: "Kathmandu" },
        { districtName: "Kavrepalanchowk" },
        { districtName: "Khotang" },
        { districtName: "Lalitpur" },
        { districtName: "Lamjung" },
        { districtName: "Mahottari" },
        { districtName: "Makwanpur" },
        { districtName: "Manang" },
        { districtName: "Morang" },
        { districtName: "Mugu" },
        { districtName: "Mustang" },
        { districtName: "Myagdi" },
        { districtName: "Nawalparasi (west)" },
        { districtName: "Nawalpur (Nawalparasi East)" },
        { districtName: "Nuwakot" },
        { districtName: "Okhaldhunga" },
        { districtName: "Palpa" },
        { districtName: "Panchthar" },
        { districtName: "Parbat" },
        { districtName: "Parsa" },
        { districtName: "Pyuthan" },
        { districtName: "Ramechhap" },
        { districtName: "Rasuwa" },
        { districtName: "Rautahat" },
        { districtName: "Rolpa" },
        { districtName: "Rukum (East)" },
        { districtName: "Rukum (West)" },
        { districtName: "Rupendehi" },
        { districtName: "Salyan" },
        { districtName: "Sankhuwashabha" },
        { districtName: "Saptari" },
        { districtName: "Sarlahi" },
        { districtName: "Sindhuli" },
        { districtName: "Sindhupalchowk" },
        { districtName: "Siraha" },
        { districtName: "Solukhumbu" },
        { districtName: "Sunsari" },
        { districtName: "Surkhet" },
        { districtName: "Syangja" },
        { districtName: "Tanahu" },
        { districtName: "Taplejung" },
        { districtName: "Tehrathum" },
        { districtName: "Udayapur" },
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