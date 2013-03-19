# set the remote directory name ( assumed in /var/www/ )
set :application, "testsite.test.dev"

set :repository, "git@teehanlax.beanstalkapp.com:/bell-capistrano-testing.git"

set :aws_access_key_id, 'AKIAJEV7LJGQOQICQFNA'
set :aws_secret_access_key, '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'

set :user, "ubuntu"
set :ssh_options, {:forward_agent => true}
ssh_options[:keys] = ["~/keys/bell.pem"]

# Is sudo required to manipulate files on the remote server?
set :use_sudo, false

# How are the project files being transferred to the remote server?
set :deploy_via, :remote_cache

# Maintain a local repository cache. Speeds up the copy process.
set :copy_cache, true

# Ignore any local files?
set :copy_exclude, %w(.git)

######################################################
# Git
######################################################

# What version control solution does the project use?
set :scm, :git

#############################################################
# Stages
#############################################################
set :stages, %w(production staging development)
set :stage_dir, "config/deployments/"
set :default_stage, "staging" #if we only do “cap deploy” this will be the stage used.
require 'capistrano/ext/multistage' #yes. First we set and then we require.

#############################################################
# Tasks
#############################################################

# Remove older realeases. By default, it will remove all older then the 5th.
after :deploy, 'deploy:cleanup'



#############################################################
# Get instances from ec2 loadbalancer
#############################################################

def fetch_from_ec2_loadbalancer
    instances_for_deploy = []
    loadbalancer lb_webserver, :web
    instances_for_deploy
end