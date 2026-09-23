import dotenv from 'dotenv';
import request from 'supertest';

dotenv.config({ quiet: true });

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export default function api() {
  return request(BASE_URL);
}
