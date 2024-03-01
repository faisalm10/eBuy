import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Category from "../models/Categoty.js";
import Brand from "../models/Brand.js";

//@desc     Create Prodcut
//@path     /api/v1/products
//@access   Private/Admin

export const createProduct = expressAsyncHandler(async (req, res) => {
  
  const { name, description, brand, category, sizes, colors, price, totalQty } =
    req.body;


  const existingProduct = await Product.findOne({ name: name });
  if (existingProduct) {
    throw new Error("product already exists");
  }

  // checking for he category
  const categoryFound = await Category.findOne({ name: category });
  if (!categoryFound) {
    throw new Error(
      "category not found, please fisrt cheack category name or create category"
    );
  }

  // / checking for the brand
  const brandFound = await Brand.findOne({ name: brand });
  if (!brandFound) {
    throw new Error(
      "brand not found, please fisrt cheack brand name or create brand"
    );
  }

  const newProduct = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    price,
    totalQty,
    user:req.userId,
    images:req.files
  });

  // push product into category
  categoryFound.products.push(newProduct._id);
  // resave
  await categoryFound.save();

  // / push product into brand
  brandFound.products.push(newProduct._id);
  // resave
  await brandFound.save();

  res.status(201).json({
    status: "success",
    message: "product created",
    newProduct,
  });
});

//@desc     get Prodcuts
//@path     /api/v1/products
//@access   public/Admin
export const getProducts = expressAsyncHandler(async (req, res) => {
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
});

//@desc     get Prodcuts
//@path     /api/v1/products
//@access   public/Admin
export const getProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "product fetched succesfully ",
    product,
  });
});

//@desc     update Prodcut
//@path     /api/v1/products
//@access   private/Admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
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
});

//@desc     delete Prodcuts
//@path     /api/v1/products
//@access   private/Admin
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "product deleted succesfully ",
  });
});
