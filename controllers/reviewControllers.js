import expressAsyncHandler from 'express-async-handler';
import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc   Create Review
// @route  POST /api/v1/reviews
// @access Private/Admin

export const postReview = expressAsyncHandler(async (req, res) => {
  const productId = req.params.productId
  //find product
  const productFound = await Product.findById(productId).populate('reviews');
  if (!productFound) {
    throw new Error('Product not Found');
  }
  //checking if the user has already reviewed the product
  let hasReviewed = productFound?.reviews.find((review) => {
    return review?.user?.toString() === req?.userId.toString();
  });
  if (hasReviewed) {
    throw new Error('product has been reviewed by you');
  }
  //create review
  const review = await Review.create({
    user: req.userId,
    product: productFound?._id,
    message: req.body.message,
    rating: req.body.rating,
  });
  //push the reviews to product
  productFound.reviews.push(review?._id);
  //re save
  await productFound.save();
  res.status(201).json({
    status: 'Success',
    message: 'Successfully added reviews',
    review
  });
});

export const getReviewsOfProduct = expressAsyncHandler(async (req, res) => {
  const productId = req.params.productId
  //find product
  const productFound = await Product.findOne({_id:productId}).populate('reviews')
  const reviews=productFound.reviews
  
  res.status(201).json({
    status: 'Success',
    message: 'Fetched review successfully',
    reviews
  });
});

export const deleteReviewOfPorduct = expressAsyncHandler(async (req,res)=>{
  let reviewId = req.params.reviewId

  await Review.findByIdAndDelete(reviewId)

  res.status(201).json({
    status:"Success",
    message:"Review deleted succesfully"
  })
})
