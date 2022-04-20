import { PrismaClient } from '@prisma/client';


export async function getAllCompanies()
{
    const prisma = new PrismaClient();
    const companies = prisma.company.findMany();
    return companies;
}

export async function addNewRandomCompany()
{
    const prisma = new PrismaClient();
    const newCompany = await prisma.company.create({
        data: {
            Name: 'Garage Base',
            Address: {
                Address1: '123 N 456 E',
                City_Lvl3: 'Fakesville',
                State_Lvl1: 'Void',
                PostalCode: '12345',
                CountryCode: 'NN/AAA'
            },
            CompanyBenefit: [{
                    Key: 'YearlyBenefitPackage', 
                    Value: 'All',
                    BenefitDeduction: {
                        Key: 'Once',
                        Value: '-1000',
                        Priority: 10.0
                    }
                }, {
                    Key: 'YearlyDependentBenefits', 
                    Value: 'All',
                    BenefitDeduction: {
                        Key: 'Per Dependent',
                        Value: '-500',
                        Priority: 10.0
                    }
                }, {
                    Key: 'DeductionDiscount', 
                    Value: 'Only First Name Starting With "A"',
                    BenefitDeduction: {
                        Key: 'Per Person',
                        Value: '*.9',
                        Priority: 5.0
                    }
                }
            ],
            CompanyPayroll: {
                CompanyPayrollOptions: [{
                    Key: 'DefaultEmployeePay',
                    Value: '2000'
                }, {
                    Key: 'DefaultPayFrequency',
                    Value: 'Semimonthly'
                }]
            }
        },
    });
    return newCompany;
}