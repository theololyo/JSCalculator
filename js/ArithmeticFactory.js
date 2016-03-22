"use strict"
/**
 * Represents an object containing an operator or an operand
 */
var ArithmeticFactory = function () {

    /**
     * Parses and returns a data set into a desired format
     * @calcObject the object to parse
     */
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
