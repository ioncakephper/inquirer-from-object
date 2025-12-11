# inquirer-from-object

[![npm version](https://img.shields.io/npm/v/inquirer-from-object)](https://www.npmjs.com/package/inquirer-from-object)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

`inquirer-from-object` is a utility library that simplifies the process of creating interactive command-line prompts with Inquirer.js. It dynamically generates an array of Inquirer.js question objects from a given JavaScript configuration object, making it easy to build complex, data-driven CLI interactions. This library is ideal for scaffolding tools, configuration wizards, and any application that requires user input to populate a configuration structure.

By automatically inferring question types, supporting nested objects, and providing customizable message formatting, `inquirer-from-object` streamlines the development of interactive prompts and reduces boilerplate code.

## Key Features

- **Dynamic Question Generation:** Automatically creates Inquirer.js questions based on a given JavaScript object.
- **Type Inference:** Infers question types (text, number, confirm) from the JavaScript object's property values.
- **Nested Object Support:** Recursively generates questions for properties within nested objects, creating dot-separated names (e.g., `author.name`).
- **Customizable Messages:** Provides default question messages that are clear and informative, including value types.

## Installation

```bash
npm install inquirer-from-object
# or
yarn add inquirer-from-object
```

## Usage

Here's a basic example of how to use `inquirer-from-object` to generate and prompt for answers based on a configuration object:

```javascript
import inquirer from 'inquirer';
import createPromptQuestions from 'inquirer-from-object';

const config = {
  name: 'My Awesome Project',
  version: '1.0.0',
  isPublic: true,
  author: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  license: 'MIT',
  main: 'index.js',
  test: {
    run: false,
    coverage: 0,
  },
  nested: {
    property: 'nested value',
    anotherProp: 123,
    isActive: true,
  },
};

/**
 * Asynchronously generates Inquirer.js questions from a given configuration object
 * and prompts the user for answers.
 * @param {object} config - The configuration object used to generate questions.
 * @returns {Promise<object>} A promise that resolves with an object containing the user's answers.
 */
async function getAnswers(config) {
  const questions = createPromptQuestions(config);
  const answers = await inquirer.prompt(questions);
  return answers;
}

/**
 * The main function that orchestrates the question generation and prompting process.
 * It calls `getAnswers` to collect user input and then logs the collected answers.
 * @returns {Promise<void>}
 */
async function main() {
  const answers = await getAnswers(config);
  console.log('Collected Answers:');
  console.log(JSON.stringify(answers, null, '  '));
  // Now you can do more with the answers
}

main();
```

To run this example, save it as `example.js` and execute `node example.js`.

## API Reference

### `createPromptQuestions(data, prefix = '', formatMessage)`

Generates an array of Inquirer.js question objects from a given data object.

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| `data` | `Object` | The configuration object from which to generate questions. | `required` |
| `prefix` | `string` | A string to prepend to the `name` of the generated questions. Useful for nested objects to create hierarchical names (e.g., `parent.child`). | `''` |
| `formatMessage`| `Function` | A custom function to format the question message. It receives two arguments: `type` (the inferred Inquirer.js question type) and `name` (the full name of the property, including prefix). | `defaultFormatMessage` |

**Returns:** `Array<Object>` - An array of Inquirer.js question objects.

## Contributing

We welcome contributions to `inquirer-from-object`! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute, report bugs, and suggest new features.

## License

This project is open source and licensed under the [MIT License](LICENSE). You can find the full license text in the `LICENSE` file in the root of this repository.