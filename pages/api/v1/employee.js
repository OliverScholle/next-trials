

export default function handler(request, response)
{
    if (request.method === 'GET')
    {

    }
    else if (request.method === 'POST')
    {

    }
    else
    {
        response.status(405).json();
    }
}