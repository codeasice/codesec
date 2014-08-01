desc "Start a local faye server"
namespace :faye do
  task :start do
    system 'rackup lib/faye_server.ru -E Development -s thin'
  end
end

