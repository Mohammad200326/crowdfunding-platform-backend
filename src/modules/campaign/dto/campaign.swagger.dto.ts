import { ApiBodyOptions } from '@nestjs/swagger';

export const createCampaignApiBody: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 2, maxLength: 100 },
      description: { type: 'string', minLength: 2, maxLength: 1000 },
      category: {
        type: 'string',
        enum: ['WATER', 'HEALTH', 'ENVIROMENT', 'FOOD', 'EDUCATION', 'SHELTER', 'ANIMALS'],
      },
      goal: { type: 'number', minimum: 1 },
      startDate: { type: 'string', format: 'date-time' },
      endDate: { type: 'string', format: 'date-time' },
      motivationMessage: { type: 'string', minLength: 2, maxLength: 1000 },
      notes: { type: 'string', maxLength: 1000 },
      likes: { type: 'number', minimum: 0 },
      file: { type: 'string', format: 'binary', description: 'Campaign image or file (optional)' },
    },
    required: [
      'title',
      'description',
      'category',
      'goal',
      'startDate',
      'endDate',
      'motivationMessage',
      'notes',
      'likes',
    ],
  },
};
