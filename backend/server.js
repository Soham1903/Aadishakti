import app from "./app.js";
app.listen(process.env.PORT || 4000, () => {
  console.log("Server listening on port " + process.env.PORT);
});
