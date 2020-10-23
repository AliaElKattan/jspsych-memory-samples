const dimensions = [600, 600];
const center = [dimensions[0] / 2, dimensions[1] / 2];
const radius = 200;
// var target_coords = random_along_circumference(center, 200);
// var filler_1_coords = random_along_circumference(center, 200);
// var filler_2_coords = random_along_circumference(center, 200);

//number of trials
var trial_num = 5;
var trial_count = 1;

var timeline = [];

var map = [];

for (var i =0;i<trial_num;i++) {
    map.push(generate_taskmap(dimensions[0], dimensions[1],center,radius));
}

for (var i = 0; i<trial_num;i++) {

var filtration_stimuli = trial_filtration({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 2000,

    cross_length: 10,
    cross_color: 'black',

    target_coords: map[i].target_coords,
    // target_color: 'red',
    target_color: map[i].target_color,
    target_size: 10,
    target_end_time: 500,

    filler_shape: 'triangle',
    filler_num: 2,
    filler_start_time: 0,
    filler_end_time: 500,
    filler_coords: [map[i].filler_1_coords, map[i].filler_2_coords],
    // filler_color: ['blue', 'green'],
    filler_color: [map[i].filler_1_color, map[i].filler_2_color],
    filler_height: 10
});

timeline.push(filtration_stimuli);

var filtration_response = trial_response({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 10000,

    prompt_radius: 5,
    // prompt_color: 'red',
    prompt_color: map[i].target_color,

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
}

jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        // jsPsych.data.displayData();
         jsPsych.data.get().filter({collect: "TRUE"}).ignore(['collect', 'trial_type', 'trial_index', 'internal_node_id', 'key_press']).localSave('csv','filtration_data.csv');

    }
});
