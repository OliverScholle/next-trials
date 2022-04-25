import { faker } from '@faker-js/faker';
import businessLogicFactory from '../businessLogicFactory';

export default class EmployeeService
{
    constructor(context) 
    {
        this.prisma = context.prisma;
    }

    /**
     * All employees from a company
     * @param {string} companyId 
     * @returns
     */
    async getAllEmployees({ companyId }) 
    {
        return this.prisma.employee.findMany({
            include: { 
                EmployeeDependent: true,
                EmployeeCompanyBenefit: {
                    include: {
                        CompanyBenefit: true,
                    }
                }
            },
            where: { CompanyId: companyId }
        });
    }

    getEmployeePaychecks(employeeId, companyId)
    {
        return this.prisma.paycheck.findMany({
            where: {
                CompanyId: companyId,
                EmployeeId: employeeId
            }
        }).catch(err => { throw err });
    }

    async createNewPaycheck(employeeId, companyId)
    {
        const benefits = this.prisma.companyBenefit.findMany({
            include: {
                BenefitDeduction: true,
                EmployeeCompanyBenefits: true
            },
            where: {
                CompanyId: companyId
            }
        });
        const companyPayroll = this.prisma.companyPayroll.findFirst({
            where: {
                CompanyId: companyId
            },
            include: {
                CompanyPayrollOptions: true
            }
        });
        const employee = this.prisma.employee.findFirst({
            where: {
                EmployeeId: employeeId
            },
            include: {
                EmployeeDependent: true
            }
        });
        Promise.all([benefits, companyPayroll, employee]).then(jobs => 
        {
            // Calculate the business logic for the company based on their options
            const businessLogic = businessLogicFactory.createFor('DefaultLogic');
            const payStats = businessLogic.calculatePay({
                CompanyBenefits: jobs[0],
                CompanyPayroll: jobs[1],
                EmployeeAndDependents: jobs[2]
            });
            
            // No need to await this operation
            const paycheck = this.prisma.paycheck.create({
                data: {
                    Employee: {
                        connect: { EmployeeId: employeeId }
                    },
                    Company: {
                        connect: { CompanyId: companyId }
                    },
                    HoursWorked: (80.0).toFixed(2),
                    PayPeriod: "2022/04/04 - 2022/04/18",
                    GrossPay: payStats.GrossPay.toFixed(2),
                    NetPay: payStats.NetPay.toFixed(2)
                }
            }).catch(err => { throw err });

            return payStats;
        });
    }

    /**
     * Data injector method to be later replaced by a function that inserts based on formData
     * @param {string} companyId 
     * @returns 
     */
    async addNewRandomEmployee(companyId)
    {
        const fakeAddress = faker.address;
        const lastName = faker.name.lastName();
    
        const dependents = Array.from({ length: faker.datatype.number(6) }).map(() => ({
            FirstName: faker.name.firstName(),
            LastName: lastName,
            DateOfBirth: faker.date.past(faker.datatype.number({ min: 0, max: 16}))
        }));
    
        const newEmployee = await this.prisma.employee.create({
            data: {
                FirstName: faker.name.firstName(),
                LastName: lastName,
                CompanyEmail: faker.internet.email(),
                Address: {
                    create: {
                        Address1: fakeAddress.streetAddress(false),
                        City_Lvl3: fakeAddress.city(),
                        State_Lvl1: fakeAddress.state(),
                        PostalCode: fakeAddress.zipCode(),
                        CountryCode: fakeAddress.countryCode('alpha-2')
                    }
                },
                DateOfBirth: faker.date.past(faker.datatype.number({ min: 18, max: 90 })),
                CompanyEmployees: {
                    create: {
                        Company: {
                            connect: { 
                                CompanyId: companyId
                            }
                        },
                        IsActive: true
                    }
                },
                EmployeeDependent: {
                    create: dependents
                }
            }
        });
    
        const benefits = await this.prisma.companyBenefit.findMany({
            where: { CompanyId: companyId }
        });
        const data = benefits.map((b, i) => { 
            return { EmployeeId: newEmployee.EmployeeId, CompanyBenefitId: b.CompanyBenefitId }
        });
        const employeeBenefits = await this.prisma.employeeCompanyBenefits.createMany({
            data
        });
        
        return newEmployee;
    }
}