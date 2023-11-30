"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("addresses", [
      {
        addressLine1: "Swimming Pool, Siddhakali chowk",
        addressLine2: "Bikash Marga Loop(Kha), Siddhakali chowk",
        city: "Dharan",
        districtId: 71,
      },
      {
        addressLine1: "Naya thimi",
        city: "Bhaktapur",
        districtId: 10,
      },
      {
        addressLine1: "Pulchowk, way to jhamsikhel",
        city: "lalitpur",
        districtId: 38,
      },
    ]);

    await queryInterface.bulkInsert("users", [
      {
        email: "sunil@gmail.com",
        userName: "Sunil Tajpuriya",
        pwdHash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        defaultAddress: 1,
        userRole: 1,
        joinedAt: new Date(),
      },
      {
        email: "hemlal@gmail.com",
        userName: "Hemlal Dulal",
        pwdHash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        userRole: 1,
        joinedAt: new Date(),
      },
      {
        email: "pagoda@gmail.com",
        userName: "Pagoda Enterprises",
        pwdHash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        defaultAddress: 2,
        userRole: 2,
        joinedAt: new Date(),
      },
      {
        email: "xbshowroom@gmail.com",
        userName: "XB bike house",
        pwdHash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        defaultAddress: 3,
        userRole: 2,
        joinedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("products", [
      {
        productName: "KTM Duke 200",
        companyId: 11,
        catId: 3,
        productDes: "Sports bike, most preferable for youth.",
        overallRating: 8.6,
        mileage: "28 KM",
      },
      {
        productName: "Royal Enfield 250",
        companyId: 12,
        catId: 2,
        productDes:
          "Bike with classic looks! Build with Iron not from plastic.",
        overallRating: 8.6,
        mileage: "27 KM",
      },
      {
        productName: "Bajaj NS 200",
        companyId: 2,
        catId: 3,
        productDes:
          "Sports bike, most preferable for youth in affordable price",
        overallRating: 9,
        mileage: "34 KM",
      },
    ]);

    await queryInterface.bulkInsert("colors", [
      {
        color: "Silver",
        hex: "001b32",
      },
      {
        color: "White",
        hex: "001a23",
      },
      {
        color: "orange",
        hex: "001c21",
      },
      {
        color: "black",
        hex: "101b32",
      },
    ]);

    await queryInterface.bulkInsert("product_item", [
      {
        productId: 1,
        colorId: 3,
        prod_img1: "Image_link_will_be_provided_here!",
        prod_img2: "Image_link_will_be_provided_here!",
        prod_img3: "Image_link_will_be_provided_here!",
        prod_img4: "Image_link_will_be_provided_here!",
      },
      {
        productId: 1,
        colorId: 2,
        prod_img1: "Image_link_will_be_provided_here!",
        prod_img2: "Image_link_will_be_provided_here!",
        prod_img3: "Image_link_will_be_provided_here!",
      },
      {
        productId: 3,
        colorId: 2,
        prod_img1: "Image_link_will_be_provided_here!",
        prod_img2: "Image_link_will_be_provided_here!",
        prod_img3: "Image_link_will_be_provided_here!",
        prod_img4: "Image_link_will_be_provided_here!",
      },
      {
        productId: 3,
        colorId: 4,
        prod_img1: "Image_link_will_be_provided_here!",
        prod_img2: "Image_link_will_be_provided_here!",
      },
      {
        productId: 2,
        colord: 1,
        prod_img1: "Image_link_will_be_provided_here!",
        isfeatured: true,
      },
    ]);

    await queryInterface.bulkInsert("ratings", [
      {
        userId: 1,
        productId: 1,
        indv_rating: "7.6",
        indv_comment: "So Fast, So Stylish, Just looking like a WOW!",
      },
      {
        userId: 1,
        productId: 3,
        indv_rating: "6",
        indv_comment: "Beautiful from outside! Devil from inside!!",
      },
      {
        userId: 2,
        productId: 2,
        indv_rating: "7",
        indv_comment: "Built for strong person like me!",
      },
      {
        userId: 2,
        productId: 2,
        indv_rating: "9",
        indv_comment: "Aaai!!",
      },
    ]);

    await queryInterface.bulkInsert("inventories", [
      {
        userId: 3,
        itemId: 1,
        quantity: 10,
        price: 1000,
        discounted_price: 800,
      },
      {
        userId: 3,
        itemId: 2,
        quantity: 11,
        price: 1200,
      },
      {
        userId: 3,
        itemId: 5,
        quantity: 15,
        price: 900,
        discounted_price: 800,
      },
      {
        userId: 4,
        itemId: 3,
        quantity: 10,
        price: 1000,
        discounted_price: 800,
      },
      {
        userId: 4,
        itemId: 2,
        quantity: 11,
        price: 1200,
        discounted_price: 800,
      },
      {
        userId: 4,
        itemId: 5,
        quantity: 15,
        price: 900,
      },
    ]);

    await queryInterface.bulkInsert("orders", [
      {
        userId: 1,
        order_status: 1,
      },
      {
        userId: 1,
        order_status: 1,
      },
      {
        userId: 1,
        order_status: 1,
      },
      {
        userId: 1,
        order_status: 2,
      },
      {
        userId: 2,
        order_status: 1,
      },
      {
        userId: 2,
        order_status: 3,
      },
    ]);

    await queryInterface.bulkInsert("order_item", [
      {
        orderId: 1,
        qty: 2,
        inventoryId: 1,
      },
    ]);
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
