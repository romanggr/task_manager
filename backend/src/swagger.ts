import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'REST API for managing tasks',
    },
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            _id:         { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
            title:       { type: 'string', example: 'Buy milk' },
            description: { type: 'string', example: 'From the shop' },
            status:      { type: 'string', enum: ['todo', 'in_progress', 'done'] },
            createdAt:   { type: 'string', format: 'date-time' },
          },
        },
        CreateTaskDto: {
          type: 'object',
          required: ['title'],
          properties: {
            title:       { type: 'string', example: 'Buy milk' },
            description: { type: 'string', example: 'From the shop' },
            status:      { type: 'string', enum: ['todo', 'in_progress', 'done'] },
          },
        },
        UpdateTaskDto: {
          type: 'object',
          properties: {
            title:       { type: 'string' },
            description: { type: 'string' },
            status:      { type: 'string', enum: ['todo', 'in_progress', 'done'] },
          },
        },
      },
    },
    paths: {
      '/api/tasks': {
        get: {
          summary: 'Get all tasks',
          tags: ['Tasks'],
          responses: {
            200: {
              description: 'List of tasks',
              content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Task' } } } },
            },
          },
        },
        post: {
          summary: 'Create a new task',
          tags: ['Tasks'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateTaskDto' } } },
          },
          responses: {
            201: { description: 'Task created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
          },
        },
      },
      '/api/tasks/{id}': {
        get: {
          summary: 'Get task by ID',
          tags: ['Tasks'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Task found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
            404: { description: 'Task not found' },
          },
        },
        put: {
          summary: 'Update task',
          tags: ['Tasks'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateTaskDto' } } },
          },
          responses: {
            200: { description: 'Task updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
            404: { description: 'Task not found' },
          },
        },
        delete: {
          summary: 'Delete task',
          tags: ['Tasks'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            204: { description: 'Task deleted' },
            404: { description: 'Task not found' },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
