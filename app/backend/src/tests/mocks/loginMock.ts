import User from "../../database/models/UserModel"

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

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODA2MzUwODcsImV4cCI6MTY4MDgwNzg4N30.ocIqClO-PRbIcnc-HXScjVJhwdyEPpMbvQar0m4k3Eg';


export const user = {
  id: 1,
  username: "User",
  email: "user@user.com",
  password: "secret_user",
  role: "user"
} as User;
