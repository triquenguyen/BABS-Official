export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/atm/dashboard", "/atm/pincode"] }