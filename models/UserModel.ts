import mongoose, { Document, Model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  isAdmin: boolean
  matchPassword(enteredPassword: string): Promise<boolean>
}

export interface IUserModel extends Model<IUser> { }

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
      min: [3, 'Name is Too Short'],
      max: [40, 'Name is Too Long'],
    },
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
    isAdmin: {
      type: Boolean,
      requried: true,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre<IUser>('save', async function (next) {
  if (!this.password) {
    next()
  } else {
    const salt: string = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  }
})

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema)

export default User