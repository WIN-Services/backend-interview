
export ENV="development"
export NODE_ENV="test"
export COOKIE_SECURE="false"
export DEBUG="true"
export DEBUG_DEVELOPER=true
printenv
npm test
cp ./coverage_output.json ./artifacts/
rm -rf ./.nyc_output
rm -rf ./coverage