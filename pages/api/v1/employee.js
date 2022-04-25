import Context from '@/lib/context';
import EmployeeService from "@/lib/services/employeeService";

export default function handler(request, response)
{
    const context = Context.getInstance();
    const empService = new EmployeeService(context);

    if (request.method === 'GET')
    {
        response.status(200).json({ data: empService.getAllEmployees() });
    }
    else if (request.method === 'POST')
    {
        const employee = empService.addNewRandomEmployee(request.body['CompanyId']).then(res => {
            response.status(200).json({ data: res });
        })
    }
    else
    {
        response.status(405).json();
    }
}