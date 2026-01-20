const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL || 'superadmin@example.com';

const SUPERADMIN_EMAILS = [
  process.env.SUPERADMIN_EMAIL || 'superadmin@example.com',
];

const isSuperAdminEmail = (email) => {
  return SUPERADMIN_EMAILS.some(saEmail =>
    email.toLowerCase() === saEmail.toLowerCase()
  );
};

module.exports = { SUPERADMIN_EMAIL, SUPERADMIN_EMAILS, isSuperAdminEmail };

