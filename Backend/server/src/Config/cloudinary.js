const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dvltrzed6",
  api_key: "834233883162856",
  api_secret: "tOT4c9nH-Z5hjCMrL_3Jmx-N2rc", // Click 'View Credentials' below to copy your API secret
});

const uploadCloudinary = async (localPath) => {
  try {
    if (!localPath) console.log("hii");
    console.log(localPath);
    const res = await cloudinary.uploader.upload(localPath, {
      resource_type: "image",
    });

    return res;
  } catch (error) {
    fs.unlinkSync(localPath);
    console.log(error);
  }
};

module.exports = uploadCloudinary;
