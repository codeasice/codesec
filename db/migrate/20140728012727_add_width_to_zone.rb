class AddWidthToZone < ActiveRecord::Migration
  def change
    add_column :zones, :width, :integer
  end
end
