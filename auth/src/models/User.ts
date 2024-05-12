import { Model, mongoose, Schema, Document } from "../db/mongoose";
import { Password } from "../services/password";

// what it taked to build a user
interface UserAtters {
  email: string;
  password: string;
}

// properties of single user document
interface UserDoc extends Document {
  email: string;
  password: string;
}

// properties of user model
interface UserModel extends Model<UserDoc> {
  build(atters: UserAtters): UserDoc;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (atters: UserAtters) => {
  return new User(atters);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
