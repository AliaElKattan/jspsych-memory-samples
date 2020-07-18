const dimensions = [600, 600];
const center = [dimensions[0] / 2, dimensions[1] / 2];


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

var target_coords = random_along_circumference(center, 200);
var target_circle = {
    obj_type: 'circle',
    startX: target_coords[0],
    startY: target_coords[1],
    radius: 5,
    fill_color: 'red',
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
    startX: target_coords[0],
    startY: target_coords[1],
    radius: 5,
    fill_color: 'red',
    show_start_time: 0
};

var mirrored_coords = reflect_across_line(target_coords, center, mirror_angle);
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
    on_finish: show_cursor
}

var manipulation_response = trial_response({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 10000,

    prompt_radius: 5,
    prompt_color: 'red',

    response_area_radius: 200,
    response_area_color: 'white'
});

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

jsPsych.init({
    timeline: [
        manipulation_stimuli,
        manipulation_response,
        intertrial_pause
    ],
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
