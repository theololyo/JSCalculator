/**
 * Represents a container for mathematical expressions
 * with a set of related operations
 */
"use strict";
var CalcStack = function () {

    var storeage = [];
    var calcIsArmed = false;

    /**
     * Returns the current expression as a string
     */
    this.getExpression = function () {
        var tempStr = "";
        for (var i = 0; i < storeage.length; i++) {
            tempStr += storeage[i].Value;
        }

        return tempStr;
    };

    /**
     * Returns if the CalcStack is empty or not
     */
    this.isEmpty = function () {
        return storeage.length < 1;
    }

    /**
     * Returns true if the stack contains a number and an operator
     */
    this.isArmed = function () {
        return calcIsArmed;
    };

    /**
     * Sets if the stack contains a number and an operator
     * @parameter armCalc arming the stack
     */
    this.setIsArmed = function (armCalc) {
        calcIsArmed = armCalc;
    };

    /**
     * Empties the CalcStack
     */
    this.flush = function () {
        storeage.length = 0;
    };

    /**
     * Returns the last element in the CalcStack
     */
    this.peek = function () {
        if (storeage.length < 1) {
            return storeage[0];
        } else {
            return storeage[storeage.length - 1];
        }
    };

    /**
     * Evaluates the currently stored expression.
     * Returns an error if expression evaluation fails
     */
    this.calculateExpression = function () {
        try {
            return {
                Value: eval(this.getExpression())
                , Type: 1
            }

        } catch (ex) {
            return {
                Value: "ERROR"
                , Type: 1
            }
        }
    }

    /**
     * Adds a value to the CalcStack depending, evaluates the expression
     * if the expression is complete
     * @parameter calcObject the data to store in the CalcStack
     */
    this.pushValue = function (calcObject) {
        if (calcObject.Type === 0) {
            if (storeage.length > 0 && this.peek().Type === 0) {
                this.peek().Value = calcObject.Value;
            } else if (calcIsArmed) {
                var result = this.calculateExpression();
                this.flush();
                storeage.push(result);
                storeage.push(calcObject);
                calcIsArmed = false;
            } else {
                storeage.push(calcObject);
                calcIsArmed = true;
            }
        } else {
            storeage.push(calcObject);
        }
    };


};
