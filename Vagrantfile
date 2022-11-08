Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-20.04"
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

  config.vm.provision :docker
  config.vm.provision :docker_compose, yml: "/vagrant/docker-compose.yml", rebuild: true, run: "always"

  config.vm.provision :hosts do |provisioner|
    provisioner.add_host '127.0.0.1', [
      'multi-app.local',
      'about.multi-app.local'
    ]
  end
end
