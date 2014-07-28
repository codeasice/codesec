class AddHeightToZone < ActiveRecord::Migration
  def change
    add_column :zones, :height, :integer
  end
end
