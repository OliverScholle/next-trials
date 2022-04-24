
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
        const payrollOptions = dataObjects.PayrollOptions;
        const employeeDependents = dataObjects.EmployeeDependents;
        const companyBenefits = dataObjects.CompanyBenefits;
    }
}

module.exports = DefaultLogic;