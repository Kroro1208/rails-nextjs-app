# frozen_string_literal: true

module Api
  module V1
    module Current
      # Controller for handling requests related to the current user in API V1
      # Provides endpoints for retrieving current user information
      class UsersController < Api::V1::BaseController
        before_action :authenticate_user!

        def show
          render json: current_user
        end
      end
    end
  end
end
