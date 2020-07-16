const dimensions = [600, 600];
const center = [dimensions[0] / 2, dimensions[1] / 2];

var fixation_cross = {
    obj_type: 'cross',
    startX: center[0],
    startY: center[1],
    line_length: 10,
    line_color: 'black',
    show_start_time: 0
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

var distractor_coords = random_along_circumference(center, 200);
var distractor_square = {
    obj_type: 'rect',
    startX: distractor_coords[0],
    startY: distractor_coords[1],
    width: 10,
    height: 10,
    fill_color: 'blue',
    show_start_time: 1150,
    show_end_time: 1350
};

var distraction_stimuli = {
    type: 'psychophysics',
    stimuli: [
        fixation_cross,
        target_circle,
        distractor_square
    ],
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    on_start: hide_cursor,
    on_finish: show_cursor
}

var distraction_response = trial_response({
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
        distraction_stimuli,
        distraction_response,
        pause
    ],
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
