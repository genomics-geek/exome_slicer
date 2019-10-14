# This is the ansible playbook to setup VM(s) as application servers for ExomeSlicer

This playbook automates the setup of ExomeSlicer application server

Tasks:
1. Install RHEL7 dependencies
1. Installs and configures NGINX
1. Pulls down the latest source code from GitHub
1. Builds the latest frontend React code
1. Migrates the database if any model changes exist
1. Configures services (gunicorn, nginx)

### Requirements

1. You have sudo rights on the hosts
1. Currently only supports deployment to RHEL7 server

### Before you deploy anything the following must be done

1. Create file called `vault-password.txt` that contains the password to decrypt deployment secrets.  (Ask for vault password!)

### How to run

#### Very first deployment

```
ansible-playbook \
  main.yml \
  -i hosts \
  -l <environment> \
  -u <username> \
  -K \
  -k \
  --vault-password-file vault-password.txt \
  --tags setup
```

#### Deploy latest version of ExomeSlicer

```
ansible-playbook \
  main.yml \
  -i hosts \
  -l <environment> \
  -u <username> \
  -K \
  -k \
  --vault-password-file vault-password.txt \
  --tags update
```


#### Deploy your branch to a test environment

```
ansible-playbook \
  main.yml \
  -i hosts \
  -l test \
  -u <username> \
  -K \
  -k \
  --vault-password-file vault-password.txt \
  --tags update
  --extra-vars "git_branch=<your branch>"
```

#### Deploy ExomeSlicer to a webserver as a new user. (Important for new team members or running `update` deployment with a username for the first time!)

```
ansible-playbook \
  main.yml \
  -i hosts \
  -l <environment> \
  -u <username> \
  -K \
  -k \
  --vault-password-file vault-password.txt \
  --tags setup_user
```

#### If you want to run only a certain part of the deployment, use tags

```
ansible-playbook \
  main.yml \
  -i hosts \
  -l <environment> \
  -u <username> \
  -K \
  -k \
  --vault-password-file vault-password.txt \
  --tags webserver ## This will only run the tasks in the webserver role
```
