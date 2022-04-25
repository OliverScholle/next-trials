import Logic from './logic';
import _ from 'lodash';

/**
 * @extends {Logic}
 */
class DefaultLogic extends Logic
{
    /**
     * 
     * @param {object} dataObjects Must contain 
     * { PayrollOptions: Array of Prisma<CompanyPayrollOptions>,
     *   EmployeeDependent: Array of Prisma<EmployeeDependent>,
     *   CompanyBenefit: Array of Prisma<CompanyBenefit> with {
     *      BenefitDeduction: Array of Prisma<BenefitDeduction>}
     * }
     */
    calculatePay(dataObjects)
    {
        const payroll = dataObjects.CompanyPayroll;
        const employee = dataObjects.EmployeeAndDependents;
        const companyBenefits = dataObjects.CompanyBenefits;
        // Validate data
        if (!payroll || !payroll.CompanyPayrollOptions) throw new Error("Company must have payroll and payroll options to distribute wages.");
        
        // Convert array into object
        var payrollOptions = {};
        payroll.CompanyPayrollOptions.forEach(option => {
            payrollOptions[option.Key] = option.Value;
        });
        // If employeePayrollOption's PayFrequency exists, use that employee's frequency
        // Else, set the frequency to the company's defaulted value
        const payFrequency = this.getPayFrequency(payrollOptions.DefaultPayFrequency);
        const grossPay = this.calculateGrossPay(payrollOptions, payFrequency);
        const deductions = this.calculateDeductions(companyBenefits, employee, payFrequency);
        const netPay = this.calculateNetPay(grossPay, deductions);

        return {
            GrossPay: grossPay,
            Deductions: deductions,
            NetPay: netPay
        };
    }

    calculateGrossPay(payrollOptions, payFrequency)
    {
        if (!payrollOptions) throw new Error("Error converting payroll options");
        
        // Return the defaulted pay for employees when set
        if (payrollOptions.DefaultEmployeePay) {
            return parseFloat(payrollOptions.DefaultEmployeePay);
        }
        // Otherwise, continue to calculate pay based on employee's salary, frequency, and/or hourly rate
        // If employee is salary based calculate annual salary divided by pay frequency
    }

    calculateDeductions(companyBenefits, employee, payFrequency)
    {
        // Orders from highest priority deductions to lowest
        _.orderBy(companyBenefits, [function(o) {
            if (!o.BenefitDeduction) throw new Error("Benefit must have a deduction value");
            _.orderBy(o.BenefitDeduction, ['Priority'], ['desc']);
            return o.BenefitDeduction[0].Priority;
        }], ['desc']);

        var allDeductions = [];
        allDeductions = companyBenefits.filter(benefit => 
            benefit.Key.toUpperCase() !== 'DeductionDiscount'.toUpperCase()
        ).map(benefit => 
        {
            // TODO: Redefine how modifiers are differentiated from deductions
            //   As well as how to apply it between different deductions
            benefit.specialModifier = 0.9;
            benefit.deductionAmount = 0.0;
            benefit.BenefitDeduction.forEach(deduction =>
            {
                var amount = parseFloat(deduction.Value) / payFrequency;
                // Special case deduction for dependent count
                if (deduction.Key.toUpperCase() === 'Per Dependent'.toUpperCase() &&
                    employee.EmployeeDependent)
                {
                    employee.EmployeeDependent.forEach(dependent => {
                        if (dependent.FirstName[0].toUpperCase() === 'A')
                            benefit.deductionAmount += amount * benefit.specialModifier;
                        else
                            benefit.deductionAmount += amount;
                    });
                    return;
                }
                
                // Check if employee has special modifier discount
                if (employee.FirstName[0].toUpperCase() === 'A')
                    benefit.deductionAmount += amount * benefit.specialModifier;
                else
                    benefit.deductionAmount += amount;
            });
            
            // Record this benefit package's name and amount
            return { name: benefit.Key, amount: benefit.deductionAmount };
        });

        return allDeductions;
    }

    calculateNetPay(grossPay, deductionsArray)
    {
        var netPay = grossPay;
        // Decrease netPay by each deduction given
        deductionsArray.forEach(deduct => {
            netPay += deduct.amount;
        });
        return netPay;
    }
}

module.exports = DefaultLogic;