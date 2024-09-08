# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Article, type: :model do
  let(:user) { create(:user) } # トップレベルで宣言

  context 'factoryのデフォルト設定の場合' do
    it '正常にレコードを作成できる' do
      expect { create(:article) }.to change(Article, :count).by(1)
    end
  end

  describe 'Validations' do
    let(:article) { build(:article, title: title, content: content, status: status, user: user) }
    let(:title) { Faker::Lorem.sentence }
    let(:content) { Faker::Lorem.paragraph }
    let(:status) { :published }

    context '全ての値が正常な時' do
      it '検証が成功する' do
        expect(article).to be_valid
      end
    end

    context 'ステータスが公開済みかつタイトルが空の時' do
      let(:title) { '' }
      it 'エラーメッセージを返す' do
        article.valid?
        expect(article.errors.full_messages).to include('タイトルを入力してください')
      end
    end

    context 'ステータスが公開済みかつ本文が空の時' do
      let(:content) { '' }
      it 'エラーメッセージを返す' do
        article.valid?
        expect(article.errors.full_messages).to include('本文を入力してください')
      end
    end

    context 'ステータスが未保存かつ既にユーザーが未保存ステータスの記事を保有していた場合' do
      let(:status) { :unsaved }
      before { create(:article, status: :unsaved, user: user) }
      it '例外を発生させる' do
        expect { article.save! }.to raise_error(StandardError, '未保存の記事は一つしか保有できません')
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
