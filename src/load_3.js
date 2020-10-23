const dimensions = [600, 600];
const center = [dimensions[0] / 2, dimensions[1] / 2];
const radius = 200;
var timeline = [];

//total number of trials
var trial_num = 5;

//trial index counter
var trial_count = 0;

var map = [];

for (var i =0;i<trial_num;i++) {
    map.push(generate_taskmap(dimensions[0], dimensions[1],center,radius));
}

for (var i =0; i<trial_num;i++) {


var fixation_cross_1 = {
    obj_type: 'cross',
    startX: center[0],
    startY: center[1],
    line_length: 10,
    line_color: 'black',
    show_start_time: 0,
    show_end_time: 1150
};
var fixation_cross_2 = {
    obj_type: 'cross',
    startX: center[0],
    startY: center[1],
    line_length: 10,
    line_color: 'black',
    show_start_time: 1350,
    show_end_time: 2000
};

// var target_coords = random_along_circumference(center, 200);
var target_circle = {
    obj_type: 'circle',
    startX: map[i].target_coords[0],
    startY: map[i].target_coords[1],
    radius: 5,
    // fill_color: 'red',
    fill_color: map[i].target_color,
    show_start_time: 0,
    show_end_time: 500
};

// var filler_1_coords = random_along_circumference(center, 200);
// var filler_2_coords = random_along_circumference(center, 200);
var filler_1_circle = {
    obj_type: 'circle',
    startX: map[i].filler_1_coords[0],
    startY: map[i].filler_1_coords[1],
    radius: 5,
    // fill_color: 'blue',
    fill_color: map[i].filler_1_color,
    show_start_time: 0,
    show_end_time: 500
};
var filler_2_circle = {
    obj_type: 'circle',
    startX: map[i].filler_2_coords[0],
    startY: map[i].filler_2_coords[1],
    radius: 5,
    // fill_color: 'green',
    fill_color: map[i].filler_2_color,
    show_start_time: 0,
    show_end_time: 500
};

var retrocue = {
    obj_type: 'rect',
    startX: center[0],
    startY: center[1],
    width: 10,
    height: 10,
    fill_color: 'white',
    show_start_time: 1150,
    show_end_time: 1350
};

var load_3_stimuli = {
    type: 'psychophysics',
    stimuli: [
        fixation_cross_1, fixation_cross_2,
        target_circle,
        filler_1_circle, filler_2_circle,
        retrocue
    ],
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    on_start: hide_cursor,
      on_finish: function(data) {
            show_cursor();
            data.target_pos = map[trial_count].target_coords;
       }
}

timeline.push(load_3_stimuli);

var load_3_response = trial_response({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 10000,

    prompt_radius: 5,
    // prompt_color: 'red',
    prompt_color: map[i].target_color,

    response_area_radius: 200,
    response_area_color: 'white'
});
timeline.push(load_3_response);

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
         jsPsych.data.get().filter({collect: "TRUE"}).ignore(['collect', 'trial_type', 'trial_index', 'internal_node_id', 'key_press']).localSave('csv','load3_data.csv');

    }
});
