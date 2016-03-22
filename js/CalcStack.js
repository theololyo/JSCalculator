/**
 * Created by Theo on 2016-03-12.
 */
"use strict";
var CalcStack = function () {

    var storeage = [];
    var calcIsArmed = false;

    /**
     *
     */
    this.getExpression = function () {
        var tempStr = "";
        for (var i = 0; i < storeage.length; i++) {
            tempStr += storeage[i].Value;
        }

        return tempStr;
    };

    /**
     *
     */
    this.isEmpty = function () {
        return storeage.length < 1;
    }

    /**
     *
     */
    this.isArmed = function () {
        return calcIsArmed;
    };

    /**
     *
     */
    this.setIsArmed = function (truefalse) {
        calcIsArmed = truefalse;
    };

    /**
     *
     */
    this.flush = function () {
        storeage.length = 0;
    };

    this.peek = function () {
        if (storeage.length < 1) {
            return storeage[0];
        } else {
            return storeage[storeage.length - 1];
        }
    };

    /**
     *
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
     *
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
