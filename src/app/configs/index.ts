import dotenv from 'dotenv'
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    db_url: process.env.DB_URL,
    salt_rounds: process.env.BCRYPT_SALTROUND,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET_KEY,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    reset_token_secret: process.env.RESET_TOKEN_SECRET_KEY,
    access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
    reset_token_expires_in: process.env.RESET_TOKEN_EXPIRES_IN,
}