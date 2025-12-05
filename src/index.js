const defaultFormatMessage = (type, name) =>
  type === 'confirm'
    ? `Confirm ${name} (yes/no)?`
    : `Please enter a ${type} value for ${name}:`;

/**
 * Generates an array of Inquirer.js question objects from a given data object.
 *
 * @param {object} data - The configuration object from which to generate questions.
 * @param {string} [prefix=''] - A string to prepend to the `name` of the generated questions.
 *   Useful for nested objects to create hierarchical names (e.g., `parent.child`).
 * @param {function(string, string): string} [formatMessage=defaultFormatMessage] - A custom function to format the question message.
 *   It receives two arguments: `type` (the inferred Inquirer.js question type) and `name` (the full name of the property, including prefix).
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
