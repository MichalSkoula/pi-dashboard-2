# This Python file uses the following encoding: utf-8
#!/usr/bin/env python

import os
import cron_config
from shutil import copyfile
import time
from paramiko import SSHClient
from scp import SCPClient
import paramiko
from subprocess import check_output

# run node script
p = check_output(['node', 'app.js'])
print (p)

# copy to local webserver
copyfile('teco_result.json', cron_config.local_webserver + "/teco_result.json")

# upload to real webserver 
ssh = SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(cron_config.ssh['host'], username=cron_config.ssh['username'], password=cron_config.ssh['password'])

with SCPClient(ssh.get_transport()) as scp:
    scp.put(cron_config.local_webserver + '/teco_result.json', cron_config.ssh['remote_path'] + '/teco_result.json')
