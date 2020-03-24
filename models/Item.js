class Item {
  constructor(
    id,
    name,
    description,
    sold,
    category,
    price,
    listedAt,
    expires,
    condition,
    picture,
    sellerId,
    seller
  ) {
    this.item = {
      id,
      name,
      description,
      category,
      price,
      condition,
      sold,
      listedAt,
      expires,
      pictureURL: picture
    };
    this.seller = {
      id: sellerId,
      name: seller
    };
    // this.id = id;
    // this.name = name;
    // this.seller = seller;
    // this.description = description;
    // this.category = category;
    // this.price = price;
    // this.condition = condition;
    // this.sold = sold;
    // this.listedAt = listedAt;
    // this.expires = expires;
    // this.pictureURL = picture;
  }
}

module.exports = Item;
