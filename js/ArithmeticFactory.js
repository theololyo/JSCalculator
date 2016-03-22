"use strict"

var ArithmeticFactory = function () {

    this.getCalcObject = function (calcObject) {
        switch (Number(calcObject.buttonType)) {
        case 0:
            return {
                Value: calcObject.operator
                , Type: Number(calcObject.buttonType)
            };
        case 1:
            return {
                Value: calcObject.value
                , Type: Number(calcObject.buttonType)
            };
        };
    };
};
