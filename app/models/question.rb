class Question < ActiveRecord::Base

  validates :word, :word_image, presence: true
end
