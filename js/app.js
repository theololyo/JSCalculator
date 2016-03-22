/**
 * Encloses and invokes the application to keep the global scope clean
 */
(function (calc) {
    "use strict";

    var calcStack = new CalcStack()
        , expression = ""
        , arithmeticFactory = new ArithmeticFactory()
        , hasEquals = false
        , currentDisplay = document.getElementById("calc-display-current")
        , lastDisplay = document.getElementById("calc-display-last");

    /**
     * Clears the display showing the current input
     */
    function clearCurrent() {
        currentDisplay.innerHTML = "";
    }

    /**
     *Resets the application to its initial state
     *
     */
    function reset() {
        currentDisplay.innerHTML = "";
        lastDisplay.innerHTML = "";
        calcStack.flush();

    }

    /**
     * Responds to clickevents on the applications buttons.
     * Performs actions depending on the value of the clicked button
     * @parameter ev information regarding the object the triggered the event
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

    /**
     * Resets the application when the DELETE-key is pressed
     */
    window.addEventListener("keydown", function (ev) {
        if (ev.keyCode === 46) {
            reset();
        }
    });

    /**
     * Listens for clickevents, invokes application logic when
     * a button is pressed
     */
    window.addEventListener("click", btnClicked, true);

    clearCurrent();





}(window.calc || (window.calc = {})));
