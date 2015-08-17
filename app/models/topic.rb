class Topic < ActiveRecord::Base

  has_many :levels
  belongs_to :category
  
  validates :name, presence: true

end