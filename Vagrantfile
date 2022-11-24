Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-20.04"
  config.vm.boot_timeout = 300
  config.vm.box_check_update  = false
  config.vm.network "forwarded_port", guest: 80, host: 80, host_ip: "127.0.0.1"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.name = "vagrant-multi-app-server"

    # fix hang when 'SSH auth method: private key'
    vb.customize ["modifyvm", :id, "--cableconnected1", "on"]
    # vb.customize ["modifyvm", :id, "--vram", "128"]
    vb.customize ["modifyvm", :id, "--uart1", "0x3F8", "4"]
    vb.customize ["modifyvm", :id, "--uartmode1", "file", File::NULL]
  end

  # https://gist.github.com/jowave/9f9059cd79bd8e59398ac5f7fe7b6218
  compose_env = Hash.new
  if File.file?('.env.production.local')
    # read lines "var=value" into hash
    compose_env = Hash[*File.read('.env.production.local').split(/[=\n]+/)]
    # ignore keys (lines) starting with #
    compose_env.delete_if { |key, value| key.to_s.match(/^#.*/) }
  end

  config.vm.provision :docker
  config.vm.provision :docker_compose,
    yml:[
      "/vagrant/docker-compose.yml",
      "/vagrant/docker-compose.prod.yml",
    ],
    rebuild: true,
    env: compose_env,
    run: "always"

  config.vm.provision :hosts do |provisioner|
    provisioner.add_host '127.0.0.1', [
      'multi-app.local',
      'about.multi-app.local',
      'strapi.multi-app.local',
    ]
  end
end
