//
(function (calc) {
    "use strict";

    var currentValue
        , lastvalue
        , currentType
        , calcStack = new CalcStack()
        , expression = " "
        , arithmeticFactory = new ArithmeticFactory()
        , hasEquals = false
        , currentDisplay = document.getElementById("calc-display-current")
        , lastDisplay = document.getElementById("calc-display-last");

    /*
     *
     */
    function clearCurrent() {
        currentDisplay.innerHTML = "";
    }

    /*
     *
     */
    function reset() {
        currentDisplay.innerHTML = "";
        lastDisplay.innerHTML = "";
        calcStack.flush();

    }

    //

    /*
     *
     */
    window.addEventListener("keydown", function (ev) {
        if (ev.keyCode === 46) {
            reset();
        }
    });

    //
    window.addEventListener("click", btnClicked, true);

    clearCurrent();

    /*
     *
     */
    function btnClicked(ev) {

        if (ev.target.tagName !== "HTML") {
            var btnData = ev.target.dataset;

            if (Number(btnData.buttonType) === 0 && btnData.operator === "=" && calcStack.isArmed && calcStack.peek().Type === 1) {
                var result = calcStack.calculateExpression();
                calcStack.flush();
                calcStack.pushValue(result);
                lastDisplay.innerHTML = result.Value;
                calcStack.setIsArmed(false);
                hasEquals = true;
                clearCurrent();
            } else {
                if (Number(btnData.buttonType) === 0) {
                    calcStack.pushValue(arithmeticFactory.getCalcObject(btnData));
                    lastDisplay.innerHTML = calcStack.getExpression();
                    clearCurrent();

                } else if (!calcStack.isArmed() && hasEquals && !calcStack.isEmpty() && calcStack.peek().Type === 1 && Number(btnData.buttonType) === 1) {
                    reset();
                    calcStack.pushValue(arithmeticFactory.getCalcObject(btnData));
                    lastDisplay.innerHTML = calcStack.getExpression();
                    currentDisplay.innerHTML += btnData.value;
                    hasEquals = false;

                } else {
                    calcStack.pushValue(arithmeticFactory.getCalcObject(btnData));
                    lastDisplay.innerHTML = calcStack.getExpression();
                    currentDisplay.innerHTML += btnData.value;
                }
            }

        }
    }



}(window.calc || (window.calc = {})));
