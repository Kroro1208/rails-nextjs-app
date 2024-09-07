# frozen_string_literal: true

# Devise configuration
Devise.setup do |config|
  # The secret key used by Devise. Devise uses this key to generate
  # random tokens. Changing this key will render invalid all existing
  # confirmation, reset password and unlock tokens in the database.
  # config.secret_key = '1d188f2637bd98b1f89d10d878a409f02d627e3365d25c34fe4bdae0a758b25c' \
  #                     '10852f54d15069ed05342090ac4b96986629c2cbd90cb74d4653c4ec4e831735'

  # Configure the e-mail address which will be shown in Devise::Mailer
  config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'

  # Configure the ORM. Supports :active_record (default) and :mongoid
  require 'devise/orm/active_record'

  # Configure case-insensitive keys
  config.case_insensitive_keys = [:email]

  # Configure whitespace stripping for keys
  config.strip_whitespace_keys = [:email]

  # Configure session storage skipping
  config.skip_session_storage = [:http_auth]

  # Configure the number of stretches used for password hashing
  config.stretches = Rails.env.test? ? 1 : 12

  # Set up a pepper to generate the hashed password.
  # config.pepper = 'aca2c2af02eb8c5974152d8f130392d5ccb2a69d0a087c04522dc2cd981f1ecc' \
  #                 '75d20743be3aeb8a7f6063e319f9872fae333197875120e4408a55dff3611a43'

  # Enable reconfirmable module
  config.reconfirmable = true

  # Configure remember me expiration
  config.expire_all_remember_me_on_sign_out = true

  # Configure password length
  config.password_length = 6..128

  # Configure email format
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/

  # Configure reset password time window
  config.reset_password_within = 6.hours

  # Configure sign out HTTP method
  config.sign_out_via = :delete

  # Configure Devise responder
  config.responder.error_status = :unprocessable_entity
  config.responder.redirect_status = :see_other
end
