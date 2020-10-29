const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const sendResponse = require('../utils/sendResponse');


exports.getAll = (Model , output) => catchAsync(async (req , res) => {
	const features = new APIFeatures(
		Model.find() , req.query
	).filter().sort().limitFields().paginate();
	const doc = await features.query;
	
	const data = JSON.parse(`{"${output }":${JSON.stringify(doc) }}`);
	sendResponse(res , 200 , data , doc.length);
});
exports.getOne = (Model , output) => catchAsync(async (req , res) => {
	const doc = await Model.findById(req.params.id);

	const data = JSON.parse(`{"${output }":${JSON.stringify(doc) }}`);
	sendResponse(res , 200 , data);
});
exports.addOne = (Model , output) => catchAsync(async (req , res) => {
	const doc = await Model.create(req.body);

	const data = JSON.parse(`{"${output }":${JSON.stringify(doc) }}`);
	sendResponse(res , 200 , data);
});
exports.updateOne = (Model , output) => catchAsync(async (req , res) => {
	const doc = await Model.findByIdAndUpdate(req.params.id , req.body , {
		new: true ,
		runValidators: true ,
	});

	const data = JSON.parse(`{"${output }":${JSON.stringify(doc) }}`);
	sendResponse(res , 200 , data);
});
exports.deleteOne = (Model) => catchAsync( async (req , res) => {
	await Model.findByIdAndDelete(req.params.id);
	sendResponse(res , 204 , null);
});