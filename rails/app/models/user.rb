# frozen_string_literal: true

# User model for authentication and user management
# This model uses Devise for authentication and DeviseTokenAuth for token-based authentication
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, and :trackable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
  has_many :articles, dependent: :destroy
end
