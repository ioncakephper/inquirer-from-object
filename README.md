# inquirer-from-object

[![npm version](https://img.shields.io/npm/v/inquirer-from-object)](https://www.npmjs.com/package/inquirer-from-object)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A library to dynamically generate Inquirer.js questions from a configuration object, supporting various data types and nested structures.

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
import { createPromptQuestions } from 'inquirer-from-object';

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

async function runPrompt() {
  const questions = createPromptQuestions(config);
  const answers = await inquirer.prompt(questions);
  console.log('Collected Answers:');
  console.log(JSON.stringify(answers, null, '  '));
}

runPrompt();
```

To run this example, save it as `example.js` and execute `node example.js`.

## API Reference

### `createPromptQuestions(data, prefix = '', formatMessage)`

Generates an array of Inquirer.js question objects from a given data object.

- `data` (`Object`, required): The configuration object from which to generate questions.
- `prefix` (`string`, optional): A string to prepend to the `name` of the generated questions. Useful for nested objects to create hierarchical names (e.g., `parent.child`). Defaults to an empty string.
- `formatMessage` (`Function`, optional): A custom function to format the question message. It receives two arguments: `type` (the inferred Inquirer.js question type) and `name` (the full name of the property, including prefix).
  - Default `formatMessage`:
    ```javascript
    (type, name) =>
      type === 'confirm'
        ? `Confirm ${name} (yes/no)?`
        : `Please enter a ${type} value for ${name}:`;
    ```

**Returns:** `Array<Object>` - An array of Inquirer.js question objects.

## Contributing

We welcome contributions to `inquirer-from-object`! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute, report bugs, and suggest new features.

## License

This project is open source and licensed under the [MIT License](LICENSE). You can find the full license text in the `LICENSE` file in the root of this repository.
