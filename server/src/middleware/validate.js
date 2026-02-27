// Input validation helpers
// Lightweight validation without external dependency

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validateString(str, { min = 1, max = 500 } = {}) {
  if (!str || typeof str !== 'string') return false;
  const trimmed = str.trim();
  return trimmed.length >= min && trimmed.length <= max;
}

function validateNumber(num, { min = -Infinity, max = Infinity } = {}) {
  if (num === undefined || num === null) return false;
  const n = Number(num);
  return !isNaN(n) && n >= min && n <= max;
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

// Validation middleware factory
function validate(rules) {
  return (req, res, next) => {
    const errors = [];
    for (const [field, rule] of Object.entries(rules)) {
      const value = req.body[field];
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field} is required`);
        continue;
      }
      if (value !== undefined) {
        if (rule.type === 'email' && !validateEmail(value)) errors.push(`${field} must be a valid email`);
        if (rule.type === 'string' && !validateString(value, rule)) errors.push(`${field} must be ${rule.min || 1}-${rule.max || 500} characters`);
        if (rule.type === 'number' && !validateNumber(value, rule)) errors.push(`${field} must be a number between ${rule.min} and ${rule.max}`);
        if (rule.enum && !rule.enum.includes(value)) errors.push(`${field} must be one of: ${rule.enum.join(', ')}`);
      }
    }
    if (errors.length) return res.status(400).json({ error: errors.join('. ') });
    next();
  };
}

module.exports = { validateEmail, validateString, validateNumber, sanitize, validate };
