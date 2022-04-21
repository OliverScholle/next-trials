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
                create : {
                    Address1: '123 N 456 E',
                    City_Lvl3: 'Fakesville',
                    State_Lvl1: 'Void',
                    PostalCode: '12345',
                    CountryCode: 'NN/AAA'
                }
            }
        }
    });

    const cBenefit1 = await prisma.companyBenefit.create({
        data: {
            CompanyId: newCompany.CompanyId,
            Key: 'YearlyBenefitPackage', 
            Value: 'All',
            BenefitDeduction: {
                create: {
                    Key: 'Once',
                    Value: '-1000',
                    Priority: 10.0
                }
            }
        }
     }); 
     const cBenefit2 = await prisma.companyBenefit.create({
        data: {
            CompanyId: newCompany.CompanyId,
            Key: 'YearlyDependentBenefits', 
            Value: 'All',
            BenefitDeduction: {
                create: {
                    Key: 'Per Dependent',
                    Value: '-500',
                    Priority: 10.0
                }
            }
        }
     });
     const cBenefit3 = await prisma.companyBenefit.create({
        data: {
            CompanyId: newCompany.CompanyId,
            Key: 'DeductionDiscount', 
            Value: 'Only First Name Starting With "A"',
            BenefitDeduction: {
                create: {
                    Key: 'Per Person',
                    Value: '*.9',
                    Priority: 5.0
                }
            }
        }
    });

    const cPayroll = await prisma.companyPayroll.create({
        data: {
            CompanyId: newCompany.CompanyId
        }
    });
    const cPayrollOptions = await prisma.companyPayrollOptions.createMany({
        data: [{
            CompanyPayrollId: cPayroll.CompanyPayrollId,
            Key: 'DefaultEmployeePay',
            Value: '2000'
        }, {
            CompanyPayrollId: cPayroll.CompanyPayrollId,
            Key: 'DefaultPayFrequency',
            Value: 'Semimonthly'
        }]
    });
    return newCompany;
}