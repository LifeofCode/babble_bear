class Level < ActiveRecord::Base

  has_many :questions
  belongs_to :topic
  
  validates :number, presence: true

end
