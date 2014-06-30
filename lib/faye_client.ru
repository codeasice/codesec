require 'faye'
require 'json'
require 'eventmachine'

EM.run {
  client = Faye::Client.new('http://localhost:9292/faye')

  client.subscribe('/messages/new') do |message|
    puts message.inspect
  end
  client.subscribe('/messages/zonestatus') do |message|
    my_hash = JSON.parse(message)
    	stamp = my_hash["stamp"]
    	zone = my_hash["zone"]
    	status = my_hash["status"]
    	zs = ZoneStatus.new
	zs.zone = zone
	zs.status = status
	zs.stamp = stamp
	zs.save

	puts "Zone Status saved:" + my_hash["stamp"]+" : "+my_hash["zone"]

  end

  client.publish('/messages/new', 'text' => 'Hello world')
}
puts "Doneish"
