#############################################################
# Servers
#############################################################

# set the remote directory name ( assumed in /var/www/ see :deploy_to)
set :application, "advantage.bell.ca"

# What is the url of the server / load balancer?
set :lb_webserver, "Production-BBA-en"

role :web do
	ENV['TARGET'] || fetch_from_ec2_loadbalancer
end

# What is the directory path used to store your project on the remote server?
set :deploy_to, "/var/www/#{application}"

# What is the branch in your Git repository that will be deployed to the development server?
set :branch, 'master'


#############################################################
# Tasks
#############################################################

namespace :custom do  
  desc "Run a task to install tmp directories for caching"  
  task :min do  
    run("php /var/www/#{application}/current/shell/install.php")  
  end  
end

# Remove older realeases. By default, it will remove all older then the 5th.
after :deploy, 'deploy:cleanup'
after "deploy:cleanup","custom:min"