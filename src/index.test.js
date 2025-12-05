// src/index.test.js
import createPromptQuestions from './index.js';
import inquirer from 'inquirer';
import { jest } from '@jest/globals';

// Force inquirer.prompt to be a mock function directly
inquirer.prompt = jest.fn();

describe('createPromptQuestions', () => {
  beforeEach(() => {
    // Clear its state
    inquirer.prompt.mockClear();
    // Default implementation
    inquirer.prompt.mockImplementation(() => Promise.resolve({}));
  });

  test('should generate correct questions for a flat object', async () => {
    const config = {
      name: 'Test Project',
      version: '1.0.0',
      isPublic: true,
    };

    // Expected questions based on the config object
    const expectedQuestions = [
      {
        type: 'text',
        name: 'name',
        message: 'Please enter a text value for name:',
        default: 'Test Project',
      },
      {
        type: 'text',
        name: 'version',
        message: 'Please enter a text value for version:',
        default: '1.0.0',
      },
      {
        type: 'confirm',
        name: 'isPublic',
        message: 'Confirm isPublic (yes/no)?',
        default: true,
      },
    ];

    const questions = createPromptQuestions(config);
    expect(questions).toEqual(expectedQuestions);

    // Simulate user answers
    inquirer.prompt.mockResolvedValueOnce({
      name: 'My New Project',
      version: '1.0.1',
      isPublic: false,
    });

    const answers = await inquirer.prompt(questions);
    expect(answers).toEqual({
      name: 'My New Project',
      version: '1.0.1',
      isPublic: false,
    });
  });

  test('should generate correct questions for a nested object', async () => {
    const config = {
      project: {
        name: 'Nested Project',
        enabled: true,
      },
      author: {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      },
    };

    const expectedQuestions = [
      {
        type: 'text',
        name: 'project.name',
        message: 'Please enter a text value for project.name:',
        default: 'Nested Project',
      },
      {
        type: 'confirm',
        name: 'project.enabled',
        message: 'Confirm project.enabled (yes/no)?',
        default: true,
      },
      {
        type: 'text',
        name: 'author.name',
        message: 'Please enter a text value for author.name:',
        default: 'Jane Doe',
      },
      {
        type: 'text',
        name: 'author.email',
        message: 'Please enter a text value for author.email:',
        default: 'jane.doe@example.com',
      },
    ];

    const questions = createPromptQuestions(config);
    expect(questions).toEqual(expectedQuestions);

    // Simulate user answers
    inquirer.prompt.mockResolvedValueOnce({
      'project.name': 'Updated Nested Project',
      'project.enabled': false,
      'author.name': 'John Smith',
      'author.email': 'john.smith@example.com',
    });

    const answers = await inquirer.prompt(questions);
    expect(answers).toEqual({
      'project.name': 'Updated Nested Project',
      'project.enabled': false,
      'author.name': 'John Smith',
      'author.email': 'john.smith@example.com',
    });
  });

  test('should handle different data types correctly', async () => {
    const config = {
      count: 10,
      isValid: false,
      description: 'A test description',
      empty: null, // Should be treated as text
      list: ['item1', 'item2'] // Should be treated as text
    };

    const expectedQuestions = [
      {
        type: 'number',
        name: 'count',
        message: 'Please enter a number value for count:',
        default: 10,
      },
      {
        type: 'confirm',
        name: 'isValid',
        message: 'Confirm isValid (yes/no)?',
        default: false,
      },
      {
        type: 'text',
        name: 'description',
        message: 'Please enter a text value for description:',
        default: 'A test description',
      },
      {
        type: 'text',
        name: 'empty',
        message: 'Please enter a text value for empty:',
        default: null,
      },
      {
        type: 'text',
        name: 'list',
        message: 'Please enter a text value for list:',
        default: ['item1', 'item2'],
      },
    ];

    const questions = createPromptQuestions(config);
    expect(questions).toEqual(expectedQuestions);

    inquirer.prompt.mockResolvedValueOnce({
      count: 20,
      isValid: true,
      description: 'New description',
      empty: 'not empty',
      list: 'item3,item4'
    });

    const answers = await inquirer.prompt(questions);
    expect(answers).toEqual({
      count: 20,
      isValid: true,
      description: 'New description',
      empty: 'not empty',
      list: 'item3,item4'
    });
  });

  test('should use custom formatMessage if provided', async () => {
    const config = {
      name: 'Custom',
      confirm: true,
    };
    const customFormatMessage = (type, name) => `Enter ${name} (${type}):`;

    const expectedQuestions = [
      {
        type: 'text',
        name: 'name',
        message: 'Enter name (text):',
        default: 'Custom',
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Enter confirm (confirm):',
        default: true,
      },
    ];

    const questions = createPromptQuestions(config, '', customFormatMessage);
    expect(questions).toEqual(expectedQuestions);
  });
});
