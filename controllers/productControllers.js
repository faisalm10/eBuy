import Product from "../models/Product.js";

//@desc     Create Prodcut
//@path     /api/v1/products
//@access   Private/Admin

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      price,
      totalQty,
    } = req.body;

    const existingProduct = await Product.findOne({ name: name });
    if (existingProduct) {
      return res.json({
        message: "product fetched",
      });
    }

    const product = await Product.create({
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      price,
      totalQty,
      user: req.userId,
    });
    res.status(201).json({
      status: "success",
      message: "product created",
      product,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

//@desc     get Prodcuts
//@path     /api/v1/products
//@access   public/Admin
export const getProducts = async (req, res) => {
  try {
    // query object
    let productQuery = Product.find();

    //based on name
    if (req.query.name) {
      productQuery = productQuery.find({
        name: { $regex: req.query.name, $options: "i" },
      });
    }

    // based on colors
    if (req.query.colors) {
      productQuery = productQuery.find({ colors: req.query.colors });
    }

    // based on sizes
    if (req.query.sizes) {
      let query;
      req.query.sizes.includes(",")
        ? (query = req.query.sizes.split(","))
        : (query = [req.query.sizes]);
      productQuery = productQuery.find({
        sizes: { $all: query },
      });
    }

    // based on category
    if (req.query.category) {
      productQuery = productQuery.find({
        category: { $regex: req.query.category, $options: "i" },
      });
    }

    // based on brand
    if (req.query.brand) {
      productQuery = productQuery.find({
        brand: { $regex: req.query.brand, $options: "i" },
      });
    }

    // based on price
    if (req.query.price) {
      let range = req.query.price.split(",");
      productQuery = productQuery.find({
        price: { $gte: +range[0], $lte: +range[1] },
      });
    }

    // pagination
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 3;

    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    productQuery = productQuery.skip(startIndex).limit(endIndex);

    // defining previous and next pages
    let noOfDocuments = await Product.countDocuments();
    let pagination = {};
    if (startIndex > 0) {
      pagination.previous = page - 1;
    }
    if (endIndex < noOfDocuments) {
      pagination.next = page + 1;
    }

    //getting results by resolving query
    let products = await productQuery;

    res.status(201).json({
      status: "success",
      message: "products fetched succesfully",
      products,
      count: products.length,
      pagination,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

//@desc     get Prodcuts
//@path     /api/v1/products
//@access   public/Admin
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(201).json({
      status: "success",
      message: "product fetched succesfully ",
      product,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

//@desc     update Prodcut
//@path     /api/v1/products
//@access   private/Admin
export const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json({
      status: "success",
      message: "product updated succesfully ",
      updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

//@desc     delete Prodcuts
//@path     /api/v1/products
//@access   private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      message: "product deleted succesfully ",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
