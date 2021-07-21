const knex = require("./db-connector");
const { orderBy } = require("./db-connector");

module.exports = {

  insert_new_product: function (data) {
    return new Promise(function (resolve, reject) {
      knex('products')
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



/////////////////////////////////////////////////////


  get_all_location_names: function (national_park) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("view_alllocations")
        .where({ parkid: national_park })
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          //console.log(err);
          reject(err);
        });
    });
  },

  list_leopards_for_filter: function (filters) {
    return new Promise(function (resolve, reject) {
      knex
        .select("officialnamecode", "nickname", "gender", "leopard_id", "last_seen_date")
        .from("view_combinedsearchdatawithlocations")
        .where(filters["filters"])
        .groupBy("officialnamecode")
        .orderBy("officialnamecode")
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
         // console.log(err);
          reject(err);
        });
    });
  },

  list_leopards_for_searchquery: function (query) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("view_combinedsearchdata")
        .where(function () {
          this.where(
            "nickname",
            "like",
            "%" + query["searchquery"] + "%"
          ).orWhere(
            "officialnamecode",
            "like",
            "%" + query["searchquery"] + "%"
          );
        })
        .andWhere("park_id", "=", query["park_id"])
        .orderBy("officialnamecode")
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          //console.log(err);
          reject(err);
        });
    });
  },

  get_territory_for_leopard: function (leopardcode) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("view_getleopoardterritories")
        .where({ officialnamecode: leopardcode })
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
         // console.log(err);
          reject(err);
        });
    });
  },

  get_mata_information_for_leopard: function (leopardcode) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("view_iniitalleoparddata")
        .where({ officialnamecode: leopardcode })
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
        //  console.log(err);
          reject(err);
        });
    });
  },

  get_all_leopard_territory_coordinates: function (nationalpark) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("view_getleopoardterritories")
        .where({ parkid: nationalpark })
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
         // console.log(err);
          reject(err);
        });
    });
  },

  get_seen_areas_for_leopard: function (leopardcode) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("view_seenareamaps")
        .where({ officialnamecode: leopardcode })
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
         // console.log(err);
          reject(err);
        });
    });
  },

  get_all_locaton_coordinates: function (nationalpark) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from("view_locationcooordinates")
        .where({ parkid: nationalpark })
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
       //   console.log(err);
          reject(err);
        });
    });
  },

  get_ancestory_for_leopard: function (leopardid) {
    return new Promise(function (resolve, reject) {
      var topmostParentID = null;
      knex
        .raw("call proc_getleopardfamilytree(?)", [leopardid])
        .then((rows) => {
          // console.log("%%%% ALL ROWs : " + JSON.stringify(rows[0][0]))
          var rowsIter = rows[0][0];
          for (var i = 0; i < rowsIter.length; i++) {
            var row = rowsIter[i];
            // console.log("%%%% Iter 1 , ROW : " + JSON.stringify(row))
            if (row.mother == null) {
              topmostParentID = row.leopard_id;
              break;
            }
          }
          // console.log("#@#@#@ TOPMOST ID 111 : " + topmostParentID)
        })
        .then(() => {
          // console.log("#@#@#@ TO{MOST ID : " + topmostParentID)
          knex
            .raw("call proc_getleopardfamilytree(?)", [topmostParentID])
            .then((rows2) => {
              //resolve(rows[0][0]);
              var rowsIter = rows2[0][0];
              for (var i = 0; i < rowsIter.length; i++) {
                var row = rowsIter[i];
                if (row.leopard_id == leopardid) {
                  row.target = true;
                  break;
                }
              }
              resolve(rowsIter);
            })
            .catch((err) => {
              //(err);
              reject(err);
            });
        })
        .catch((err) => {
          //console.log(err);
          reject(err);
        });
    });
  },
  get_all_females: function (national_park) {
    return new Promise(function (resolve, reject) {
      knex
        .select("officialnamecode", "nickname", "leopard_id")
        .from("leopards")
        .where({ gender: "Female", nationalpark: national_park })
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          //console.log(err);
          reject(err);
        });
    });
  },

  insert_new_leopard: function (data) {
    return new Promise(function (resolve, reject) {
      knex("leopards")
        .insert(data)
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
         // console.log(err);
          reject(err);
        });
    });
  },

  insert_new_leopard_zone: function (data) {
    return new Promise(function (resolve, reject) {
      knex("frequently_seen_areas")
        .insert(data)
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
          //console.log(err);
          reject(err);
        });
    });
  },

  insert_new_leopard_seanAreas: function (data) {
    //("*********" + data);
    return new Promise(function (resolve, reject) {
      knex("frequent_location_leopard_mapping")
        .insert(data)
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => {
         // console.log(err);
          reject(err);
        });
    });
  },
};
