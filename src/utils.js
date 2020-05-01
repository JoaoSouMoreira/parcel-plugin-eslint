export const buildMessage = (message) => {
  let severity = '';
  if (message.fatal) {
    severity = 'error';
  } else {
    severity = message.severity === 2 ? 'error' : 'warning';
  }
  return `\n\n${message.line}:${message.column} ${severity} ${message.message} ${message.ruleId}`;
}

export const grabErrors = (results) => {
  const fatalErrors = [];
  const warnings = [];

  if (results.length > 0) {
    results.forEach(result => (
      result.messages.forEach((message) => {
        if (message.fatal || message.severity === 2) {
          fatalErrors.push(message);
          return;
        }
        warnings.push(message);
      })
    ));
  }

  return { fatalErrors, warnings };
}
