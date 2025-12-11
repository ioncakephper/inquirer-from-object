/**
 * @name defaultFormatMessage
 * @description Generates a default message for an interactive prompt based on its type and name.
 * @pre type - The type of the Inquirer.js question (e.g., 'confirm', 'text').
 * - Must be a non-empty string.
 * @pre name - The name of the property for which the question is being generated.
 * - Must be a non-empty string.
 * @post
 * - Returns a string formatted as a question.
 * - If the type is 'confirm', the message will ask for a 'yes/no' confirmation.
 * - Otherwise, the message will prompt the user to enter a value.
 */
const defaultFormatMessage = (type, name) =>
  type === 'confirm'
    ? `Confirm ${name} (yes/no)?`
    : `Please enter a ${type} value for ${name}:`;

/**
 * @name createPromptQuestions
 * @description Generates an array of Inquirer.js question objects from a given data object.
 * @param {object} data - The configuration object from which to generate questions.
 * @param {string} [prefix=''] - A string to prepend to the `name` of the generated questions.
 *   Useful for nested objects to create hierarchical names (e.g., `parent.child`).
 * @param {function(string, string): string} [formatMessage=defaultFormatMessage] - A custom function to format the question message.
 *   It receives two arguments: `type` (the inferred Inquirer.js question type) and `name` (the full name of the property, including prefix).
 * @pre data - The configuration object from which to generate questions.
 * - Must be an object.
 * @pre prefix - A string to prepend to the `name` of the generated questions.
 * - Must be a string.
 * @pre formatMessage - A custom function to format the question message.
 * - Must be a function that accepts a `type` (string) and `name` (string) and returns a string.
 * @post
 * - Returns an array of Inquirer.js question objects.
 * - If the input `data` object is empty, returns an empty array.
 * - Recursively processes nested objects to create questions for all properties.
 * - The `type` of each question is inferred from the type of the property's value (e.g., 'text' for string, 'confirm' for boolean, 'number' for number).

* @returns {Array<object>} An array of Inquirer.js question objects.
*/
function createPromptQuestions(
  data = {},
  prefix = '',
  formatMessage = defaultFormatMessage
) {
  const questions = [];

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const value = data[key];
      const name = prefix ? `${prefix}.${key}` : key;

      if (value === null) {
        questions.push({
          type: 'text',
          name,
          message: formatMessage('text', name),
          default: null,
        });
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Recurse into nested objects
        questions.push(...createPromptQuestions(value, name, formatMessage));
      } else {
        let type;
        switch (typeof value) {
          case 'string':
            type = 'text';
            break;
          case 'boolean':
            type = 'confirm';
            break;
          case 'number':
            type = 'number';
            break;
          default:
            type = 'text';
        }

        questions.push({
          type,
          name,
          message: formatMessage(type, name),
          default: value,
        });
      }
    }
  }

  return questions;
}

export default createPromptQuestions;
