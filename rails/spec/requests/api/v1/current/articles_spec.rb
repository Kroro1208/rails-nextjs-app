# rubocop:disable Metrics/BlockLength
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Current::Articles', type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }

  describe 'POST api/v1/current/articles' do
    subject { post(api_v1_current_articles_path, headers:) }

    context 'ログインユーザーの紐づく未保存の記事が0件の時' do
      it '未保存の記事が新規作成される' do
        expect { subject }.to change { current_user.articles.unsaved.count }.by(1)
        expect(response).to have_http_status(:ok)
        expect(json_response.keys).to match_array(%w[id title content status created_at from_today user])
        expect(json_response['user'].keys).to eq ['name']
      end
    end

    context 'ログインユーザーの紐づく未保存の記事が1件の時' do
      before { create(:article, user: current_user, status: :unsaved) }

      it '未保存の記事が新規作成されない' do
        expect { subject }.not_to(change { current_user.articles.count })
        expect(response).to have_http_status(:ok)
        expect(json_response.keys).to match_array(%w[id title content status created_at from_today user])
        expect(json_response['user'].keys).to eq ['name']
      end
    end
  end

  describe 'PATCH api/v1/current/articles' do
    subject { patch(api_v1_current_article_path(id), headers:, params:) }

    let(:params) do
      { article: { title: 'テストタイトル2', content: 'テスト本文2', status: 'published' } }
    end

    context ':idがログインユーザーに紐づくarticlesのidと一致する時' do
      let(:article) do
        create(:article, title: 'テストタイトル', content: 'テスト本文1', status: :draft, user: current_user)
      end
      let(:id) { article.id }

      it '記事の更新に成功する' do
        expect { subject }.to change { article.reload.attributes.values_at('title', 'content', 'status') }
          .from(%w[テストタイトル テスト本文1 draft])
          .to(%w[テストタイトル2 テスト本文2 published])

        expect(response).to have_http_status(:ok)
        expect(json_response.keys).to match_array(%w[id title content status created_at from_today user])
        expect(json_response['user'].keys).to eq ['name']
      end
    end

    context ':idがログインユーザーに紐づくarticlesのidと一致しない時' do
      let(:id) { create(:article, user: create(:user)).id }

      it '例外を投げる' do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  def json_response
    @json_response ||= JSON.parse(response.body)
  end
end
# rubocop:enable Metrics/BlockLength
