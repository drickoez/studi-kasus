const { Schema, model } = require("mongoose");

const deliveryAddressSchema = Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama alamat harus diisi"],
      maxLength: [255, "Panjang maksimal alamat adalah 255 karakter"],
    },
    kelurahan: {
      type: String,
      required: [true, "Nama alamat harus diisi"],
      maxLength: [255, "Panjang maksimal alamat adalah 255 karakter"],
    },
    kecamatan: {
      type: String,
      required: [true, "Nama alamat harus diisi"],
      maxLength: [255, "Panjang maksimal alamat adalah 255 karakter"],
    },
    kabupaten: {
      type: String,
      required: [true, "Nama alamat harus diisi"],
      maxLength: [255, "Panjang maksimal alamat adalah 255 karakter"],
    },
    provinsi: {
      type: String,
      required: [true, "Nama alamat harus diisi"],
      maxLength: [255, "Panjang maksimal alamat adalah 255 karakter"],
    },
    detail: {
      type: String,
      required: [true, "Nama alamat harus diisi"],
      maxLength: [1000, "Panjang maksimal alamat adalah 1000 karakter"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("DeliveryAddress", deliveryAddressSchema);
