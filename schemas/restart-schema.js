const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
};
const reqBoolean = {
    type: Boolean,
    required: true
};
const restartSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString,
    messageId: reqString,
    channelTypeDM: reqBoolean,
    restartCmd: reqBoolean,
});

module.exports = mongoose.model('restart-message', restartSchema, 'restart-message')