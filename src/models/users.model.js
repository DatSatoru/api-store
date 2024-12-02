const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['regular', 'admin'],
        default: 'regular'
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
}, {
    timestamps: true, versionKey: false
}
);

const User = model('user', userSchema);

module.exports = User;