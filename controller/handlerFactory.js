const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(204).json();
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    console.log(req.body);
    console.log(req.filterObj);
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .pagination(documentsCount)
      .filter()
      .sort()
      .search()
      .limitFields();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res.status(200).json({
      result: documents.length,
      paginationResult,
      data: documents,
    });
  });
