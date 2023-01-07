// /* eslint-disable prettier/prettier */

// import { Injectable, ConflictException, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common"
// import { InjectModel } from "@nestjs/mongoose"
// import { Error, Model } from "mongoose"
// import { LoginDTO, RegisterDTO } from "../Authentication/Dto/auth.dto"
// import { User } from "../Authentication/Schemas/user.schema"
// import * as bcrypt from "bcryptjs"
// import { JwtService } from "@nestjs/jwt"
// import APIFeatures from "../Utils/auth"
// import { throws } from "assert"

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User.name)
//     private userModel: Model<User>,
//     private jwtService: JwtService
//   ) { }

//   // Register User
//   async signUp(signUpDto: RegisterDTO): Promise<{ token: string }> {
//     const { name, email, password } = signUpDto
//     if (!name || !email || !password) {
//       // throw new Error
//       throw new HttpException({
//         status: HttpStatus.FORBIDDEN,
//         error: "All Fields are required"
//       }, HttpStatus.FORBIDDEN, {
//         cause: new Error("All fields are Required")
//       })

//     }
//     const salt = await bcrypt.genSaltSync(10)
//     const hashPassword = await bcrypt.hash(password, salt);
//     console.log(password);

//     const userAlreadyAvailable = await this.userModel.findOne({ email })
//     if (userAlreadyAvailable) {
//       throw new HttpException({
//         status: HttpStatus.FORBIDDEN,
//         error: "User Already Registered"
//       }, HttpStatus.FORBIDDEN, {
//         cause: new Error("User is already registered")
//       })
//     }
//     const user = await this.userModel.create({ name, email, password: hashPassword })

//     console.log(user, "HHHH")
//     const token = await APIFeatures.assignJwtToken(user._id, this.jwtService)

//     console.log(token)
//     return { token }

//     // try {

//     // } catch (error) {
//     //   if (error.code === 11000) {
//     //     throw new ConflictException('Duplicate Email entered.');
//     //   }
//     // }
//   }

//   async loginUser(loginDto: LoginDTO): Promise<{ token: string }> {
//     const { email, password } = loginDto;
//     const user = await this.userModel.findOne({ email }).select("+password")
//     if (!user) {
//       throw new UnauthorizedException('Invalid Email or Password')
//     }

//     const checkPassword = await bcrypt.compare(password, user.password)

//     if (!checkPassword) {
//       throw new UnauthorizedException("Invalid Email or Password")
//     }
//     const token = await APIFeatures.assignJwtToken(user._id, this.jwtService)

//     return { token }
//   }
// }

