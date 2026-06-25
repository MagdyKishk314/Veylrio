import { body, validationResult } from 'express-validator';
import { Request } from 'express';
import site from '../config/site';

/**
 * Validation + sanitisation rules for the "Start a Project" inquiry form.
 *
 * Strategy:
 *  - trim everything, cap lengths (defence against oversized payloads),
 *  - escape free-text fields server-side (defence-in-depth; EJS also escapes),
 *  - normalise the email,
 *  - constrain select fields to the known option sets,
 *  - keep optional fields genuinely optional.
 */

const inSet = (value: string, set: string[]): boolean => value === '' || set.includes(value);

const rules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Please tell us your name.')
    .isLength({ max: 100 }).withMessage('Name is too long.')
    .escape(),

  body('company')
    .trim()
    .notEmpty().withMessage('Please tell us your company.')
    .isLength({ max: 120 }).withMessage('Company name is too long.')
    .escape(),

  body('email')
    .trim()
    .notEmpty().withMessage('Please enter your work email.')
    .isEmail().withMessage('Please enter a valid email address.')
    .isLength({ max: 160 }).withMessage('Email is too long.')
    .normalizeEmail({ gmail_remove_dots: false }),

  body('phone')
    .trim()
    .notEmpty().withMessage('Please add a phone or WhatsApp number.')
    .isLength({ max: 40 }).withMessage('That number looks too long.')
    .matches(/^[0-9+().\-\s]{6,40}$/).withMessage('Please enter a valid phone or WhatsApp number.'),

  body('website')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 160 }).withMessage('Website URL is too long.')
    .escape(),

  body('industry')
    .trim()
    .custom((v) => inSet(v, site.form.industries)).withMessage('Please choose an industry.')
    .escape(),

  body('outboundStatus')
    .trim()
    .optional({ checkFalsy: true })
    .custom((v) => inSet(v, site.form.outboundStatus)).withMessage('Please choose a valid option.')
    .escape(),

  body('teamSize')
    .trim()
    .custom((v) => inSet(v, site.form.teamSizes)).withMessage('Please choose a team size.')
    .escape(),

  body('stack')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 160 }).withMessage('That answer is too long.')
    .escape(),

  body('needs')
    .trim()
    .notEmpty().withMessage('Tell us what you need help with.')
    .isLength({ max: 2000 }).withMessage('Please keep this under 2000 characters.')
    .escape(),

  body('broken')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 2000 }).withMessage('Please keep this under 2000 characters.')
    .escape(),

  body('contactMethod')
    .trim()
    .custom((v) => inSet(v, site.form.contactMethods)).withMessage('Please choose a contact method.')
    .escape(),

  body('timeline')
    .trim()
    .custom((v) => inSet(v, site.form.timelines)).withMessage('Please choose a timeline.')
    .escape(),

  body('budget')
    .trim()
    .optional({ checkFalsy: true })
    .custom((v) => inSet(v, site.form.budgetRanges)).withMessage('Please choose a valid budget range.')
    .escape(),

  // Honeypot: must stay empty. Bots tend to fill every field.
  body('_hp_company_url')
    .optional()
    .isLength({ max: 0 }).withMessage('Spam detected.'),
];

function collectErrors(req: Request): Record<string, string> | null {
  const result = validationResult(req);
  if (result.isEmpty()) return null;
  const errors: Record<string, string> = {};
  for (const e of result.array({ onlyFirstError: true })) {
    if (e.type === 'field') errors[e.path] = String(e.msg);
  }
  return errors;
}

export { rules, collectErrors };
