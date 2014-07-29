class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.string :fayeURL
      t.string :floorplan

      t.timestamps
    end
  end
end
