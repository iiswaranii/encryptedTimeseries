const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    name: String,
    origin: String,
    destination: String,
    timestamp: Date
}, { _id: false });

const timeSeriesSchema = new mongoose.Schema({
    minute: {
        type: Date,
        required: true,
        index: true
    },
    records: {
        type: [recordSchema],
        default: []
    }
}, {timestamp: true});

module.exports = mongoose.model('TimeSeries', timeSeriesSchema);