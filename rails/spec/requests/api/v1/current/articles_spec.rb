# rubocop:disable Metrics/BlockLength
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Current::Articles', type: :request do
  describe 'GET api/v1/current/articles' do
    subject { get(api_v1_current_articles_path, headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:other_user) { create(:user) }

    before { create_list(:article, 2, user: other_user) }

    context 'ログインユーザーに紐づくarticlesが存在する場合' do
      before { create_list(:article, 3, user: current_user) }

      it 'articlesの取得に成功する' do
        subject
        res = JSON.parse(response.body)
        expect(res.length).to eq 3 # 配列の長さをチェック
        expect(res[0].keys).to eq(%w[id title content status created_at from_today user]) # 配列の最初の要素のキーをチェック
        expect(response).to have_http_status(:ok)
      end
    end

    context 'ログインユーザーに紐づくarticlesが存在しない場合' do
      it '空の配列を返す' do
        subject
        res = JSON.parse(response.body)
        expect(res).to eq([])
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'GET api/v1/current/articles/:id' do # パスにidを含める
    subject { get(api_v1_current_article_path(id), headers:) } # 個別の記事を取得するパスに変更

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:other_user) { create(:user) }

    context ':idがログインユーザーに紐づくarticlesのidと一致する場合' do
      let(:current_user_article) { create(:article, user: current_user) }
      let(:id) { current_user_article.id }

      it 'articleの取得に成功する' do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq(%w[id title content status created_at from_today user]) # 単一の記事なのでkeysを直接チェック
        expect(res['user'].keys).to eq(['name'])
        expect(response).to have_http_status(:ok)
      end
    end

    context ':idがログインユーザーに紐づくarticlesと一致しない場合' do
      let(:other_user_article) { create(:article, user: other_user) }
      let(:id) { other_user_article.id }

      it '例外を返す' do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe 'POST api/v1/current/articles' do
    subject { post(api_v1_current_articles_path, headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }

    context 'ログインユーザーの紐づく未保存の記事が0件の時' do
      it '未保存の記事が新規作成される' do
        expect { subject }.to change { current_user.articles.count }.by(1)
        expect(current_user.articles.last).to be_unsaved
        res = JSON.parse(response.body)
        expect(res.keys).to eq(%w[id title content status created_at from_today user])
        expect(res['user'].keys).to eq ['name']
        expect(response).to have_http_status(:ok)
      end
    end

    context 'ログインユーザーの紐づく未保存の記事が1件の時' do
      before { create(:article, user: current_user, status: :unsaved) }

      it '未保存の記事が新規作成される' do
        expect { subject }.not_to(change { current_user.articles.count })
        res = JSON.parse(response.body)
        expect(res.keys).to eq(%w[id title content status created_at from_today user])
        expect(res['user'].keys).to eq ['name']
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'PATCH api/v1/current/articles' do
    subject { patch(api_v1_current_article_path(id), headers:, params:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:other_user) { create(:user) }
    let(:params) { { 'article': { "title": 'テストタイトル2', "content": 'テスト本文2', "status": 'published' } } }

    context ':idがログインユーザーに紐づくarticlesのidと一致する時' do
      let(:current_user_article) do
        create(:article, title: 'テストタイトル', content: 'テスト本文1', status: :draft, user: current_user)
      end
      let(:id) { current_user_article.id }

      it '記事の更新に成功する' do
        expect { subject }.to change { current_user_article.reload.title }.from('テストタイトル').to('テストタイトル2') and
          change { current_user_article.reload.content }.from('テスト本文').to('テスト本文2') and
          change { current_user_article.reload.status }.from('draft').to('piblished')
        res = JSON.parse(response.body)
        expect(res.keys).to eq(%w[id title content status created_at from_today user])
        expect(res['user'].keys).to eq ['name']
        expect(response).to have_http_status(:ok)
      end
    end

    context ':idがログインユーザーに紐づくarticlesのidと一致しない時' do
      let(:other_user_article) { create(:article, user: other_user) }
      let(:id) { other_user_article.id }

      it '例外を投げる' do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
