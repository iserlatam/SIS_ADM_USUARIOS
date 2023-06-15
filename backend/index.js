import app from './src/app.js'

const port = process.env.SERVER_PORT;

app.listen(port || 8000, () => {
    console.log('Working at port:', port)
});
