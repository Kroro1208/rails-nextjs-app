# frozen_string_literal: true

# Base controller for the application
# Includes necessary modules for authentication and session management
class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include DeviseHackFakeSession
end
