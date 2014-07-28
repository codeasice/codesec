class AddXToZone < ActiveRecord::Migration
  def change
    add_column :zones, :x, :integer
  end
end
