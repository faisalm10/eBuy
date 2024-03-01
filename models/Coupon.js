import { Schema, model } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, //when we just want to read tthe code
    toObject: { virtuals: true }, //when we want to work with code
  }
);

// coupon expiary date

couponSchema.virtual("isExpired").get(function () {
  return this.endDate < Date.now();
});

// days left for coupon expiary
couponSchema.virtual("daysLeft").get(function () {
  const daysLeft = this.endDate - Date.now();
  return Math.ceil(daysLeft / (1000 * 60 * 60 * 24));
});

// varifing startdate is greather than today
couponSchema.pre("validate", function (next) {
  if (this.startDate < Date.now()) {
    throw new Error("start date should be greater than today");
  }
  next();
});

// varifing endDate is greather than today
couponSchema.pre("validate", function (next) {
  if (this.endDate < Date.now()) {
    throw new Error("end date should be greater than today");
  }
  next();
});

// varifing weather start date is lesser than end date
couponSchema.pre("validate", function (next) {
  if (this.startDate > this.endDate) {
    throw new Error("startDAte should be lesser than end date");
  }
  next();
});

const Coupon = model("Coupon", couponSchema);

export default Coupon;
