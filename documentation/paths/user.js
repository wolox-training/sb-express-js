module.exports = {
  '/users': {
    post: {
      tags: ['User operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'New user was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserCreated'
              },
              example: {
                id: 1,
                name: 'Santiago',
                last_name: 'Bedoya',
                email: 'santiago.bedoyaa@wolox.com.ar',
                updated_at: '2021-05-24T21:33:22.576Z',
                created_at: '2021-05-24T21:33:22.576Z'
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'The password must have a minimum of 8 alphanumeric characters',
                internal_code: 'validation_error'
              }
            }
          }
        },
        503: {
          description: 'Error creating a new user',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: "User with email 'santiago.bedoya@wolox.com.ar' already exists",
                internal_code: 'database_error'
              }
            }
          }
        }
      }
    }
  }
};
