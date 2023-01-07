// /* eslint-disable prettier/prettier */
// import { Module } from "@nestjs/common"
// import { ConfigService } from "@nestjs/config"
// import { JwtModule } from "@nestjs/jwt"
// import { MongooseModule } from "@nestjs/mongoose"
// import { PassportModule } from "@nestjs/passport"

// import { AuthController } from "../Authentication/auth.controller"
// import { AuthService } from "../Authentication/auth.service"
// import { JwtStrategy } from "../Authentication/jwt.strategy"
// import { userSchema } from "../Authentication/Schemas/user.schema"

// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: "jwt" }),
//     JwtModule.registerAsync({
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => {
//         return {
//           secret: config.get<string>("JWT_SECRET"),
//           signOptions: {
//             expiresIn: config.get<string | number>('JWT_EXPIRES')
//           }
//         }
//       }
//     }),
//     MongooseModule.forFeature([{ name: "User", schema: userSchema }])
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy],
//   exports: [JwtStrategy, PassportModule]
// })
// export class AuthModule{}