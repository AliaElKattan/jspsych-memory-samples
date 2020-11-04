// const dimensions = [600, 600];
// const center = [dimensions[0] / 2, dimensions[1] / 2];
// const radius = 200;

//number of trials
var trial_num = 1;
// var trial_count = 0;
var curr_points = 0;

var trial_count = 0;

var filtration_count = 0;

// var timeline = [];
var max_points = 0;

var filtration_map = [];

//taskmap
for (var i =0;i<trial_num;i++) {

    var settings = {
        canvas_width: dimensions[0],
        canvas_height: dimensions[1],
        center: center,
        radius: radius,
        colors: taskmap_colors
    };


    filtration_map.push(generate_taskmap(settings));
}


for (var i = 0; i<trial_num;i++) {

var filtration_stimuli = trial_filtration({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 2000,

    cross_length: 10,
    cross_color: 'black',

    target_coords: filtration_map[i].target_coords,
    // target_color: 'red',
    target_color: filtration_map[i].target_color,
    target_size: 10,
    target_end_time: 500,

    filler_shape: 'triangle',
    filler_num: 2,
    filler_start_time: 0,
    filler_end_time: 500,
    filler_coords: [filtration_map[i].filler_1_coords, filtration_map[i].filler_2_coords],
    // filler_color: ['blue', 'green'],
    filler_color: [filtration_map[i].filler_1_color, filtration_map[i].filler_2_color],
    filler_height: 10
});

timeline.push(filtration_stimuli);

var filtration_response = trial_response({
    sample_type: "filtration",
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 10000,

    prompt_radius: 5,
    // prompt_color: 'red',
    prompt_color: filtration_map[i].target_color,

    response_area_radius: 200,
    response_area_color: 'white'
});

timeline.push(filtration_response);

var pause = intertrial_pause({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 650,

    cross_length: 10,
    cross_color: 'black'
});
timeline.push(pause);


var feedback = feedback_display({
    feedback_type: "display",
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],

    stimuli_size: 10,    
    target_coords: filtration_map[i].target_coords,
    target_color: filtration_map[i].target_color,

    response_area_radius: radius,
    response_area_color: 'white',
    duration: 2000
});

timeline.push(feedback);

timeline.push(pause);
}


// jsPsych.init({
//     timeline: timeline,
//     on_finish: function() {
//         // jsPsych.data.displayData();
//          jsPsych.data.get().filter({collect: "TRUE"}).ignore(['collect', 'trial_type', 'trial_index', 'internal_node_id', 'key_press']).localSave('csv','filtration_data.csv');

//     }
// });
