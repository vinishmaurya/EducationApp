const express = require('express');
const Form1Model = require('./Form1Model');
const AddressDetailsModules = require('./AddressDetailsModules');
const AwardCategoryModel = require('./AwardCategoryModel');
const LoginModel = require('./LoginModel');
const operationModel = require('./operationModel')
const document = require('./documentuploadModel')
const Credential = require('./Credential')
const e = require('express');
let formidable = require('formidable');
const fs = require('fs-extra');

const config = require('./config');

const swaggerUi = require('swagger-ui-express');

const router = express.Router()

// Extended: https://swagger.io/specification/#infoObject
const swaggerDocument = require('./swagger_output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));



module.exports = router;

//Post Form 1 Data Method
router.post('/post-form1-data', async (req, res) => {

    try {

        const Form1Data_obj = new Form1Model({
            dataAwardCategorySelectionId: req.body.dataAwardCategorySelectionId,
            NameApplicant: req.body.NameApplicant,
            CertificateNumber: req.body.CertificateNumber,
            Email: req.body.Email,
            AltEmail: req.body.AltEmail,
            Mobile: req.body.Mobile,
        });
        const dataToSave = await Form1Data_obj.save();
        res.status(200).json({ Message: "Data Saved Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Post Form 1 Data Method
router.get('/getAll-form1Data', async (req, res) => {

    try {
        const allData = await Form1Model.find();
        var filterData = [];
        for (var i = 0; i < allData.length; i++) {
            var filterTempData = [];
            // filterTempData.push(allData[i]._id);
            filterTempData.push(allData[i].dataAwardCategorySelectionId ? allData[i].dataAwardCategorySelectionId : "");
            filterTempData.push(allData[i].NameApplicant ? allData[i].NameApplicant : "");
            filterTempData.push(allData[i].CertificateNumber ? allData[i].CertificateNumber : "");
            filterTempData.push(allData[i].Email ? allData[i].Email : "");
            filterTempData.push(allData[i].AltEmail ? allData[i].AltEmail : "");
            filterTempData.push(allData[i].Mobile ? allData[i].Mobile : "");
            filterTempData.push(allData[i]._id ? allData[i]._id : "");
            filterData.push(filterTempData);
        }
        res.status(200).json(
            {
                tableHead: ["Award Category", "Applicant Name", "Certificate No.", "Action"],
                tableData: filterData
            });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// //Get all AwardCategory
router.get('/getAll-AwardCategory', async (req, res) => {
    try {
        const data = await AwardCategoryModel.find();
        var filterData = [];
        for (var i = 0; i < data.length; i++) {
            filterData.push({ label: data[i].name, value: data[i].name });
        }
        res.json(filterData);

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// //Post AwardCategory data
router.post('/post-AwardCategory', async (req, res) => {
    try {
        const AwardCategoryModel_obj = new AwardCategoryModel({
            name: req.body.name
        })
        const dataToSave = await AwardCategoryModel_obj.save();
        res.status(200).json({ Message: "Data Saved Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})
//login user data
router.post('/post-UserData', async (req, res) => {
    try {
        const LoginModel_obj = new LoginModel({
            Email: req.body.Email,
            Password: req.body.Password,
        })
        const dataToSave = await LoginModel_obj.save();
        res.status(200).json({ Message: "Data Saved Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.post('/get-UserData', async (req, res) => {
    try {
        var query = { Email: req.body.Email, Password: req.body.Password };
        const getUserData = await LoginModel.find(query).clone();
        res.status(200).json({ getUserData });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.delete('/delete-Form1Data/:id', async (req, res) => {
    // console.log(req.body.NameApplicant)
    // res.send("done")
    try {
        // const data= await dbConnect();
        const result = await Form1Model.findByIdAndDelete(req.params.id);
        res.status(200).json({ Message: "Data Deleted Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.get('/getById-form1Data/:_id', async (req, res) => {

    try {
        const getOneData = await Form1Model.findById(req.params._id);

        res.status(200).json(getOneData);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.patch('/post-form1UpdateData', async (req, res) => {

    try {

        const Form1Data_obj = new Form1Model({
            _id: req.body._id,
            dataAwardCategorySelectionId: req.body.dataAwardCategorySelectionId,
            NameApplicant: req.body.NameApplicant,
            CertificateNumber: req.body.CertificateNumber
        });

        // create a filter for a movie to update
        const filter = { _id: Form1Data_obj._id };
        // this option instructs the method to create a document if no documents match the filter
        const options = { upsert: true };
        // create a document that sets the plot of the movie
        const updateDoc = {
            $set: {
                dataAwardCategorySelectionId: Form1Data_obj.dataAwardCategorySelectionId,
                NameApplicant: Form1Data_obj.NameApplicant,
                CertificateNumber: Form1Data_obj.CertificateNumber
            }
        };

        const result = await Form1Model.updateOne(filter, updateDoc, options).exec();

        res.status(200).json({ Message: `Data updated successfully!` });
        // res.status(200).json(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);


    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/post-AddressDetails-data', async (req, res) => {

    try {

        const AddressDetailsModules_obj = new AddressDetailsModules({
            City: req.body.City,
            State: req.body.State,
            Address: req.body.Address,
            Landmark: req.body.Landmark,
            Code: req.body.Code,
        });
        const dataToSave = await AddressDetailsModules_obj.save();
        res.status(200).json({ Message: "Data Saved Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getAll-AddressDetails-data', async (req, res) => {

    try {
        const allData = await AddressDetailsModules.find();
        var filterData = [];
        for (var i = 0; i < allData.length; i++) {
            var filterTempData = [];
            // filterTempData.push(allData[i]._id);
            filterTempData.push(allData[i].City ? allData[i].City : "");
            filterTempData.push(allData[i].State ? allData[i].State : "");
            filterTempData.push(allData[i].Address ? allData[i].Address : "");
            filterTempData.push(allData[i].Landmark ? allData[i].Landmark : "");
            filterTempData.push(allData[i].Code ? allData[i].Code : "");
            filterData.push(filterTempData);
        }
        res.status(200).json(
            {
                tableData: filterData
            });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.post('/post-operation-data', async (req, res) => {

    try {

        const operationModel_obj = new operationModel({
            open: req.body.open,
            close: req.body.close,
            Monday: req.body.Monday,
            Tuesday: req.body.Tuesday,
            Wednesday: req.body.Wednesday,
            Thursday: req.body.Thursday,
            Friday: req.body.Friday,
            Saturday: req.body.Saturday,
            Sunday: req.body.Sunday,
            halfMonday: req.body.halfMonday,
            halfMonday: req.body.halfMonday,
            halfTuesday: req.body.halfTuesday,
            halfWednesday: req.body.halfWednesday,
            halfThursday: req.body.halfThursday,
            halfFriday: req.body.halfFriday,
            halfSaturday: req.body.halfSaturday,
            halfSunday: req.body.halfSunday,
            online: req.body.online,
        });
        const dataToSave = await operationModel_obj.save();
        res.status(200).json({ Message: "Data Saved Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get('/getAll-operation-data', async (req, res) => {

    try {
        const allData = await operationModel.find();
        var filterData = [];
        for (var i = 0; i < allData.length; i++) {
            var filterTempData = [];
            // filterTempData.push(allData[i]._id);
            filterTempData.push(allData[i].open ? allData[i].open : "");
            filterTempData.push(allData[i].close ? allData[i].close : "");
            filterTempData.push(allData[i].Monday ? allData[i].Monday : "");
            filterTempData.push(allData[i].Tuesday ? allData[i].Tuesday : "");
            filterTempData.push(allData[i].Wednesday ? allData[i].Wednesday : "");
            filterTempData.push(allData[i].Thursday ? allData[i].Thursday : "");
            filterTempData.push(allData[i].Friday ? allData[i].Friday : "");
            filterTempData.push(allData[i].Saturday ? allData[i].Saturday : "");
            filterTempData.push(allData[i].Sunday ? allData[i].Sunday : "");
            filterTempData.push(allData[i].halfMonday ? allData[i].halfMonday : "");
            filterTempData.push(allData[i].halfTuesday ? allData[i].halfTuesday : "");
            filterTempData.push(allData[i].halfWednesday ? allData[i].halfWednesday : "");
            filterTempData.push(allData[i].halfThursday ? allData[i].halfThursday : "");
            filterTempData.push(allData[i].halfFriday ? allData[i].halfFriday : "");
            filterTempData.push(allData[i].halfSaturday ? allData[i].halfSaturday : "");
            filterTempData.push(allData[i].halfSunday ? allData[i].halfSunday : "");
            filterTempData.push(allData[i].online ? allData[i].online : "");
            filterData.push(filterTempData);
        }
        res.status(200).json(
            {
                tableData: filterData
            });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get('/getAll-document', async (req, res) => {
    try {
        const data = await document.find();
        // var filterData = [];
        // for (var i = 0; i < data.length; i++) {
        //     filterData.push(data[i].idproofname ? data[i].idproofname : "");
        //     filterData.push(data[i].idproof ? data[i].idproof : "");
        //     filterData.push(data[i].profile ? data[i].profile : "");
        // }
        res.json(data);

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// //Post AwardCategory data
router.post('/post-document', async (req, res) => {
    try {
       
        var message = "";
        var bool = true;

        let UserDoc_IdType = null;
        let UserDoc_SelectProfile = null;

        if (!req.body.IdType) {
            message = "Id Type is required!";
            bool = false;
            //res.status(200).json({ Message: "Id Type is required!" });
            //return;
        }
        else if (!req.files || Object.keys(req.files).length != 2) {
            message = "No files were uploaded.!";
            bool = false;
            //res.status(200).json({ Message: "No files were uploaded.!" });
            //return;
        }
        else if (Object.keys(req.files).length === 2) {
            if (Object.keys(req.files)[0] != "UserDoc_IdType") {
                message = "No files were uploaded for Id Type.";
                //res.status(200).json({ Message: "No files were uploaded for Id Type." });
                //return;
                bool = false;
            }
            else {
                UserDoc_IdType = req.files.UserDoc_IdType;
            }
            if (Object.keys(req.files)[1] != "UserDoc_SelectProfile") {
                message = "No files were uploaded for Profile.";
                //res.status(200).json({ Message: "No files were uploaded for Profile." });
                //return;
                bool = false;
            }
            else {
                UserDoc_SelectProfile = req.files.UserDoc_SelectProfile;
            }
        }
        else if (String(UserDoc_IdType.name.split('.')[1]).toUpperCase() != "JPG" || String(UserDoc_IdType.name.split('.')[1]).toUpperCase() != "JPEG" || String(UserDoc_IdType.name.split('.')[1]).toUpperCase() != "PNG") {
            message = "Invalid Id Type Image format ? only (jpg,jpeg,png) images are required!";
            bool = false;
        }
        else if ((UserDoc_IdType.size / (1000*1000)) > 1)
         {
             message = "Invalid Id Type Image size ? Only 1MB image are valid!";
             bool = false; 
        }
        if (String(UserDoc_SelectProfile.name.split('.')[1]).toUpperCase() != "JPG" || String(UserDoc_SelectProfile.name.split('.')[1]).toUpperCase() != "JPEG" || String(UserDoc_SelectProfile.name.split('.')[1]).toUpperCase() != "PNG") {
            message = "Invalid Profile Image format ? only (jpg,jpeg,png) images are required!";
            bool = false;
        }
        else if ((UserDoc_SelectProfile.size / (1000 * 1000)) > 1) {
            message = "Invalid Profile Image size ? Only 1MB image are valid!";
            bool = false;
        }

        if (bool) {
            let sampleFile1 = req.files.UserDoc_IdType;

            var uploadPathP1 = `${__dirname}/app_images/` + sampleFile1.name;
            fs.writeFile(uploadPathP1, sampleFile1.data, { encoding: 'base64' }, function (err) {
                console.log('File created');
            });
            uploadPathv1 = 'http://localhost:3000/images/' + sampleFile1.name;

            sampleFile1.mv(uploadPathP1, function (err) {
                if (err) {
                    message = err;
                    //return res.status(200).json({ Message: err });
                }
            });


            let sampleFile2 = req.files.UserDoc_SelectProfile;

            var uploadPathP2 = `${__dirname}/app_images/` + sampleFile2.name;
            fs.writeFile(uploadPathP2, sampleFile2.data, { encoding: 'base64' }, function (err) {
                console.log('File created');
            });

            uploadPathv2 = 'http://localhost:3000/images/' + sampleFile2.name;

            sampleFile2.mv(uploadPathP1, function (err) {
                if (err) {
                    message = err;
                    //return res.status(200).json({ Message: err });
                }
            });

            const document_obj = new document({
                idproofname: req.body.IdType,
                idproof: uploadPathv1,
                profile: uploadPathv2
            })
            const dataToSave = await document_obj.save();
            console.log(uploadPathv1);
            console.log(uploadPathv2);
            if (message == "") {
                message = "Document Upload Sucessfully!";
            }
            //await new Promise(resolve => setTimeout(resolve, 5000));
        }
        res.status(200).json({ Message: message });

    }
    catch (error) {
        res.status(200).json({ Message: error.message });
    }
})

router.post('/post-credential-data', async (req, res) => {

    try {

        const Credential_obj = new Credential({
            Email: req.body.Email,
            Password: req.body.Password,
            RePassword: req.body.RePassword,
        });
        const dataToSave = await Credential_obj.save();
        res.status(200).json({ Message: "Data Saved Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Post Form 1 Data Method
router.get('/getAll-credential-data', async (req, res) => {

    try {
        const allData = await Credential.find();
        var filterData = [];
        for (var i = 0; i < allData.length; i++) {
            var filterTempData = [];
            // filterTempData.push(allData[i]._id);
            filterTempData.push(allData[i].Email ? allData[i].Email : "");
            filterTempData.push(allData[i].Password ? allData[i].Password : "");
            filterTempData.push(allData[i].RePassword ? allData[i].RePassword : "");
            filterTempData.push(allData[i]._id ? allData[i]._id : "");
            filterData.push(filterTempData);
        }
        res.status(200).json(
            {
                tableData: filterData
            });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});