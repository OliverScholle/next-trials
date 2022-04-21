import { PrismaClient } from "@prisma/client";
import { now } from "next-auth/client/_utils";

export async function createNewPaycheck({ employeeId, companyId })
{
    const prisma = new PrismaClient();
    const benefitDeductions = await prisma.companyBenefit.findMany({
        include: {
            benefitDeductions: true,
            employeeCompanyBenefits: true
        },
        where: {
            CompanyId: companyId,
            EmployeeId: employeeId
        }
    });
    const companyPayroll = await prisma.companyPayroll.findFirst({
        where: {
            CompanyId: companyId
        },
        include: {
            CompanyPayrollOptions: true
        }
    });
    const dependents = await prisma.employeeDependent.findMany({
        where: {
            EmployeeId: employeeId
        }
    });

    
}

export async function getAllEmployees({ companyId })
{
    const prisma = new PrismaClient();

    return prisma.employee.findMany({
        include: { 
            EmployeeDependent: true,
            EmployeeCompanyBenefit: {
                include: {
                    CompanyBenefit: true
                }
            }
        },
        where: { CompanyId: companyId }
    });
}

export async function addNewRandomEmployee(companyId)
{
    const prisma = new PrismaClient();

    const date = new Date();
    date.setFullYear(2000, 11, 23);
    const newEmployee = await prisma.employee.create({
        data: {
            FirstName: Math.random() > 0.5 ? 'Abe' : 'Bob',
            LastName: 'Smith',
            CompanyEmail: now() + '@' + companyId + '.com',
            Address: {
                create: {
                    Address1: 'Fake',
                    City_Lvl3: 'City',
                    State_Lvl1: 'State',
                    PostalCode: '12345',
                    CountryCode: 'US/USA'
                }
            },
            DateOfBirth: date,
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
        }
    });

    const benefits = await prisma.companyBenefit.findMany({
        where: { CompanyId: companyId }
    });
    var data = benefits.map((b, i) => { 
        return { EmployeeId: newEmployee.EmployeeId, CompanyBenefitId: b.CompanyBenefitId }
    });
    const employeeBenefits = await prisma.employeeCompanyBenefits.createMany({
        data
    });

    date.setFullYear(2010, 5, 10);
    data = Array.from({ length: Math.random() * 6 }).map(() => {
        return {
            EmployeeId: newEmployee.EmployeeId,
            FirstName: Math.random() > 0.75 ? 'Allen' : 'Jill',
            LastName: 'Smith',
            DateOfBirth: date
        }
    });
    const employeeDependents = prisma.employeeDependent.createMany({
        data
    });
    
    return newEmployee;
}