class AddYToZone < ActiveRecord::Migration
  def change
    add_column :zones, :y, :integer
  end
end
