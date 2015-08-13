class CreateTables < ActiveRecord::Migration
  def change
      create_table :topics do |t|
         t.string :name
         t.timestamps null: false
      end

      create_table :levels do |t|
         t.integer :number
         t.references :topic, index: true
         t.timestamps null: false
      end

      create_table :questions do |t|
         t.string :word
         t.string :word_image
         t.references :level, index: true
         t.timestamps null: false         
      end

      create_table :users do |t|
         t.string :first_name
         t.string :last_name
         t.string :email
         t.string :profile_image
         t.integer :animals_level
         t.integer :fruits_level
      end
  end
end
