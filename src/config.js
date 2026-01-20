import dotenv from "dotenv";
dotenv.config();
const config = {
  dbUrl: process.env.DB_URL,
  serverPort: process.env.SERVER_PORT || 3000,
};
if (!config.dbUrl) {
  console.error("DB_URL is missing in .env file");
  process.exit(1);
}

export default config;
