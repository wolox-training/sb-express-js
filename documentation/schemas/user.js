module.exports = {
  userId: {
    type: 'integer',
    example: 1
  },
  userName: {
    type: 'string',
    example: 'Santiago'
  },
  userLastName: {
    type: 'string',
    example: 'Bedoya'
  },
  userPassword: {
    type: 'string',
    example: 'santiago123'
  },
  userEmail: {
    type: 'string',
    example: 'santiago.bedoya@wolox.co'
  },
  User: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/userName'
      },
      last_name: {
        $ref: '#/components/schemas/userLastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      password: {
        $ref: '#/components/schemas/userPassword'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  },
  UserCreated: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/userId'
      },
      name: {
        $ref: '#/components/schemas/userName'
      },
      last_name: {
        $ref: '#/components/schemas/userLastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      password: {
        $ref: '#/components/schemas/userPassword'
      }
    }
  }
};
