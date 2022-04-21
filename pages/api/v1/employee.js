import { getAllEmployees, addNewRandomEmployee } from "@/lib/services/employeeService";

export default function handler(request, response)
{
    if (request.method === 'GET')
    {
        response.status(200).json({ data: getAllEmployees() });
    }
    else if (request.method === 'POST')
    {
        const employee = addNewRandomEmployee(request.body['CompanyId']).then(res => {
            return response.status(200).json({ data: res });
        })
    }
    else
    {
        response.status(405).json();
    }
}