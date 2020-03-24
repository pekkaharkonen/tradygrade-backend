const pool = require('./poolConnection');
const Item = require('../models/Item');

exports.getItems = async () => {
  try {
    let response = await pool.query(
      'SELECT item_id, item_name, item_description, item_sold, item_category, item_price, item_listed_at, item_expires, item_condition, item_picture, item_seller_id, user_name FROM item JOIN users ON item_seller_id = user_id'
    );
    let items = [];
    for (let row of response.rows) {
      let item = new Item(
        row.item_id,
        row.item_name,
        row.item_description,
        row.item_sold,
        row.item_category,
        row.item_price,
        row.item_listed_at,
        row.item_expires,
        row.item_condition,
        row.item_picture,
        row.item_seller_id,
        row.user_name
      );
      items = [...items, item];
    }
    return items;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
exports.getItem = async id => {
  try {
    let response = await pool.query(
      'SELECT item_id, item_name, item_description, item_sold, item_category, item_price, item_listed_at, item_expires, item_condition, item_picture, item_seller_id, user_name FROM item JOIN users ON item_seller_id = user_id WHERE item_id=$1',
      [id]
    );
    let item = new Item(
      response.rows[0].item_id,
      response.rows[0].item_name,
      response.rows[0].item_description,
      response.rows[0].item_sold,
      response.rows[0].item_category,
      response.rows[0].item_price,
      response.rows[0].item_listed_at,
      response.rows[0].item_expires,
      response.rows[0].item_condition,
      response.rows[0].item_picture,
      response.rows[0].item_seller_id,
      response.rows[0].user_name
    );
    return item;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
exports.updateItem = async (id, item) => {
  try {
    const {
      name,
      description,
      sold,
      sellerId,
      category,
      price,
      listedAt,
      expires,
      condition,
      pictureURL
    } = item;

    let response = await pool.query(
      'UPDATE item SET item_name=$1, item_description=$2, item_sold=$3, item_seller_id=$4, item_category=$5, item_price=$6, item_listed_at=$7, item_expires=$8, item_condition=$9, item_picture=$10 WHERE item_id=$11',
      [
        name,
        description,
        sold,
        sellerId,
        category,
        price,
        listedAt,
        expires,
        condition,
        pictureURL,
        id
      ]
    );
    return response.rows;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
exports.createItem = async item => {
  try {
    const {
      name,
      description,
      sold,
      sellerId,
      category,
      price,
      listedAt,
      expires,
      condition,
      pictureURL
    } = item;

    let response = await pool.query(
      'INSERT INTO item (item_name, item_description, item_sold, item_seller_id, item_category, item_price, item_listed_at, item_expires, item_condition, item_picture ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        name,
        description,
        sold,
        sellerId,
        category,
        price,
        listedAt,
        expires,
        condition,
        pictureURL
      ]
    );
    return response.rows;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
exports.deleteItem = async id => {
  try {
    let response = await pool.query('DELETE from item WHERE item_id=$1', [id]);
    return response.rows;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
