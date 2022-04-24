
/**
 * Abstract class
 */
class Logic
{
    constructor() {
        throw new Error("Can't instantiate abstract class");
    }

    /**
     * Override this required function
     */
    calculatePay() {
        throw new Error("Abstract method");
    }
}