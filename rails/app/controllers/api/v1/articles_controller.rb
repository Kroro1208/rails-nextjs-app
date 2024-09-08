# rubocop:disable all
# frozen_string_literal: true

module Api
  module V1
    class ArticlesController < ApplicationController
      def show
        article = Article.published.find(params[:id]) # Article.where(status: "published")と同じ
        render json: article
      end
    end
  end
end
# rubocop:enable all
