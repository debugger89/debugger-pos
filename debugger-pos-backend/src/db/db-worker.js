const knex = require("./db-connector");
const { orderBy } = require("./db-connector");

module.exports = {
  upsert_products: function (data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
      knex("products")
        .insert(data)
        .onConflict("prodid")
        .merge()
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  get_all_products: function () {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("view_productstocks")
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  get_product: function (data) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("view_productstocks")
        .where(data)
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  upsert_stocks: function (data) {
    return new Promise(function (resolve, reject) {
      console.log(data);
      var sql = knex("stocks").insert(data).onConflict("productid").merge();
      console.log(sql.toString());
      sql
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  insert_sale: function (data) {
    return new Promise(function (resolve, reject) {
      knex("sales")
        .insert(data)
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  insert_sale_items: function (data) {
    return new Promise(function (resolve, reject) {
      knex("sale_items")
        .insert(data)
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  update_sale_stocks: function (itemData) {
    return new Promise(function (resolve, reject) {
      console.log("Updating Stocks: ");
      console.log(itemData);
      itemData.forEach(function (item, index) {
        knex("stocks")
          .update({
            quantity: knex.raw("?? - " + item.units, ["quantity"]),
          })
          .where("productid", item.productid)
          .then((rows) => {
            resolve(rows);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  },

  get_all_sales: function () {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("sales")
        .orderBy("saledate", "desc")
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  get_filtered_sales: function (data) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("sales")
        .whereBetween("saledate", [
          data.fromDate + " 00:00:00",
          data.toDate + " 23:59:59",
        ])
        .orderBy("saledate", "asc")
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  get_sale_items: function (data) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("view_saleitems")
        .where(data)
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  get_sale_stats: function (data) {
    console.log("Get stats for " + JSON.stringify(data));
    return new Promise(function (resolve, reject) {
      var sql = knex
        .select()
        .from("view_saleitems")
        .whereBetween("saledate", [
          data.fromDate + " 00:00:00",
          data.toDate + " 23:59:59",
        ]);
      console.log("Generated SQL : " + sql.toString());
      sql
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  /////////////////////////////////////////////////////
};
