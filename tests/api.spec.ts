import { test, expect, request } from "@playwright/test";

const baseURL = 'https://api.restful-api.dev/objects';
let objectId = null;
let baseURLWithId = `${baseURL}/${objectId}`;

test.describe('API tests', () => {
    test('get request', async ({ request }) => {
        const response = await request.get(baseURL);
        const responseBody = await response.json();
        const responseHeader = response.headers();
        console.log('response header :', responseHeader);
        console.log('response body :', responseBody);
        expect(response.status()).toBe(200);
        expect(responseBody[0].id).toBe('1');
        expect(responseHeader['content-type']).toBe('application/json');
    })
    test('post request', async ({ request }) => {
        const payload = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }
        const response = await request.post(baseURL, {
            data: payload
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        console.log('response body for post', responseBody);
        expect(responseBody.name).toBe(payload.name);
        expect(responseBody.data.year).toBe(payload.data.year);
        objectId = responseBody.id;
        console.log('the object id is : ' + objectId);
        baseURLWithId = `${baseURL}/${objectId}`;
        console.log('the base url with id is : ' + baseURLWithId);

    });
    test('put request', async ({ request }) => {
        const payload =
        {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 2049.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
                "color": "silver"
            }
        }
        const response = await request.put(baseURLWithId, { data: payload });
        const responseBody = await response.json();
        console.log('response body for put', responseBody);
        expect(response.status()).toBe(200);
        expect(responseBody.data.price).toBe(payload.data.price);
        expect(responseBody.data.color).toBe(payload.data.color);
    });

    test('patch request', async ({ request }) => {
        const payload = { "name": "Apple MacBook Pro 10" }
        const response = await request.patch(baseURLWithId, { data: payload });
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        console.log('response body for patch', responseBody);
        expect(responseBody.name).toBe(payload.name);

    })
    test('delete request', async ({ request }) => {
        const response = await request.delete(baseURLWithId);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('response body for delete', responseBody)
        expect(await responseBody.message).toContain('Object with id');

    });
});