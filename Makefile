all:
	npm install
	./node_modules/.bin/wrup browser --require Parser=./src/LinqParser --globalize LINQ --output ./browser/parser.js
	./node_modules/.bin/wrup browser --transform ./json.js -r Transformer=./src/astTransform --globalize LINQ --output ./browser/transformer.js

run:
	make all
	./node_modules/.bin/polpetta&
	sleep 2 && open http://localhost:1337
	read && killall -u `whoami` -m node .*/polpetta
