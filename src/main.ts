import app from './app';

const start = () => {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Api running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

start();
