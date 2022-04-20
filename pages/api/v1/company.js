import { getAllCompanies, addNewRandomCompany } from '@/lib/services/companyService.js';

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