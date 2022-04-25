import Context from '@/lib/context';
import EmployeeService from "@/lib/services/employeeService";

export default async function handler(request, response)
{
    const context = Context.getInstance();
    const empService = new EmployeeService(context);

    if (request.method === 'GET') {
        const paychecks = await empService.getEmployeePaychecks(request.query.employeeId, request.query.companyId);
        response.status(200).json(paychecks);
    }
    else if (request.method === 'POST') {
        const paycheck = await empService.createNewPaycheck(request.body['EmployeeId'], request.body['CompanyId']);
        response.status(200).json({ data: paycheck });
    }
}