import { faker } from '@faker-js/faker';

export default class CompanyService
{
    constructor(context)
    {
        this.prisma = context.prisma;
    }

    async getAllCompanies()
    {
        const companies = this.prisma.company.findMany();
        return companies;
    }

    /**
     * Data injector function to insert a random company to be later replaced by an insert with formData
     * @returns 
     */
    async addNewRandomCompany()
    {
        const address = faker.address;
        const stateAbbr = address.stateAbbr();

        const newCompany = await this.prisma.company.create({
            data: {
                Name: faker.company.companyName(),
                Address: {
                    create : {
                        Address1: address.streetAddress(),
                        City_Lvl3: address.city(),
                        State_Lvl1: stateAbbr,
                        PostalCode: address.zipCodeByState(stateAbbr),
                        CountryCode: address.countryCode('alpha-2')
                    }
                }
            }
        });
    
        const cBenefit1 = await this.prisma.companyBenefit.create({
            data: {
                CompanyId: newCompany.CompanyId,
                Key: 'Yearly_BenefitPackage', 
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
         const cBenefit2 = await this.prisma.companyBenefit.create({
            data: {
                CompanyId: newCompany.CompanyId,
                Key: 'Yearly_DependentBenefits', 
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
         const cBenefit3 = await this.prisma.companyBenefit.create({
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
    
        const cPayroll = await this.prisma.companyPayroll.create({
            data: {
                CompanyId: newCompany.CompanyId
            }
        });
        const cPayrollOptions = await this.prisma.companyPayrollOptions.createMany({
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

}