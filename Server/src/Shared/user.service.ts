/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { LoginDTO, RegisterDTO } from "../Auth/auth.dto"
import * as bcrypt from "bcrypt"
import { User } from "src/Types/user.types";

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) { }

  async create(userDTO: RegisterDTO): Promise<User> {
    const { email, name, password } = userDTO;
    if (!email || !name || !password) {
      throw new HttpException("All Fields are required", HttpStatus.UNAUTHORIZED)
    }
    const user = await this.userModel.findOne({ email })
    if (user) {
      throw new HttpException("User Already Exists", HttpStatus.BAD_REQUEST)
    }
    const userName = await this.userModel.findOne({ name });
    if (userName) {
      throw new HttpException("UserName Already Taken", HttpStatus.BAD_REQUEST)

    }
    const createdUser = new this.userModel(userDTO);
    await createdUser.save()
    return createdUser
  }



  async findByLogin(userDTO: LoginDTO): Promise<User> {
    const { email, password } = userDTO;
    if (!email || !password) {
      throw new HttpException("All Fields are required", HttpStatus.UNAUTHORIZED)
    }
    const user = await this.userModel.findOne({ email }).select("+password")

    if (!user) {
      throw new HttpException("Invalid Credential", HttpStatus.UNAUTHORIZED)
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new HttpException("Unathorized User", HttpStatus.UNAUTHORIZED)
    }
    return user

  }


  async findByPayload(payload: any) {
    const { email } = payload
    const user = await this.userModel.findOne({ email });
    return user;
  }

}