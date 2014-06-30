#!/usr/bin/env ruby
while line = STDIN.gets
  line_split = line.split(' ');
  if(line_split.count >= 6) 
    stamp = line_split[0] + ' ' + line_split[1];
    zone = line_split[3]
    status = line_split[5]
    puts stamp+zone+status
    zs = ZoneStatus.new
    zs.zone = zone
    zs.status = status
    zs.stamp = stamp
    zs.save
  end
end
