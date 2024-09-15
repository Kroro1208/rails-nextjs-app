# rubocop:disable all
# frozen_string_literal: true

module Api
  module V1
    module User
      class ConfirmationsController < Api::V1::BaseController
        def update
          user = ::User.find_by(confirmation_token: params[:confirmation_token])
          return render json: { message: 'ユーザーが見つかりません' }, status: :not_found if user.nil?
          return render json: { message: 'ユーザーは既に認証済みです' }, status: :bad_request if user.confirmed?

          user.update!(confirmed_at: Time.current)
          render json: { message: 'ユーザー認証に成功しました' }, status: :ok
        end
      end
    end
  end
end
# rubocop:anable all
