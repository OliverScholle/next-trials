import { createNewPaycheck } from "@/lib/services/employeeService";

export default function handler(request, response)
{
    if (request.method === 'GET') {
        response.status(405).json({ message: 'Method not implemented'});
    }
    else if (request.method === 'POST') {
        const paycheck = await createNewPaycheck(request.body['EmployeeId'], request.body['CompanyId']);
        response.status(200).json({ data: paycheck });
    }
}