# compile scss 

1. cd ./scss
2. edit pico.scss, update the selector `.web_datepicker_v0_1` to the version number for example`.web_datepicker_v0_2`
3. install scss `npm install -g scss`
4. compile the css minified `sass pico.scss out.min.css --style compressed`
5. copy the compiled file `cp out.min.css ./../../localhost/.`