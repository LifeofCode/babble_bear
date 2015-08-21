class AddEnglishToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :english_word, :string
  end
end
