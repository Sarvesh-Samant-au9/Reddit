// /* eslint-disable prettier/prettier */
// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Document } from "mongoose"

// @Schema({
//   timestamps: true
// })

// @Schema()
// class KarmaPoints {
//   @Prop({
//     type: Number,
//     default: 0
//   })
//   postKarma: number

//   @Prop({
//     type: Number,
//     default: 0
//   })
//   commentKarma: number
// }


// @Schema()
// class NestedExist {
//   @Prop({
//     type: Boolean,
//     default: false
//   })
//   exists: boolean;

//   @Prop({
//     type: String,
//     trim: true,
//     default: 'null',
//   })
//   imageLink: string;

//   @Prop({
//     type: String,
//     trim: true,
//     default: 'null',
//   })
//   imageId: string

// }

// export class User extends Document {
//   @Prop({
//     minlength: 4,
//     maxlength: 20,
//     trim: true,
//     required: [true, "name is required"],
//     type: String
//   })
//   username: string;

//   @Prop({
//     unique: [true, "Email address is already registered"],
//     required: [true, "Email is required"],
//   })
//   email: string;

//   @Prop({
//     select: false,
//     required: true
//   })
//   password: string;

//   // @Prop({
//   //   type: NestedExist
//   // })
//   // avatar: NestedExist

//   // @Prop({
//   //   type: KarmaPoints
//   // })
//   // karmaPoints: KarmaPoints




//   // @Prop({
//   //   ,
//   //   imageLink: {
//   //     type: String,
//   //     trim: true,
//   //     default: null
//   //   },
//   //   imageId: {
//   //     type: String,
//   //     trim: true,
//   //     default: null
//   //   }
//   // })
//   // avatar: {
//   //   exists: boolean,
//   //   imageLink: string,
//   //   imageId: string
//   // }


//   // @Prop({
//   //   postKarma: {
//   //     type: Number,
//   //     default: 0
//   //   },
//   //   commentKarma: {
//   //     type: Number,
//   //     default: 0
//   //   }
//   // })
//   // karmaPoints: {
//   //   postKarma: number
//   //   commentKarma: number
//   // }

//   // @Prop([{ type: Schema.Types.ObjectId, ref: 'Post' }])
//   // posts: any[];

//   // @Prop([{ type: Schema.Types.ObjectId, ref: 'Subreddit' }])
//   // subscribedSubs: any[];
//   // @Prop({ default: 0 })
//   // totalComments: number

// }

// // User.pre('save', async function(next:any){
// //   try{
// //       if(!this.isModified('password')){
// //           return next();
// //       }
// //       const hashedPassword = await bcrypt.hash(this.password, 10);
// //       this.password = hashedPassword;
// //       return next();
// //   }catch(error){
// //       return next(error);
// //   }
// // })

// export const userSchema = SchemaFactory.createForClass(User)