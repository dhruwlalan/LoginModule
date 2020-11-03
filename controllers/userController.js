const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendResponse = require('../utils/sendResponse');
const APIFeatures = require('../utils/apiFeatures');
const createSendToken = require('../utils/createSendToken');


// Configure Muulter & Sharp:
const multerStorage = multer.memoryStorage()
const multerFilter = (req , file , cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null , true);
    } else {
        cb(new AppError('Not an image! Please upload only images.' , 400) , false);
    }
}
const upload = multer({
    storage: multerStorage ,
    fileFilter: multerFilter ,
});
exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = (req , res , next) => {
    if (!req.file) return next();
    req.file.filename = `u-${req.user.id }.jpeg`;
    
    sharp(req.file.buffer)
        .resize(300 , 300)
        .toFormat('jpeg')
        .toFile(`public/assets/images/${req.file.filename }`);

    next();
}


// CRUD for admin:
exports.getAllUsers = catchAsync(async (req , res) => {
    const features = new APIFeatures(
        User.find() , req.query
    ).filter().sort().limitFields().paginate();
    const users = await features.query;

    sendResponse(res , 200 , { users } , users.length);
});
exports.getUser = catchAsync(async (req , res) => {
    const user = await User.findById(req.params.id);
    user.__v = undefined;
    user.passwordChangedAt = undefined;
    sendResponse(res , 200 , { user });
});
exports.createUser = catchAsync(async (req , res) => {
    const newUser = await User.create(req.body);
    newUser.active = undefined;
    newUser.password = undefined;
    newUser.__v = undefined;
    sendResponse(res , 200 , { newUser });
});
exports.updateUser = catchAsync(async (req , res) => {
    const user = await User.findByIdAndUpdate(req.params.id , req.body , {
        new: true ,
        runValidators: true ,
    });
    sendResponse(res , 200 , { user });
});
exports.deleteUser = catchAsync(async (req , res) => {
    await User.findByIdAndDelete(req.params.id);
    sendResponse(res , 204 , null);
});


// UD for normal users:
exports.updateMe = catchAsync(async (req , res , next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword.',400));
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = {};
    Object.keys(req.body).forEach(el => {
        if (['name', 'email' , 'photo'].includes(el)) filteredBody[el] = req.body[el];
    });
    if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });
    
    sendResponse(res , 200 , { user: updatedUser });
});
exports.updatePassword = catchAsync(async (req , res , next) => {
    // 1. get user from the collection:
    const user = await User.findById(req.user.id).select('+password');

    // 2. check if the posted current password is correct:
    if (!(await user.correctPassword(req.body.passwordCurrent , user.password))) {
        return next(new AppError('Your current password is wrong.' , 401))
    }

    // 3. if current password was correct, update new password:
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4. log user in, send jwt:
    createSendToken(user, 200, res);
});
exports.deleteMe = catchAsync(async (req , res , next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    sendResponse(res , 204 , null);
});