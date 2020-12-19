# Git作業手順 - upload files to github from local
1. Create new repository on GitHub.com by hand.
2. initalize local project
cd {root_directory}
git init -b main
git add .
git commit -m "First commit"
git remote add origin git@github.com:qagma-ps/Nyumon_NodeJS2.git

3. authorization failed with the current setting, so decided to generate ssh connection again.
cd ~/.ssh/
ssh-keygen -t rsa -b 2048 -C "yuichiro.a30@gmail.com"
copy and paste github.pub into github web page
touch config
chmod 600 config
// write the following to config
Host github
  HostName github.com
  IdentityFile ~/.ssh/github
  User git
// register secret key to ssh-agent
ssh-add ~/.ssh/github
ssh -T git@github.com
// Success!

4. Try again
// check git remote registration
git remote -v
//Try
git push -u origin main

5. Ignore some files
gitignore file in multiple children directory is allowed.
touch .gitignore
vim .gitignore
// added node_modules

6. npm init

7. ESLint configuration
eslint --init
