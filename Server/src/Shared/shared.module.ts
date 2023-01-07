/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"
import { userSchema } from "../Models/user.schema"
import { UserService } from "../Shared/user.service"

@Module({
  imports: [MongooseModule.forFeature([{
    name: "User",
    schema: userSchema
  }])],
  providers: [UserService],
  exports: [UserService]
})

export class SharedModule { }