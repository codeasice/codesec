# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
settings = Setting.create(fayeURL: 'http://192.168.1.77:9292/faye', floorplan: 'Some Floorplan');
zone = Zone.create(zone_id: 6,name: 'Kitchen', div: 'kitchen',x: 550,y: 102,width: 70,height: 135);
zone = Zone.create(zone_id: 5,name: 'Office', div: 'office',x: 550,y: 237,width: 70,height: 40);
zone = Zone.create(zone_id: 7,name: 'Living Rm', div: 'living_room',x: 622,y: 102,width: 122,height: 75);
zone = Zone.create(zone_id: 100,name: 'Back Porch', div: 'back_porch',x: 500,y: 150,width: 50,height: 85);
zone = Zone.create(zone_id: 101,name: 'Carport', div: 'carport',x: 608,y: 38,width: 136,height: 61);
