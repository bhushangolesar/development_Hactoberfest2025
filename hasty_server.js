
const Hasty = require('hasty-server');
const server = new Hasty();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
