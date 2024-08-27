const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Map the '@' to 'src'
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  // Other configurations...
};
