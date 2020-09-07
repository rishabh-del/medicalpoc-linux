var logger = require('../logger');
var invoke = require('../invoke')
var queryMeds = require('../query');
//var DailyRotateFile = require("winston-daily-rotate-file");


/**
 * For creating Medical Document
 */
let createMedicalDoc = async (data) => {

    console.log("data is:", data.key);
    try {
        const meddoc = await invoke(data);
        // console.log("meddoc ", meddoc);
        return { result: meddoc };

    } catch (err) {

        return { result: err };
    }

};

/**
 * For querying Medical Document
 */
let medicalHistory = async (req) => {

    logger.info(req);


    try {
        const medsHistory = await queryMeds(req, 'query');
        return { result: medsHistory };


    } catch (err) {

        return { result: err };
    }

};


let fetchFile = async(req) => {

    logger.info(req);

    try{
        const fetchFile = await queryMeds (req, 'fetch');
        return { result : fetchFile };
    }
     catch(err){
         return { result : err};
     }
};


let requestFile = async(req) => {

    logger.info(req);

    try{
        const requestFile = await queryMeds (req, 'request');
        return { result : requestFile };
    }
     catch(err){
         return { result : err};
     }
};


/**
 *
 * For querying Medical Document BY Range
 */
let medicalHistoryByRange = async (req) => {

    logger.info(req);
    var key = '\u0000patientId~date\u0000' + req.key + '\u0000' + req.dateFrom + '\u0000';
    var date = '\u0000patientId~date\u0000' + req.key + '\u0000' + req.dateTo + '\u0000';


    let data = {
        key: key,
        dateFrom: date,
        dateTo: req.dateTo,
        dataType: req.dataType
    }

    try {
        const medsHistory = await queryMeds(data, 'queryMedsByRange');
        return { result: medsHistory };


    } catch (err) {

        return { result: err };
    }

};


/**
 * 
 * For querying Medical Document
 */
let medicalHistoryForDoctor = async (req) => {

    // logger.info(req);


    try {
        const medsHistory = await queryMeds(req, 'query');
        return { result: medsHistory };


    } catch (err) {

        return { result: err };
    }

};


/**
 * 
 * For querying Medical Document
 */
let allmedicalHistory = async (req) => {

    // logger.info(req);


    try {
        const allmedicalHistory = await queryMeds(req, 'queryAllMeds');
        return { result: allmedicalHistory };


    } catch (err) {

        return { result: err };
    }

};

module.exports = { createMedicalDoc, medicalHistory, allmedicalHistory, medicalHistoryByRange, requestFile , fetchFile};