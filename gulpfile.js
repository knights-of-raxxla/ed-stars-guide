const gulp = require('gulp');
const twig = require('gulp-twig');
const _ = require('lodash');

let data = require('./data/stars_ok.json');
let stars = tidyStars(data.route);

gulp.task('twig', function() {
    return gulp.src(['./src/**/**.twig', '!./src/**/_*.twig'])
        .pipe(twig({
            data: {stars},
            extname: false,
            base: './src/',
            errorLogToConsole: true,
            onError: err => {
                console.log({err});
            }
            // trace: true
        }), (err, res) =>  {
            console.log({err});
            return res;
        })
        .pipe(gulp.dest('./out'), (err, res) => {
            console.log({err});
            return res;
        });
});


function tidyStars(stars) {
    return _.chain(stars)
        .map(s => {
            if (!s.pictures)
                s.pictures = [];
            return s;
        })
        .orderBy('surface_temperature', 'asc')
        .groupBy('sub_type')
        .map((stars, k) => {
            let lums =  _.groupBy(stars, 'luminosity')
            lums = _.map(lums, (stars, k) => {
                return [k, stars]
            });
            return [
                k,
                lums
            ];
        }).orderBy(g => g[0], 'asc').value();

}
