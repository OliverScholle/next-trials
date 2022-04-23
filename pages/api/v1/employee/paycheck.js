import Context from '@/lib/context';
import EmployeeService from "@/lib/services/employeeService";

export default function handler(request, response)
{
    const context = Context.getInstance();
    const empService = new EmployeeService(context);

    if (request.method === 'GET') {
        response.status(405).json({ message: 'Method not implemented'});
    }
    else if (request.method === 'POST') {
        const paycheck = await empService.createNewPaycheck(request.body['EmployeeId'], request.body['CompanyId']);
        response.status(200).json({ data: paycheck });
    }
}