class CreateZoneStatuses < ActiveRecord::Migration
  def change
    create_table :zone_statuses do |t|
      t.integer :zone
      t.integer :status
      t.datetime :stamp

      t.timestamps
    end
  end
end
