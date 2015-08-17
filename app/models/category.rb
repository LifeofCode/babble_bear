class Category < ActiveRecord::Base
  
  has_many :topics

  validates :name, presence: true

end