const liveServer = require("live-server");

const params = {
	logLevel: 0,
	watch: ["example"],
	root: "example",
	ignore: ["example/*.ts", "example/*.tmp*"], // comma-separated string for paths to ignore
};

liveServer.start(params);