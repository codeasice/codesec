class AddZoneIdToZones < ActiveRecord::Migration
  def change
    add_column :zones, :zone_id, :integer
  end
end
