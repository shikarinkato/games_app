import mongoose from "mongoose";

export const connectToMongo = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    })
    .then((res) => {
      console.log(`Database Connected Succesfully `);
    })
    .catch((err) => {
      console.log("Failed to Connect Database"+err);
    });
};
