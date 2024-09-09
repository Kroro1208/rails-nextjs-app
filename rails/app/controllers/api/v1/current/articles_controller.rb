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

        def update
          article = current_user.articles.find(params[:id])
          article.update!(article_params)
          render json: article
        end

        private
        def article_params
          params.require(:article).permit(:title, :content, :status)
        end

      end
    end
  end
end
# rubocop:enable all
