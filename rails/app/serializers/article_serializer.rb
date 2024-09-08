# rubocop:disable all
# frozen_string_literal: true

class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at, :from_today
  belongs_to :user, serializer: UserSerializer # UserSerializerをArticleSerializerで呼び出し

  def created_at
    object.created_at.strftime('%Y/%m/%d')
  end

  def from_today
    now = Time.zone.now
    created_at = object.created_at
    # 現在の日付と記事が作成された日付の間の経過時間を計算して経過した月数と年数を算出
    months = (now.year - created_at.year) * 12 + now.month - created_at.month - (now.day >= created_at.day ? 0 : 1)
    years = months.div(12)

    return "#{years}年前" if years.positive?
    return "#{months}ヶ月前" if months.positive?

    seconds = (Time.zone.now - object.created_at).round

    days = seconds / (60 * 60 * 24)
    return "#{days}日前" if days.positive?

    hours = seconds / (60 * 60)
    return "#{hours}時間前" if hours.positive?

    minutes = seconds / 60
    return "#{minutes}分前" if minutes.positive?

    "#{seconds}秒前"
  end
end
# rubocop:enable all
