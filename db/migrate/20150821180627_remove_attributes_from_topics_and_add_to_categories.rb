class RemoveAttributesFromTopicsAndAddToCategories < ActiveRecord::Migration
  def change
    remove_column :topics, :color, :string
    add_column :categories, :color, :string
    add_column :categories, :description, :string
  end
end
