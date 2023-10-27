export function checkPresent(fieldValue, fieldName) {
    let errMsg = "";
    if (fieldValue === "" || fieldValue === null) {
        errMsg += ("<li>" + fieldName + " must be filled out</li>");
    }
    return errMsg;
}

export function checkName(fieldValue, fieldName) {
    let errMsg = "";
    if (fieldValue === "" || fieldValue === null) {
        errMsg += ("<li>" + fieldName + " must be filled out</li>");
    }
    else {
        if (fieldValue.length > 80) {
            errMsg += ("<li>" + fieldName + " must be between 1 and 80 characters</li>")
        }
    }
    return errMsg;
}
export function checkTitle(fieldValue, fieldName) {
    let errMsg = "";
    if (fieldValue === "" || fieldValue === null) {
        errMsg += ("<li>" + fieldName + " must be filled out</li>");
    }
    else {
        if (fieldValue.length > 250) {
            errMsg += ("<li>" + fieldName + " must be between 1 and 80 characters</li>")
        }
    }
    return errMsg;
}

export function checkDesc(fieldValue, fieldName) {
    let errMsg = "";
    if (fieldValue === "" || fieldValue === null) {
        errMsg += ("<li>" + fieldName + " must be filled out</li>");
    }
    else {
        if (fieldValue.length > 4000) {
            errMsg += ("<li>" + fieldName + " must be between 1 and 4000 characters</li>")
        }
    }
    return errMsg;
}

export function checkLength(fieldValue, fieldName) {
    let errMsg = "";
    if (fieldValue === "" || fieldValue === null) {
        errMsg += ("<li>" + fieldName + " must be filled out</li>");
    }
    else {
        if (fieldValue < 200 || fieldValue > 2000 ) {
            errMsg += ("<li>" + fieldName + " must be between 200mm and 2000mm</li>")
        }
    }
    return errMsg;
}

export function checkPhoneNumber (fieldValue, fieldName) {
    let errMsg = "";
    let ukPhonePattern = /^(\(?(0|\+44)[1-9]{1}\d{1,4}?\)?\s?\d{3,4}\s?\d{3,4})$/;

    if (fieldValue === "" || fieldValue === null) {
        errMsg += ("<li>" + fieldName + " must be filled out</li>");
    }
    else {
        if (!(ukPhonePattern.test(fieldValue))) {
            errMsg += ("<li>" + fieldName + " 's value must be a UK telephone number</li>")
        }
    }
    return errMsg;
}

export function checkPostCode (fieldValue, fieldName) {
    let errMsg = "";
    let ukPostcodePattern = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;
    if (fieldValue === "" || fieldValue === null) {
        errMsg += ("<li>" + fieldName + " must be filled out</li>");
    }
    else {
        if (!(ukPostcodePattern.test(fieldValue))) {
            errMsg += ("<li>" + fieldName + " 's value must be a UK postal code</li>")
        }
    }
    return errMsg;
}

export function checkImage(fieldValue, fieldName) {
    let errMsg = "";
    if (fieldValue === "" || fieldValue === null) {
        errMsg += ("<li>" + fieldName + " must be filled out</li>");
    }
    else {
        if (!(fieldValue.type.match('image.*')) ) {
            errMsg += ("<li>" + fieldName + " must be an image</li>")
        }
    }
    return errMsg;
}
