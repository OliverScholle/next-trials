import Context from '@/lib/context';
import CompanyService from '@/lib/services/companyService.js';

export default function handler(request, response)
{
    const context = Context.getInstance();
    const compService = new CompanyService(context);

    if (request.method === 'GET')
    {
        response.status(200).json({ data: compService.getAllCompanies() });
    }
    else if (request.method === 'POST')
    {
        await compService.addNewRandomCompany();
        response.status(200).json();
    }
    else
    {
        response.status(405).json();
    }
}