codesec
===========
Display security zone alerts overlaid on floorplans

Todo
-------------
Much
Auth
Encryption


Cheat Sheet
-------------
nc 192.168.1.38 1500 | script/rails runner lib/inserter.rb

rackup faye_server.ru -E Development -s thin
script/rails runner faye_client.ru

curl http://localhost:9292/faye -d 'message={"channel":"/messages/new", "data":"hello"}'
curl http://localhost:9292/faye -d 'message={"channel":"/messages/zonestatus", "data":"{\"zone\":\"6\", \"stamp\":\"2014-02-08T16:33:24Z\"}"}'
