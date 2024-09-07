# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Current::Users', type: :request do
  describe 'GET api/v1/current/user' do
    subject { get(api_v1_current_user_path, headers:) } # GETリクエスト定義
    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token } # current_userのログインに必要なトークン情報を生成し、headersへの格納を定義

    context 'ヘッダー情報が正常に送られた場合' do
      it '正常にレコードが取得できる' do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq(%w[id name email])
        expect(response).to have_http_status(:ok)
      end
    end

    context 'ヘッダー情報が空のままリクエストが送信された場合' do
      let(:headers) { nil }
      it 'unauthorrizedを返す' do
        subject
        res = JSON.parse(response.body)
        expect(res['errors']).to eq['ログインもしくはアカウントを登録してください']
        expect(response).to have_http_status(:unauthorrized)
      end
    end
  end
end
