[![Build Status](https://travis-ci.org/webforbusinesses/Sample.png)](https://travis-ci.org/webforbusinesses/Sample)


## The aim of the project is to find out what tools we are best used when developing javascript project.


### Installation.

#### Installing system tools
1. Intstall [nodejs](http://nodejs.org/) make sure to check the npm option and allow node installation to add it to path.
2. Install [bower](http://bower.io/) a package manager for the web,  open cmd and type 'npm install -g bower'
3. Install [grunt](http://gruntjs.com/) the JavaScript Task Runner, type 'npm install -g grunt-cli'
4. Install karma (jasmin tests runner) 'npm install -g karma'

#### Setting up the project
5. Open cmd in this project location and type 'bower update', this will install all client side dependencies at
'client/bower_components'
If this doesn't work for you it may be that git can't download files because of firewall, you should therefore switch from
git native protocol to https with the cmd 'git config --global url."https://".insteadOf git://'
6. Intstall node project dependencies, type 'npm install'.
7. Start karma with 'karma start'
8. How to configure karma to run from [Intellij](http://blog.jdriven.com/2013/05/integrating-karma-testacular-test-runner-in-webstorm-idea/)
9. Build the project with 'grunt'