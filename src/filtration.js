const dimensions = [600, 600];
const center = [dimensions[0] / 2, dimensions[1] / 2];


var fixation_cross = {
    obj_type: 'cross',
    startX: center[0],
    startY: center[1],
    line_length: 10,
    line_color: 'black',
    show_start_time: 0,
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

var test_shape = {
    obj_type: 'equi_tri',
    //obj_type: 'iso_tri',
    //obj_type: 'parallel'
    // obj_type: 'diamond',
    startX: filler_1_coords[0],
    startY: filler_1_coords[1],
    height: 10,
    // width: 5,
    fill_color: 'blue',
    show_start_time: 0,
    show_end_time: 500
};

var filler_square_1 = {
    obj_type: 'rect',
    startX: filler_1_coords[0],
    startY: filler_1_coords[1],
    width: 10,
    height: 10,
    fill_color: 'blue',
    show_start_time: 0,
    show_end_time: 500
};
var filler_square_2 = {
    obj_type: 'rect',
    startX: filler_2_coords[0],
    startY: filler_2_coords[1],
    width: 10,
    height: 10,
    fill_color: 'green',
    show_start_time: 0,
    show_end_time: 500
};

var prompt_circle = {
    obj_type: 'circle',
    startX: center[0],
    startY: center[1],
    radius: 5,
    fill_color: 'red',
    show_start_time: 0,
    show_end_time: 10000
};

var response_area = {
    obj_type: 'circle',
    startX: center[0],
    startY: center[1],
    radius: 200,
    line_color: 'white',
    show_start_time: 0,
    show_end_time: 10000
};

var filtration_stimuli = {
    type: 'psychophysics',
    stimuli: [
        fixation_cross,
        target_circle,
        test_shape, filler_square_2 //test
        // filler_square_1, filler_square_2
    ],
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    on_start: hide_cursor,
    on_finish: show_cursor
}

var filtration_response = {
    type: 'psychophysics',
    stimuli: [
        prompt_circle,
        response_area
    ],
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    response_type: 'mouse',
    trial_duration: 10000
};

var intertrial_pause = {
    type: 'psychophysics',
    stimuli: [
        fixation_cross
    ],
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    choices: jsPsych.NO_KEYS,
    trial_duration: 650
}

jsPsych.init({
    timeline: [
        filtration_stimuli,
        filtration_response,
        intertrial_pause
    ],
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
