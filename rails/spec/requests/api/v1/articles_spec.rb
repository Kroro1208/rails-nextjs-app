# rubocop:disable Metrics/BlockLength
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Articles', type: :request do
  shared_examples 'レスポンスのフォーマットをチェックする' do |current_page|
    it '期待されるフォーマットとステータスコードで応答する' do
      subject
      json_response = JSON.parse(response.body)

      expect(json_response.keys).to eq(%w[articles meta])
      expect(json_response['articles'].length).to eq 10
      expect(json_response['articles'][0].keys).to eq(%w[id title content status created_at from_today user])
      expect(json_response['articles'][0]['user'].keys).to eq(['name'])
      expect(json_response['meta'].keys).to eq(%w[current_page total_pages])
      expect(json_response['meta']['current_page']).to eq current_page
      expect(json_response['meta']['total_pages']).to eq 3
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET api/v1/articles' do
    subject { get(api_v1_articles_path(params)) }

    before do
      create_list(:article, 25, status: :published)
      create_list(:article, 8, status: :draft)
    end

    context 'pageをparamsで送信しない時' do
      let(:params) { nil }
      it_behaves_like 'レスポンスのフォーマットをチェックする', 1
    end

    context 'pageをparamsで送信した時' do
      let(:params) { { page: 2 } }
      it_behaves_like 'レスポンスのフォーマットをチェックする', 2
    end
  end

  describe 'GET api/v1/articles/:id' do
    subject { get(api_v1_article_path(article_id)) }
    let(:article) { create(:article, status:) }

    shared_examples '記事が見つからない' do
      it 'ActiveRecord::RecordNotFoundエラーが返る' do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'article_idに対するarticlesが存在する時' do
      let(:article_id) { article.id }

      context 'articlesのステータスが公開中の時' do
        let(:status) { :published }

        it '正常にレコードを取得できる' do
          subject
          json_response = JSON.parse(response.body)
          expect(json_response.keys).to eq(%w[id title content status created_at from_today user])
          expect(json_response['user'].keys).to eq(['name'])
          expect(response).to have_http_status(:ok)
        end
      end

      context 'articlesのステータスが下書きの時' do
        let(:status) { :draft }
        it_behaves_like '記事が見つからない'
      end
    end

    context 'article_idに対するarticlesが存在しない時' do
      let(:article_id) { 10_000_000_000 }
      it_behaves_like '記事が見つからない'
    end
  end
end
# rubocop:enable Metrics/BlockLength
