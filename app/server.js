const app = require('./app');

app.listen(app.get('config').port, () => {
  console.log(`✨ Listening on port ${app.get('config').port}`);
});
