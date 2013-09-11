1. Intstall nodejs (http://nodejs.org/) make sure to check the npm option and allow node installation to add it to path.
2. Install bower -- open cmd and type 'npm install -g bower'
3. Open cmd in this project location and type 'bower update', this will install all client side dependencies at
'client/bower_components'
If this doesn't work for you it may be that git can't download files because of firewall, you should therefore switch from
git native protocol to https with the cmd 'git config --global url."https://".insteadOf git://'
4. Install karma (jasmin tests runner) 'npm install -g karma'
5. Run karma with 'karma start'
6. How to configure karma to run from Intellij (http://blog.jdriven.com/2013/05/integrating-karma-testacular-test-runner-in-webstorm-idea/)
