const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/api', {
            target: 'https://api.themoviedb.org/3/',
            changeOrigin: true,
            pathRewrite: path => {
                let newPath = path.replace(/^\/api/, '');
                newPath += `?api_key=${
                    process.env.REACT_APP_TMDB_API_KEY
                }&language=en-US`;
                console.log(`sending request to ${newPath}`);
                return newPath;
            },
        })
    );
};
