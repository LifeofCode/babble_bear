 class AddColorsAndDescriptionToTopic < ActiveRecord::Migration
   def change
      add_column :topics, :color, :string
      add_column :topics, :description, :string
   end
 end
