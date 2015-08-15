class AddCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.string :example_pic
      t.timestamps null: false
    end

    add_reference :topics, :category, index: true 
  end
end
