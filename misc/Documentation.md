# Documentation

Here is a straight-forward documentation for using URL-Shortening-Service

## Response format

Every response from this API is a JSON object with three properties:

- success (boolean)
- message (string)
- data (object)

The only exception is when the status code is `204` and there is no response
body.

### Success

This is a boolean indicating whether the request was OK or not. If the API
successfully understands the request and responds with the information you want,
the value of `success` will be `true`, anything else will make this property to
be `false`.  
Based on the different status codes that URL-Shortening-Service may use in the
response of your request, `true` is for when the status code is `200`, `201` or
`204` and `false` is for when it's anything else.

### Message

`message` is a short string explaining a summary of the response object. Its
value is based on the status codes and `data`.

### Data

This is the property containing the actual data that the user wants. `data` will
be an empty object if an error occurs.

Here is an example of a response object:

1. Request: `POST /shorten`

   ```json
   {
     "url": "https://example.com"
   }
   ```

2. Response:
   ```json
   {
     "success": true,
     "message": "Created short url",
     "data": {
       "id": 21,
       "shortCode": "9AvaBv",
       "url": "https://example.com",
       "key": "q20eb603860e0db074cd5671290b3071",
       "views": 0,
       "createdAt": "2025-10-03T13:35:02.850Z",
       "updatedAt": "2025-10-03T13:35:02.850Z"
     }
   }
   ```

## Authentication

There is no login system or `users` table. But each short URL has a 32 character
string associated with it, which is called a `key`. The first character of a
`key` is always the letter `q` in lowercase, the rest will be a hexadecimal
number. The `key` itself doesn't mean anything and it only acts as a random
string that can give access to the creator of the short URL. Using this `key`,
creators can get view count, edit the original URL or completely delete the
short URL.

For security reasons, if the short code provided exists but the `key` provided
is wrong, status code will be `404` as if the short URL does not even exist.

To access a protected endpoint using a `key`, just use it as a query
parameter:  
`GET /shorten/:shortCode/stats?key=<your_key>`

Keep in mind that any user can get the original URL of a short URL using the
`GET /shorten/:shortCode` endpoint, without actually visiting the original URL
and incrementing the view count. But that's the only information they can get.

## Endpoints

- `GET` -> `/:shortCode`  
  Visit a short URL and get redirected to the original URL. Possible status
  codes are `301`, `400` and `404`.

- `POST` -> `/shorten`  
  Create a short URL for the `url` you provide in the request body. Possible
  status codes are `201` and `400`. Request body example:

  ```json
  {
    "url": "https://example.com"
  }
  ```

- `GET` -> `/shorten/:shortCode`  
  Get the original URL of a short URL. Possible status codes are `200`, `404`
  and `400`.

- `PUT` -> `/shorten/:shortCode`  
  Update your short URL and give it a new original URL which must be provided in
  the request body. The request body is exactly like the endpoint used for
  creating a short URL. This endpoint is protected and requires the `key` as a
  query parameter. The response contains the updated short URL, excluding the
  `key`. Possible status codes are `200`, `400` and `404`.

- `DELETE` -> `/shorten/:shortCode`  
  Delete the short URL with the short code of `:shortCode`. This endpoint is
  protected and requires the `key` as a query parameter. Possible status codes
  are `204`, `400` and `404`. Response body will be empty if the status code is
  `204`.

- `GET` -> `/shorten/:shortCode/stats`  
  Get detailed information about your short URL, including the view count and
  the date of creation and last update. This endpoint is protected and requires
  the `key` as a query parameter. Possible status codes are `200`, `400` and
  `404`. Response body example:

  ```json
  {
    "success": true,
    "message": "Got stats",
    "data": {
      "id": 21,
      "url": "https://example.com",
      "shortCode": "9AvaBv",
      "createdAt": "2025-10-03T13:35:02.850Z",
      "updatedAt": "2025-10-05T21:02:19.141Z",
      "views": 279
    }
  }
  ```

This API uses rate limiter. This means that at each point if you reach your
request limit, a `429` error will be sent back. So all the endpoints may also
return `429` status code aside from what was explained.
