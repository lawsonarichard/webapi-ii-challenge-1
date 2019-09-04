const server = require("./data/server");

const port = 8000;
server.listen({ port }, () => console.log(`\nAPI on ${port}\n`));
