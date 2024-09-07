# frozen_string_literal: true

# Module to provide a fake session for Devise in API-only mode
# This is a workaround for using Devise with API-only Rails applications
module DeviseHackFakeSession
  extend ActiveSupport::Concern

  # FakeSession class to mimic a session hash for Devise
  # This allows Devise to function in API-only mode where sessions are typically not available
  class FakeSession < Hash
    def enabled?
      false
    end

    def destroy; end
  end

  included do
    before_action :set_fake_session

    private

    def set_fake_session
      return unless Rails.configuration.respond_to?(:api_only) && Rails.configuration.api_only

      request.env['rack.session'] ||= ::DeviseHackFakeSession::FakeSession.new
    end
  end
end
