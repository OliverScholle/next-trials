
/**
 *
 */
class Logic
{
    getPayFrequency(frequencyType)
    {
        switch (frequencyType.toUpperCase()) {
            case 'Daily'.toUpperCase():
                return 365;
            case 'Weekly'.toUpperCase():
                return 52;
            case 'Semimonthly'.toUpperCase():
            case 'Biweekly'.toUpperCase():
                return 26;
            case 'Monthly'.toUpperCase():
                return 12;
            case 'Bimonthly'.toUpperCase():
            case 'Semiannually'.toUpperCase():
                return 6;
            case 'Quarterly'.toUpperCase():
                return 4;
            case 'Yearly'.toUpperCase():
            case 'Annually'.toUpperCase():
                return 1;
            default:
                throw new Error("Invalid frequency type");
        }
    }

    /**
     * Override this required function
     */
    async calculatePay() {
        throw new Error("Abstract method calculatePay() must be implemented");
    }
}

export default Logic;