import inquirer from 'inquirer';
import createPromptQuestions from '../src/index.js';

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
