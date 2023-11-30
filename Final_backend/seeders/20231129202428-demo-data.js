"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("addresses", [
      {
        addressId: 1,
        addressLine1: "Swimming Pool, Siddhakali chowk",
        addressLine2: "Bikash Marga Loop(Kha), Siddhakali chowk",
        city: "Dharan",
        districtId: 71,
      },
      {
        addressId: 2,
        addressLine1: "Naya thimi",
        city: "Bhaktapur",
        districtId: 10,
      },
      {
        addressId: 3,
        addressLine1: "Pulchowk, way to jhamsikhel",
        city: "lalitpur",
        districtId: 38,
      },
    ]);

    await queryInterface.bulkInsert("users", [
      {
        userId: 1,
        email: "sunil@gmail.com",
        userName: "Sunil Tajpuriya",
        pwdHash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        defaultAddress: 1,
        userRole: 1,
        joinedAt: new Date(),
      },
      {
        userId: 2,
        email: "hemlal@gmail.com",
        userName: "Hemlal Dulal",
        pwdHash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        userRole: 1,
        joinedAt: new Date(),
      },
      {
        userId: 3,
        email: "pagoda@gmail.com",
        userName: "Pagoda Enterprises",
        pwdHash: "abcedexosujlsj-@generatedbywriting-123lsjes.",
        defaultAddress: 2,
        userRole: 2,
        joinedAt: new Date(),
      },
      {
        userId: 4,
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
        productId: 1,
        productName: "KTM Duke 200",
        companyId: 11,
        catId: 3,
        productDes: "Sports bike, most preferable for youth.",
        overallRating: 8.6,
        mileage: "28 KM",
      },
      {
        productId: 2,
        productName: "Royal Enfield 250",
        companyId: 12,
        catId: 2,
        productDes:
          "Bike with classic looks! Build with Iron not from plastic.",
        overallRating: 8.6,
        mileage: "27 KM",
      },
      {
        productId: 3,
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
        colorId: 1,
        color: "Silver",
        hex: "001b32",
      },
      { colorId: 2, color: "White", hex: "001a23" },
      {
        colorId: 3,
        color: "orange",
        hex: "001c21",
      },
      {
        colorId: 4,
        color: "black",
        hex: "101b32",
      },
    ]);

    await queryInterface.bulkInsert("product_items", [
      {
        itemId: 1,
        productId: 1,
        colorId: 3,
        prod_img1: "Image_link_will_be_provided_here!",
        prod_img2: "Image_link_will_be_provided_here!",
        prod_img3: "Image_link_will_be_provided_here!",
        prod_img4: "Image_link_will_be_provided_here!",
        isfeatured: true,
      },
      {
        itemId: 2,
        productId: 1,
        colorId: 2,
        prod_img1: "Image_link_will_be_provided_here!",
        prod_img2: "Image_link_will_be_provided_here!",
        prod_img3: "Image_link_will_be_provided_here!",
        isfeatured: false,
      },
      {
        itemId: 3,
        productId: 3,
        colorId: 2,
        prod_img1: "Image_link_will_be_provided_here!",
        prod_img2: "Image_link_will_be_provided_here!",
        prod_img3: "Image_link_will_be_provided_here!",
        prod_img4: "Image_link_will_be_provided_here!",
        isfeatured: false,
      },
      {
        itemId: 4,
        productId: 3,
        colorId: 4,
        prod_img1: "Image_link_will_be_provided_here!",
        prod_img2: "Image_link_will_be_provided_here!",
        isfeatured: false,
      },
      {
        itemId: 5,
        productId: 2,
        colorId: 1,
        prod_img1: "Image_link_will_be_provided_here!",
        isfeatured: true,
      },
    ]);

    await queryInterface.bulkInsert("ratings", [
      {
        ratingId: 1,
        userId: 1,
        productId: 1,
        indv_rating: 5,
        indv_comment: "So Fast, So Stylish, Just looking like a WOW!",
        updatedAt: new Date(),
      },
      {
        ratingId: 2,
        userId: 1,
        productId: 3,
        indv_rating: 4,
        indv_comment: "Beautiful from outside! Devil from inside!!",
        updatedAt: new Date(),
      },
      {
        ratingId: 3,
        userId: 2,
        productId: 2,
        indv_rating: 5,
        indv_comment: "Built for strong person like me!",
        updatedAt: new Date(),
      },
      {
        ratingId: 4,
        userId: 2,
        productId: 1,
        indv_rating: 3.3,
        indv_comment: "Aaai!!",
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("inventories", [
      {
        inventoryId: 1,
        userId: 3,
        itemId: 1,
        quantity: 10,
        price: 1000,
        discounted_price: 800,
      },
      {
        inventoryId: 2,
        userId: 3,
        itemId: 2,
        quantity: 11,
        price: 1200,
      },
      {
        inventoryId: 3,
        userId: 3,
        itemId: 5,
        quantity: 15,
        price: 900,
        discounted_price: 800,
      },
      {
        inventoryId: 4,
        userId: 4,
        itemId: 3,
        quantity: 10,
        price: 1000,
        discounted_price: 800,
      },
      {
        inventoryId: 5,
        userId: 4,
        itemId: 2,
        quantity: 11,
        price: 1200,
        discounted_price: 800,
      },
      {
        inventoryId: 6,
        userId: 4,
        itemId: 5,
        quantity: 15,
        price: 900,
      },
    ]);

    await queryInterface.bulkInsert("orders", [
      {
        orderId: 1,
        userId: 1,
        order_status: 1,
        sub_total: 8,
        order_placed: new Date(),
      },
      {
        orderId: 2,
        userId: 1,
        order_status: 1,
        sub_total: 8,
        order_placed: new Date(),
      },
      {
        orderId: 3,
        userId: 1,
        order_status: 1,
        sub_total: 8,
        order_placed: new Date(),
      },
      {
        orderId: 4,
        userId: 1,
        order_status: 2,
        sub_total: 8,
        order_placed: new Date(),
      },
      {
        orderId: 5,
        userId: 2,
        order_status: 1,
        sub_total: 8,
        order_placed: new Date(),
      },
      {
        orderId: 6,
        userId: 2,
        order_status: 3,
        sub_total: 8,
        order_placed: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("order_item", [
      {
        orderItemId: 1,
        orderId: 1,
        qty: 2,
        price: 10000,
        inventoryId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove data from order_item table
    await queryInterface.bulkDelete("order_item", null, {});

    // Remove data from orders table
    await queryInterface.bulkDelete("orders", null, {});

    // Remove data from inventories table
    await queryInterface.bulkDelete("inventories", null, {});

    // Remove data from ratings table
    await queryInterface.bulkDelete("ratings", null, {});

    // Remove data from product_items table
    await queryInterface.bulkDelete("product_items", null, {});

    // Remove data from colors table
    await queryInterface.bulkDelete("colors", null, {});

    // Remove data from products table
    await queryInterface.bulkDelete("products", null, {});

    // Truncate the users table
    await queryInterface.bulkDelete("users", null, {});
  },
};
