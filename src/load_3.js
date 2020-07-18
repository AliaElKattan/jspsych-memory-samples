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

var filler_1_coords = random_along_circumference(center, 200);
var filler_2_coords = random_along_circumference(center, 200);
var filler_1_circle = {
    obj_type: 'circle',
    startX: filler_1_coords[0],
    startY: filler_1_coords[1],
    radius: 5,
    fill_color: 'blue',
    show_start_time: 0,
    show_end_time: 500
};
var filler_2_circle = {
    obj_type: 'circle',
    startX: filler_2_coords[0],
    startY: filler_2_coords[1],
    radius: 5,
    fill_color: 'green',
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
    on_finish: show_cursor
}

var load_3_response = trial_response({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 10000,

    prompt_radius: 5,
    prompt_color: 'red',

    response_area_radius: 200,
    response_area_color: 'white'
});

var pause = intertrial_pause({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 650,

    cross_length: 10,
    cross_color: 'black'
});

jsPsych.init({
    timeline: [
        load_3_stimuli,
        load_3_response,
        pause
    ],
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
