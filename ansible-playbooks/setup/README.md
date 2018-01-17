# This is the ansible playbook to setup VM(s) as application servers for ExomeSlicer

This will set up a RHEL7 server to run as an application server for ExomeSlicer.

Tasks:
1. Install RHEL7 dependencies
1. Installs and configures NGINX
1. Pulls down the latest source code from GitHub
1. Configures gunicorn service

### Requirements

1. You have sudo rights on the hosts

### What you need to provide as extra-vars:

1. secret_key: Django SECRET_KEY
1. mailgun_api_key

### How to run

```
ansible-playbook setup.yml -i hosts -l <host> -u <user> -k -K --extra-vars "secret_key= mailgun_api_key="
```
