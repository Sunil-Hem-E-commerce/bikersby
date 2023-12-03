"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Districts",
      [
        { district_name: "Achham" },
        { district_name: "Arghakhachi" },
        { district_name: "Baglung" },
        { district_name: "Baitadi" },
        { district_name: "Bajhang" },
        { district_name: "Bajura" },
        { district_name: "Banke" },
        { district_name: "Bara" },
        { district_name: "Bardiya" },
        { district_name: "Bhaktapur" },
        { district_name: "Bhojpur" },
        { district_name: "Chitwan" },
        { district_name: "Dadeldhura" },
        { district_name: "Dailekh" },
        { district_name: "Dang" },
        { district_name: "Darchula" },
        { district_name: "Dhading" },
        { district_name: "Dhankuta" },
        { district_name: "Dhanusha" },
        { district_name: "Dolakha" },
        { district_name: "Dolpa" },
        { district_name: "Doti" },
        { district_name: "Gorkha" },
        { district_name: "Gulmi" },
        { district_name: "Humla" },
        { district_name: "Ilam" },
        { district_name: "Jajarkot" },
        { district_name: "Jhapa" },
        { district_name: "Jumla" },
        { district_name: "Kailali" },
        { district_name: "Kalikot" },
        { district_name: "Kanchanpur" },
        { district_name: "Kapilbastu" },
        { district_name: "Kaski" },
        { district_name: "Kathmandu" },
        { district_name: "Kavrepalanchowk" },
        { district_name: "Khotang" },
        { district_name: "Lalitpur" },
        { district_name: "Lamjung" },
        { district_name: "Mahottari" },
        { district_name: "Makwanpur" },
        { district_name: "Manang" },
        { district_name: "Morang" },
        { district_name: "Mugu" },
        { district_name: "Mustang" },
        { district_name: "Myagdi" },
        { district_name: "Nawalparasi (west)" },
        { district_name: "Nawalpur (Nawalparasi East)" },
        { district_name: "Nuwakot" },
        { district_name: "Okhaldhunga" },
        { district_name: "Palpa" },
        { district_name: "Panchthar" },
        { district_name: "Parbat" },
        { district_name: "Parsa" },
        { district_name: "Pyuthan" },
        { district_name: "Ramechhap" },
        { district_name: "Rasuwa" },
        { district_name: "Rautahat" },
        { district_name: "Rolpa" },
        { district_name: "Rukum (East)" },
        { district_name: "Rukum (West)" },
        { district_name: "Rupendehi" },
        { district_name: "Salyan" },
        { district_name: "Sankhuwashabha" },
        { district_name: "Saptari" },
        { district_name: "Sarlahi" },
        { district_name: "Sindhuli" },
        { district_name: "Sindhupalchowk" },
        { district_name: "Siraha" },
        { district_name: "Solukhumbu" },
        { district_name: "Sunsari" },
        { district_name: "Surkhet" },
        { district_name: "Syangja" },
        { district_name: "Tanahu" },
        { district_name: "Taplejung" },
        { district_name: "Tehrathum" },
        { district_name: "Udayapur" },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Roles",
      [
        { user_role: "individual" },
        { user_role: "showroom" },
        { user_role: "recondition" },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Companies",
      [
        {
          company_name: "Aprilia",
          company_logo: "random text added by seeder file, need to update",
        },
        {
          company_name: "Bajaj",
          company_logo: "random text added by seeder file, need to update",
        },
        {
          company_name: "Benelli",
          company_logo: "random text added by seeder file, need to update",
        },
        { company_name: "CFMoto" },
        { company_name: "Cross X" },
        { company_name: "Crossfire" },
        { company_name: "Harley Davidson" },
        { company_name: "Hero" },
        { company_name: "Honda" },
        { company_name: "Jawa" },
        { company_name: "KTM" },
        { company_name: "Royal Enfield" },
        { company_name: "Suzuki" },
        { company_name: "TVS" },
        { company_name: "Yamaha" },
        { company_name: "Yatri Motorcycles" },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Categories",
      [
        { product_category: "family" },
        { product_category: "non-sport" },
        { product_category: "sport" },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Order_status_opts",
      [
        { status_opt: "cart" },
        { status_opt: "checkout" },
        { status_opt: "delivered" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // write a query to revert your changes (if any)
    await queryInterface.bulkDelete("Districts", null, {});
    await queryInterface.bulkDelete("Roles", null, {});
    await queryInterface.bulkDelete("Companies", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Order_status_opts", null, {});
  },
};
