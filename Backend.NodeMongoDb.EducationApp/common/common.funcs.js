const funcParseInnerObject = function (ObjectToMerge) {
    var ParseArrayObj = [];
    if (!(ObjectToMerge instanceof Array)) {
        var temp = new Array();
        temp.push(ObjectToMerge);
        ObjectToMerge = temp;
    }
    for (var i = 0; i < ObjectToMerge.length; i++) {
        //debugger;
        var keysHaveArrayObject = [];
        var RootDataArray = new Object();
        var ExtractInnerArrayObjectDataArray = [];
        let objEleKeys = Object.keys(ObjectToMerge[i]);//find all keys current object
        for (var j = 0; j < objEleKeys.length; j++) {
            if (typeof ObjectToMerge[i][objEleKeys[j]] == 'object' && ObjectToMerge[i][objEleKeys[j]]) { //check if key have object data
                var ExtractInnerArrayObjectData = new Object();
                keysHaveArrayObject.push(objEleKeys[j]);//store the key name which having object data
                var objInnerEleKeys = Object.keys(ObjectToMerge[i][objEleKeys[j]]);//find inner keys
                for (var z = 0; z < objInnerEleKeys.length; z++) {
                    ExtractInnerArrayObjectData[objInnerEleKeys[z]] = ObjectToMerge[i][objEleKeys[j]][objInnerEleKeys[z]];//store inner keys object data
                }
                ExtractInnerArrayObjectDataArray.push(ExtractInnerArrayObjectData);
            }
            else {
                //keep orignal here which do not have object data
                RootDataArray[objEleKeys[j]] = ObjectToMerge[i][objEleKeys[j]];
            }
        }
        //debugger;
        for (var xx = 0; xx < ExtractInnerArrayObjectDataArray.length; xx++) {
            var tempExtractInner = ExtractInnerArrayObjectDataArray[xx];
            //Append Inner Object Into Root
            var InnerJsonObjKeys = Object.keys(tempExtractInner);
            for (var j = 0; j < InnerJsonObjKeys.length; j++) {
                if (InnerJsonObjKeys[j] == "_id") {
                    if (xx <= keysHaveArrayObject.length - 1) {
                        RootDataArray[keysHaveArrayObject[xx]] = tempExtractInner[InnerJsonObjKeys[j]];
                    }
                }
                else {
                    RootDataArray[InnerJsonObjKeys[j]] = tempExtractInner[InnerJsonObjKeys[j]];
                }
            }
        }
        RootDataArray["Status"] = RootDataArray["IsActive"] ? "Active" : "Inactive";
        RootDataArray["SrNo"] = i + 1;
        ParseArrayObj.push(RootDataArray);
    }
    return ParseArrayObj;
}

module.exports = {
    funcParseInnerObject
};