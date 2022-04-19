import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCompanies()
{
    const companies = await prisma.company.findMany();
    return companies;
}

export async function addNewRandomCompany()
{
    const newAddress = await prisma.address.create({
        data: {
            'Address1': '123 N 456 E',
            'City_Lvl3': 'Fakesville',
            'State_Lvl1': 'Void',
            'PostalCode': '12345',
            'CountryCode': 'NN/AAA'
        },
    });
    const newCompany = await prisma.company.create({
        data: {
            'Name': 'Garage Base',
            'AddressId': newAddress.AddressId
        },
    });
}

export default function handler(request, response)
{
    if (request.method === 'GET')
    {
        response.status(200).json({ data: getAllCompanies() });
    }
    else if (request.method === 'POST')
    {
        addNewRandomCompany();
        response.status(200).json();
    }
    else
    {
        response.status(405).json();
    }
}