// # register
type Role = "coach" | "student"

export type Tregister = {
 name : string
 email : string
 password : string
 confirmPassword : string
 role : Role
}

export type Tlogin = {
    email : string,
    password : string
}
