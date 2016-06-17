import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name:String,
	age: Number,
	birth: Date,
	sex: Boolean,
})

export default UserSchema;
