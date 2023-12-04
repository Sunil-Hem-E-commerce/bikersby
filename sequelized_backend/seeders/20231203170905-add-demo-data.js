"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Addresses", [
      {
        address_line: "Swimming Pool, Siddhakali chowk",
        city: "Dharan",
        municipal: "Dharan",
        district_id: 71,
      },
      {
        address_line: "Naya thimi",
        city: "",
        municipal: "Bhaktapur",
        district_id: 10,
      },
      {
        address_line: "Machindra Marga",
        city: "Pulchowk",
        municipal: "Lalitpur",
        district_id: 38,
      },
    ]);

    await queryInterface.bulkInsert("Users", [
      {
        user_email: "sunil@gmail.com",
        user_name: "Sunil Tajpuriya",
        pwd_hash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        address_id: 1,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_email: "hemlal@gmail.com",
        user_name: "Hemlal Dulal",
        pwd_hash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_email: "pagoda@gmail.com",
        user_name: "Pagoda Enterprises",
        pwd_hash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        address_id: 2,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_email: "xbshowroom@gmail.com",
        user_name: "XB bike house",
        pwd_hash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        address_id: 3,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Products", [
      {
        product_name: "KTM Duke 200",
        company_id: 11,
        category_id: 3,
        product_des: "Sports bike, most preferable for youth.",
        overall_rating: 8.6,
        mileage: "28 KM",
      },
      {
        product_name: "Royal Enfield 250",
        company_id: 12,
        category_id: 2,
        product_des:
          "Bike with classic looks! Build with Iron not from plastic.",
        overall_rating: 8.6,
        mileage: "27 KM",
      },
      {
        product_name: "Bajaj NS 200",
        company_id: 2,
        category_id: 3,
        product_des:
          "Sports bike, most preferable for youth in affordable price",
        overall_rating: 9,
        mileage: "34 KM",
      },
    ]);

    await queryInterface.bulkInsert("Colors", [
      {
        product_color: "Silver",
        color_hex: "001b32",
      },
      { product_color: "White", color_hex: "001a23" },
      {
        product_color: "orange",
        color_hex: "001c21",
      },
      {
        product_color: "black",
        color_hex: "101b32",
      },
    ]);

    await queryInterface.bulkInsert("Product_types", [
      {
        product_id: 1,
        color_id: 3,
        img1: "Image_link_will_be_provided_here!",
        img2: "Image_link_will_be_provided_here!",
        img3: "Image_link_will_be_provided_here!",
        img4: "Image_link_will_be_provided_here!",
        is_featured: true,
      },
      {
        product_id: 1,
        color_id: 2,
        img1: "Image_link_will_be_provided_here!",
        img2: "Image_link_will_be_provided_here!",
        img3: "Image_link_will_be_provided_here!",
        is_featured: false,
      },
      {
        product_id: 3,
        color_id: 2,
        img1: "Image_link_will_be_provided_here!",
        img2: "Image_link_will_be_provided_here!",
        img3: "Image_link_will_be_provided_here!",
        img4: "Image_link_will_be_provided_here!",
        is_featured: false,
      },
      {
        product_id: 3,
        color_id: 4,
        img1: "Image_link_will_be_provided_here!",
        img2: "Image_link_will_be_provided_here!",
        is_featured: false,
      },
      {
        product_id: 2,
        color_id: 1,
        img1: "Image_link_will_be_provided_here!",
        is_featured: true,
      },
    ]);

    await queryInterface.bulkInsert("Ratings", [
      {
        user_id: 1,
        product_id: 1,
        rating: 5,
        comment: "So Fast, So Stylish, Just looking like a WOW!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        product_id: 3,
        rating: 4,
        comment: "Beautiful from outside! Devil from inside!!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        product_id: 2,
        rating: 5,
        comment: "Built for strong person like me!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        product_id: 1,
        rating: 3.3,
        comment: "Aaai!!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Inventories", [
      {
        user_id: 3,
        type_id: 1,
        qty: 10,
        price: 1000,
        discounted_price: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        type_id: 2,
        qty: 11,
        price: 1200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        type_id: 5,
        qty: 15,
        price: 900,
        discounted_price: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        type_id: 3,
        qty: 10,
        price: 1000,
        discounted_price: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        type_id: 2,
        qty: 11,
        price: 1200,
        discounted_price: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        type_id: 5,
        qty: 15,
        price: 900,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Orders", [
      {
        user_id: 1,
        status_id: 1,
        order_total: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        status_id: 1,
        order_total: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        status_id: 1,
        order_total: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        status_id: 2,
        order_total: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        status_id: 1,
        order_total: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        status_id: 3,
        order_total: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Order_items", [
      {
        order_id: 1,
        inventory_id: 1,
        order_qty: 2,
        subtotal: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Colors", null, {});
    await queryInterface.bulkDelete("Product_types", null, {});
    await queryInterface.bulkDelete("Ratings", null, {});
    await queryInterface.bulkDelete("Inventories", null, {});
    await queryInterface.bulkDelete("Orders", null, {});
    await queryInterface.bulkDelete("Order_items", null, {});
  },
};
