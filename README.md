# dev-ops-examples
Ansible and CloudFormation examples

There are 2 examples you can start with:
1./ Run a CloudFormation Template then run Ansible inside the provisioned EC2 instance
2./ Run an Ansible Playbook then run CloudFormation from playbook using Ansible cloudformation module

Before you start these Ansible playbooks will only run if you have an Ansible environment with boto running and the latest Ansible 1.x release. Steps to get started are as follows:


``` bash
sudo easy_install pip
sudo pip install boto paramiko PyYAML Jinja2 httplib2 six
sudo pip install ansible
```
If you get stuck see http://docs.ansible.com/ansible/intro_installation.html

To run the examples:
1. CloudFormation Example
Login to AWS Console and click on CloudFormation to upload and run the CloudFormation Template.

2. Ansible Playbook Example
``` bash
cd ansible
ansible-playbook -i hosts playbooks/php-stack/full-php-ec2-stack.yml

```
