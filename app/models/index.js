const mongoose = require('mongoose');
const transactionModel = require('./TransactionModel.js');

const db = {};
db.mongoose = mongoose;
db.transactionModel = transactionModel(mongoose);
db.objectId = mongoose.Types.ObjectId;

module.exports = db;
