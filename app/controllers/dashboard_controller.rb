class DashboardController < ApplicationController
  before_action :authenticate_user!
  def home
  end
 
  def sparklines
  @zones = ZoneStatus.select('zone').group('zone')
  @zones.each do |zone|
    @zone_statuses = ZoneStatus.where("zone = ? and status =1 and julianday(datetime('now')) - julianday( created_at) < 1", zone.zone).group("strftime('%H', created_at)").count
    @data = @zone_statuses.values
    for hour in 0..24
      if(@data[hour].nil?) 
        @data[hour] = 0
      end
    end
    #@data =  [166,136,54,34,140,75,68,40,42,194]
    Sparklines.plot_to_file("app/assets/images/sparkline"+zone.zone.to_s+".png", @data,                              
    {
      :type => 'smooth',
      :step => 8,
      :height => 20, 
      :line_color => 'white',
      :above_color => 'black',
      :upper => 0,
      :underneath_color => 'black',
      :background_color => 'black'
     })
    end

  end 
end
