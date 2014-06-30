require 'faye'
require 'eventmachine'
bayeux = Faye::RackAdapter.new(:mount => '/faye', :timeout => 25)
run bayeux
