const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendResponse = require('../utils/sendResponse');
const factory = require('./CrudHandlersFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

// CRUD:
exports.getAllUsers = factory.getAll(User , 'users');
exports.getUser = factory.getOne(User , 'user');
exports.createUser = factory.addOne(User , 'newUser');
exports.updateUser = factory.updateOne(User , 'user');
exports.deleteUser = factory.deleteOne(User);

// for normal users:
exports.updateMe = catchAsync(async (req , res , next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword.',400));
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });
    
    sendResponse(res , 200 , { user: updatedUser });
});
exports.deleteMe = catchAsync(async (req , res , next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    sendResponse(res , 204 , null);
});