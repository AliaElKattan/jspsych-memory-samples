const dimensions = [600, 600];
const center = [dimensions[0] / 2, dimensions[1] / 2];
const radius = 200;

var trial_num = 5;
var trial_count = 0;

var timeline = [];

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

var mirror_angle = Math.random() * 180;

//for testing
var dashed_line = {
    obj_type: 'dashed_line',
    startX: center[0],
    startY: center[1],
    angle: mirror_angle,
    dash_length: 10,
    line_length: 400,
    fill_color: 'black',
    show_start_time: 1150,
    show_end_time: 1350
};

var mirror_line = {
    obj_type: 'line',
    startX: center[0],
    startY: center[1],
    angle: mirror_angle,
    line_length: 400,
    fill_color: 'black',
    show_start_time: 1150,
    show_end_time: 1350
};

var intertrial_line = {
    obj_type: 'line',
    startX: center[0],
    startY: center[1],
    angle: mirror_angle,
    line_length: 400,
    fill_color: 'black',
    show_start_time: 0
};

var stimulus_circle = {
    obj_type: 'circle',
    startX: map[i].target_coords[0],
    startY: map[i].target_coords[1],
    radius: 5,
    // fill_color: 'red',
    fill_color: map[i].target_color,
    show_start_time: 0
};

var mirrored_coords = reflect_across_line(map[i].target_coords, center, mirror_angle);

var correct_circle = {
    obj_type: 'circle',
    startX: mirrored_coords[0],
    startY: mirrored_coords[1],
    radius: 5,
    fill_color: 'green',
    show_start_time: 0
};

var manipulation_stimuli = {
    type: 'psychophysics',
    stimuli: [
        fixation_cross_1, fixation_cross_2,
        target_circle,
        mirror_line
        // dashed_line //for testing
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
timeline.push(manipulation_stimuli);

var manipulation_response = trial_response({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 10000,

    prompt_radius: 5,
    // prompt_color: 'red',
    prompt_color: map[i].target_color,

    response_area_radius: 200,
    response_area_color: 'white'
});
timeline.push(manipulation_response);

var intertrial_pause = {
    type: 'psychophysics',
    stimuli: [
        fixation_cross_1,
        intertrial_line,
        stimulus_circle, correct_circle
    ],
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    choices: jsPsych.NO_KEYS,
    trial_duration: 650
}
timeline.push(intertrial_pause);

}


jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        // jsPsych.data.displayData();
            jsPsych.data.get().filter({collect: "TRUE"}).ignore(['collect', 'trial_type', 'trial_index', 'internal_node_id', 'key_press']).localSave('csv','manipulation_data.csv');


    }
});
