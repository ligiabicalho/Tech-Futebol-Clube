import User from "../../database/models/UserModel"
import { IUser } from "../../interfaces/IUser"
export const adminValid = {
  email: "admin@admin.com",
  password: "secret_admin"
}

export const userValid = {
  email: "user@user.com",
  password: "secret_user"
}

export const adminInvalid = {
  email: "admin@admin.com",
  password: "senha_invalida" 
}

export const userInvalid = {
  email: "user@.com",
  password: "senha_invalida" 
}

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJfcHJldmlvdXNEYXRhVmFsdWVzIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJ1bmlxbm8iOjEsIl9jaGFuZ2VkIjp7fSwiX29wdGlvbnMiOnsiaXNOZXdSZWNvcmQiOmZhbHNlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIiwicmF3Ijp0cnVlLCJhdHRyaWJ1dGVzIjpbImlkIiwidXNlcm5hbWUiLCJyb2xlIiwiZW1haWwiLCJwYXNzd29yZCJdfSwiaXNOZXdSZWNvcmQiOmZhbHNlLCJpYXQiOjE2Nzk1MjQwMjIsImV4cCI6MTY3OTUyNzYyMn0.-Arx7Og4eNHF8Fw-VL5XhmElyWlTiCsBPPEHK3qmr1w';

export const user = {
  id: 1,
  username: "User",
  email: "user@user.com",
  password: "secret_user",
  role: "user"
} as User;
