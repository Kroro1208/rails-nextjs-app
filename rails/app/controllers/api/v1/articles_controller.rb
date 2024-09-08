# rubocop:disable all
# frozen_string_literal: true

module Api
  module V1
    class ArticlesController < ApplicationController
      include Pagination

      def index
        articles = Article.published.order(created_at: :desc).page(params[:page] || 1).per(10).includes(:user)
        render json: articles, meta: pagination(articles), adapter: :json
      end


      def show
        article = Article.published.find(params[:id]) # Article.where(status: "published")と同じ
        render json: article
      end
    end
  end
end
# rubocop:enable all
