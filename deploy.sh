echo "Switching to branch master"
git checkout master

echo "Building project"
npm run build

echo "Deploying files to server"
scp -r build/* root@159.223.195.98:/var/www/159.223.195.98/

echo "Done!"
