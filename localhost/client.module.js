// import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@0.7/mod.js";
import {f_o_html_from_o_js} from "./f_o_html_from_o_js.module.js";

class O_notification{
    constructor(
        s_class, 
        s_inner_html, 
        b_render,
        n_milliseconds_to_live = null,
    ){
        this.s_class = s_class
        this.s_inner_html =  s_inner_html
        this.b_render = b_render
        this.n_milliseconds_to_live__constructor = n_milliseconds_to_live
        this.n_milliseconds_to_live = n_milliseconds_to_live
        this.n_ms_wind_perf_now = 0;
        this.n_ms_wind_perf_now__last = 0;
        this.n_ms_wind_perf_now__delta = 0;
    }
}

class O_state{
    constructor(
        o_element_html,
    ){
        this.o_element_html = o_element_html
        this.a_o_notification = []
    }
}


let f_add_css = function(
    o_document,
    s_path_file,
    s_css
){
    let o_el = null;
    if(s_css){
        var o_el_style = o_document.createElement("style")
        o_el_style.innerText = s_css
        o_el = o_el_style
    }else{
        o_el = o_document.createElement("link");
        o_el.rel = "stylesheet"
        o_el.href = s_path_file
        // <link rel="stylesheet" href="mystyle.css">
    }

    // o_document.head.appendChild(o_el)
    o_document.head.insertBefore(o_el, o_document.head.firstChild);// this way the css will not overwrite
}


let f_o_js__notifier = function(
    o_state
){
    o_state.a_o_js_o_notification = [];

    let o_js__a_o_notification = {
        f_o_js: function(){
            return {
                class: "a_o_notification",
                a_o: o_state.a_o_js_o_notification.map(
                        function(
                            o_js_o_notification
                        ){
                            // return {
                            //     f_o_html: function(){

                            //     }
                            // }
                            // console.log(o_js_o_notification)
                            // // return {}
                            // return o_js_o_notification.f_o_js()
                            return o_js_o_notification
                        }
                )
            }
        }
    }
    let o = {
        class: '',
        a_o:[
            o_js__a_o_notification,
        ], 
        f_notify:  function(
            s_inner_html, 
            s_class = 'success', 
            n_milliseconds_to_live = null
        ){

                    
            if(n_milliseconds_to_live == null){
                // slow reader 100 words per minute
                var n_chars_per_word = 6;  
                var n_seconds_per_word = 60/100;
                var o_element = document.createElement('div');
                o_element.innerHTML = s_inner_html;
                var n_words = o_element.innerText.length / n_chars_per_word;
                var n_seconds_for_msg = n_words * n_seconds_per_word;
                // console.log(n_seconds_for_msg)
                n_seconds_for_msg = Math.max(2, n_seconds_for_msg)
                n_milliseconds_to_live = n_seconds_for_msg*1000
            }

            let o_notification = new O_notification(
                s_class,
                s_inner_html, 
                true, 
                n_milliseconds_to_live,
            );
            
            o_notification.f_render = function(){
                o_notification.n_animation_id = requestAnimationFrame(o_notification.f_render);

                o_notification.n_ms_wind_perf_now = window.performance.now();
                o_notification.n_ms_wind_perf_now__delta = o_notification.n_ms_wind_perf_now - o_notification.n_ms_wind_perf_now__last;

                o_notification.n_milliseconds_to_live -= o_notification.n_ms_wind_perf_now__delta;
                if(o_notification.n_milliseconds_to_live < 0){
                    o_notification.b_render = false;
                }
                // o_js__a_o_notification._f_render();
                let n_nor = o_notification.n_milliseconds_to_live / o_notification.n_milliseconds_to_live__constructor
                if(n_nor < 0.){
                    o_notification.b_render = false;
                    o_js__a_o_notification._f_render();
                }
                o_js_o_notification._f_render()
                // console.log(o_js_o_notification)
                if(!o_notification.b_render){
                    window.cancelAnimationFrame(o_notification.n_animation_id)
                }
                o_notification.n_ms_wind_perf_now__last = o_notification.n_ms_wind_perf_now;

            }
            var o_js_o_notification = {
                f_o_js: function(){
                    return {
                        b_render: o_notification.b_render,

                        class: "o_notification",
                        s_tag: "article",
                        style:"position:relative",
                        a_o: [
                            {
                                innerHTML: o_notification.s_inner_html, 
                            },
                            {
                                style: [
                                    'position:absolute',
                                    'bottom:0', 
                                    'left: 0',
                                    (function(){
                                        let n_nor = o_notification.n_milliseconds_to_live / o_notification.n_milliseconds_to_live__constructor
                                        return `width:${n_nor*100}%`
                                    })(),
                                    'height:1rem',
                                    'background:red'
                                ].join(";"),
                            },
                            {
                                s_tag: "button", 
                                innerHTML: "X", 
                                onclick: function(){
                                    o_notification.n_milliseconds_to_live = -1;
                                    o_notification.b_render = false;
                                    console.log(o_js_o_notification);
                                    o_js__a_o_notification._f_render();
                                }
                            }
                        ],


                        onmouseenter: function(){
                            console.log("asdf")
                            window.cancelAnimationFrame(o_notification.n_animation_id)
                        }, 
                        onmouseleave: function(){
                            o_notification.n_animation_id = window.requestAnimationFrame(o_notification.f_render)
                            // o_notification.n_ms_wind_perf_now = window.performance.now();
                            o_notification.n_ms_wind_perf_now__last = window.performance.now();
                        }
                    }
                }
            };
            f_o_html_from_o_js(o_js_o_notification);
            o_state.a_o_js_o_notification.push(o_js_o_notification)
            o_notification.n_animation_id = window.requestAnimationFrame(o_notification.f_render)

            o_state.a_o_notification.push(
                o_notification
            );

            o_js__a_o_notification._f_render();
            // console.log(o_js__a_o_notification)
            window.o_js__a_o_notification = o_js__a_o_notification
        }
    };
    var o_html = f_o_html_from_o_js(o);
    console.log(o_html)
    window.o = o
    o_state.o_element_html.appendChild(o_html);


    f_add_css(
        document,
        `./pico_browser_notifier.scss.css`
    )
    f_add_css(
        document,
        null, 
        `
        .a_o_notification{
            padding:1rem;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            display:flex;
            align-items:center;
            flex-direction:column;
        }
        .o_notification {
            margin: var(--block-spacing-vertical) 0;
            padding: var(--block-spacing-vertical) var(--block-spacing-horizontal);
            border-radius: var(--border-radius);
            background: var(--card-background-color);
            box-shadow: var(--card-box-shadow)
        }
        `
    )



    return o;
}

export {
    f_o_js__notifier, 
    O_state,
}