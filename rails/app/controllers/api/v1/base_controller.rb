# frozen_string_literal: true

module Api
  module V1
    # Base controller for API V1 endpoints
    # Provides common functionality and authentication methods for API controllers
    class BaseController < ApplicationController
      alias current_user current_api_v1_user
      alias authenticate_user! authenticate_api_v1_user!
      alias user_signed_in? api_v1_user_signed_in?
    end
  end
end
