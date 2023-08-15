import mongoose from "mongoose";

const conncetDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `MongoDB connected with server: ${data.connection.host}`.bgBrightBlue
          .black
      );
    });
};

export default conncetDatabase;
