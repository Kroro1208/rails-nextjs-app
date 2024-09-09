# rubocop:disable all
# frozen_string_literal: true

module Api
  module V1
    module Current
      class ArticlesController < Api::V1::BaseController
        before_action :authenticate_user!
        def create
          unsaved_article = current_user.articles.unsaved.first || current_user.articles.create!(status: :unsaved)
          render json: unsaved_article
        end
      end
    end
  end
end
# rubocop:enable all
