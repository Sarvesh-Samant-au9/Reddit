/* eslint-disable prettier/prettier */
import { Document } from "mongoose"
interface KarmaPoints {
  postKarma: number;
  commentKarma: number
}
interface Avatar {
  exists: boolean;
  imageLink: string;
  imageId: string
}
export interface User extends Document {
  name: string;
  email: string;
  readonly password: string,
  createdAt: Date;
  karmaPoints: KarmaPoints;
  avatar: Avatar
}